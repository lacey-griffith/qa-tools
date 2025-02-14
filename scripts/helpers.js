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
    } catch (err) {
      console.error('Failed to copy formatted text: ', err);
    }
}

const copyText = (button) => {

    // Find the closest parent div to the clicked button
    const output = button.closest('#output');
    copyFormattedText(output.outerHTML);
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

export { copyText, clear };