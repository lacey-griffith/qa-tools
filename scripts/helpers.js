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

const clear = () => {
    // remove additional variations that may have been added
    const variationInputs = document.querySelectorAll('#url-generator input[id^="variation-"]');
    Array.from(variationInputs).forEach((input) => {
        //remove any that are not variation-control or variation-1
        if (input.id !== 'variation-control' && input.id !== 'variation-1') {
            input.parentNode.remove();
        } else {
            //determine if its not the control, must be v1, apply text accordingly
            const labelText = input.id === 'variation-control' ? 'Control:' : 'V1:';
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

export { copyText, clear, extractConvertParams };