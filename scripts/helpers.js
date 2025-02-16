/* copy function */
const copyFormattedText = async (html) => {
    let outputHTML = document.createElement('div');
    outputHTML.insertAdjacentHTML('afterbegin', html);
    outputHTML.querySelector('.copy-container').remove();

    try {
      const blob = new Blob([outputHTML.innerHTML], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blob })];
      await navigator.clipboard.write(data);
      console.log('Formatted text copied to clipboard!');
      return true;
    } catch (err) {
      console.error('Failed to copy formatted text: ', err);
      throw(err);
    }
}

const copyText = async (button) => {
    // Find the closest parent div to the clicked button
    const btn = button.closest('button');
    const output = btn.closest('#output');
    let copied = await copyFormattedText(output.outerHTML);
    if (copied) {
        let originalButton = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = 'Copied!';
        setTimeout(() => {
            btn.innerHTML = originalButton;
            btn.disabled = false;
        }, 2000);
    }
}

const addNewVariationNameInputs = (labelEditor, varCount) => {
    let varNameContainer = document.querySelector('#variation-name-group-container');
    let newVarName = `<div class="variation-name-group">
        <label contendeditable="true" for="variation-name-${varCount - 1}">V${varCount - 1} Name:</label>
        <input type="text" id="variation-name-${varCount - 1}" name="variation-name-${varCount - 1}"
            placeholder="Enter Name of Variation">
    </div>`;

    varNameContainer.insertAdjacentHTML('beforeend', newVarName);
    // must use jquery to fit with labelEditor
    let varNameLabel = $(`.variation-name-group [for="variation-name-${varCount - 1}"]`);
    labelEditor(varNameLabel);
}

const updateVariationNames = (labelEditor, value) => {
    let variationCount = value.match(/(V)\w+/g);
    variationCount = Number(variationCount[variationCount.length - 1].slice(1)) + 1;
    if (variationCount < 2) return;
    // we have to start at 3 here because the add new variation name inputs function subtracts one from the varcount
    for (let i=3; i < variationCount + 1; i++) {
        addNewVariationNameInputs(labelEditor, i);
    }
}

const clear = () => {
    // remove additional variations that may have been added
    const variationInputs = document.querySelectorAll('#url-generator input[id^="variation-"]');
    Array.from(variationInputs).forEach((input) => {
        //remove any that are not variation-control or variation-1
        if (input.id !== 'variation-control' && input.id !== 'variation-1' && input.id !== 'variation-name-1') {
            input.parentNode.remove();
        } else {
            //determine if its not the control, must be v1, apply text accordingly
            const labelText = input.id === 'variation-control' ? 'Control:' : `${input.id.includes('name') ? 'V1 Name:' : 'V1:'}`;
            input.value = '';
            input.parentNode.querySelector('label').textContent = labelText;
        }
    });

    //remove input values of urls & output
    Array.from(document.querySelectorAll('.url-generator-inner input')).forEach((input) => {
        input.value = '';
    });
    document.querySelector('#output').innerHTML = '';
}

/**
 * Helper function to extract parameters from a URL
 * @param {String} url 
 * @returns { Object } // of exp parameter for convert, and variable parameter. null if invalid
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
}

export { copyText, clear, extractConvertParams, updateVariationNames, addNewVariationNameInputs };