/* copy function (robust: HTML -> plain text -> execCommand fallback) */
const copyFormattedText = async (html) => {
  // build a safe container to read from
  const outputHTML = document.createElement('div');
  outputHTML.insertAdjacentHTML('afterbegin', html);
  // don't include the copy button in the copied output
  outputHTML.querySelector('.copy-container')?.remove();

  // 1) Best case: rich HTML via ClipboardItem (secure contexts + supported browsers)
  try {
    if (window.ClipboardItem && navigator.clipboard?.write) {
      const htmlBlob = new Blob([outputHTML.innerHTML], { type: 'text/html' });
      // include plain text too so pasting into plain fields is harmless
      const plainBlob = new Blob([outputHTML.innerText], { type: 'text/plain' });
      const data = [new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': plainBlob })];
      await navigator.clipboard.write(data);
      console.log('Formatted text copied to clipboard!');
      return true;
    }
    throw new Error('ClipboardItem unsupported');
  } catch (err) {
    // 2) Next best: plain text only
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(outputHTML.innerText);
        console.warn('ClipboardItem not available; copied as plain text.');
        return true;
      }
      throw new Error('navigator.clipboard.writeText unsupported');
    } catch (_err) {
      // 3) Last resort: execCommand fallback (works widely)
      try {
        const tmp = document.createElement('div');
        tmp.style.position = 'fixed';
        tmp.style.left = '-9999px';
        tmp.setAttribute('contenteditable', 'true');
        tmp.innerHTML = outputHTML.innerHTML; // preserves formatting selection
        document.body.appendChild(tmp);

        const range = document.createRange();
        range.selectNodeContents(tmp);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        const ok = document.execCommand('copy');
        document.body.removeChild(tmp);
        if (!ok) throw new Error('execCommand copy failed');
        console.warn('Used execCommand fallback for copy.');
        return true;
      } catch (finalErr) {
        console.error('Failed to copy formatted text: ', finalErr);
        return false;
      }
    }
  }
};

const copyText = async (button) => {
  // button is the clicked element or its child
  const btn = button.closest('button');
  const output = btn?.closest('#output');
  if (!output) {
    console.error('Copy failed: #output not found.');
    return;
  }
  const copied = await copyFormattedText(output.outerHTML);
  if (copied) {
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Copied!';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
    }, 2000);
  }
};

const addNewVariationNameInputs = (labelEditor, varCount) => {
  const varNameContainer = $('#variation-name-group-container');
 // if (varNameContainer.find(`#variation-name-${varCount - 1}`).length) return;
  if ($(`#variation-name-${varCount - 1}`).length) return;


  const newVarName = `<div class="variation-name-group">
    <label contendeditable="true" for="variation-name-${varCount - 1}">V${varCount - 1} Name:</label>
    <input type="text" id="variation-name-${varCount - 1}" name="variation-name-${varCount - 1}"
      placeholder="Enter Name of Variation">
  </div>`;

  varNameContainer.append(newVarName);
  // must use jQuery to fit with labelEditor
  const varNameLabel = $(`.variation-name-group [for="variation-name-${varCount - 1}"]`);
  labelEditor(varNameLabel);
};


// helpers.js
const updateVariationNames = (labelEditor, value) => {
  if (!value) return;

  // 1) find all variation numbers: V1, V2, V3...
  const nums = [...value.matchAll(/V(\d+)/gi)].map(m => +m[1]);
  if (!nums.length) return;

  const maxVar = Math.max(...nums);
  if (maxVar < 2) return; // nothing beyond control

  // 2) make sure variation-name inputs exist for V2..Vmax
  // note: addNewVariationNameInputs expects varCount, and uses (varCount - 1)
  for (let v = 2; v <= maxVar; v++) {
    const varCount = v + 1; // matches how addVariationInput calls it
    addNewVariationNameInputs(labelEditor, varCount);
  }

  // 3) parse names from lines like "V2 – Sticky Header", "V3: New CTA"
  value.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*V(\d+)\s*[-–—:]\s*(.+)$/i);
    if (!match) return;

    const index = match[1];          // "2", "3", ...
    const name  = match[2].trim();   // "Sticky Header"
    const $input = $(`#variation-name-${index}`);

    // only autofill if the field exists and the user hasn't typed anything
    if ($input.length && !$input.val() && name) {
      $input.val(name);
    }
  });
};



const clear = () => {
  // remove additional variations that may have been added
  const variationInputs = $('#url-generator input[id^="variation-"]');

  // use function() so `this` is the element (arrow fn breaks `this`)
  variationInputs.each(function () {
    const id = this.id || '';
    const $self = $(this);

    // remove any that are not control, v1, or v1 name
    if (id !== 'variation-control' && id !== 'variation-1' && id !== 'variation-name-1') {
      $self.parent().remove();
    } else {
      // reset value + label text
      const isControl = id === 'variation-control';
      const isName = id.includes('name');
      const labelText = isControl ? 'Control:' : (isName ? 'V1 Name:' : 'V1:');
      $self.val('');
      $self.parent().find('label').text(labelText);
      $('.url-generator-inner.tool-body').addClass('transparent-background');
      $('.brand-btn-container button.active').removeClass('active ');
    }
  });

  // remove input values of urls & output
  $('.url-generator-inner input').each(function () {
    $(this).val('');
  });
  $('#output').html('');
};

/**
 * Helper: extract Convert params from a variation preview URL.
 * @param {String} url
 * @returns {{ eParam: string, vParam: string } | null}
 */
const extractConvertParams = (url) => {
  try {
    const urlObj = new URL(url);
    const action = urlObj.searchParams.get('convert_action');
    const eParam = urlObj.searchParams.get('convert_e');
    const vParam = urlObj.searchParams.get('convert_v');

    if (action === 'convert_vpreview' && eParam && vParam) {
      return { eParam, vParam };
    } else {
      console.warn('Invalid or missing parameters in variation link:', url);
      return null;
    }
  } catch (error) {
    console.error('Error parsing variation link:', url, error);
    return null;
  }
};

const trolling = () => {
  // i crack myself up tbh
  let clicks = 0;
  $('a.lol').on('click', function () {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    clicks++;
    if (clicks === 1) {
      $(this).text('stopppp it');
    } else if (clicks === 2) {
      $(this).text('seriously? knock it off');
    } else if (clicks === 3) {
      $(this).text('ok I warned you... last chance');
    } else if (clicks >= 4) {
      window.open(url, '_blank');
    }
  });
};

const validateLocalPath = (s) => s.startsWith("/");
const normalizeLocalPath = (s) => s.trim().startsWith("/") ? s.trim() : "/" + s.trim();


export {
  copyText,
  clear,
  extractConvertParams,
  updateVariationNames,
  addNewVariationNameInputs,
  trolling,
  validateLocalPath,
  normalizeLocalPath
};
