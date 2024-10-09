/* * * * * * * * * * * */
/* FPOO URL GENERATOR */
/* * * * * * * * * * */
let copy_btn = `<button class='copy' onClick="copyText(this)">
    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>
</button>`;

let urls = [{
    name: 'Choose',
    structure: 'placeholder/choose'
}, {
    name: 'SignUp',
    structure: '/signup/placeholder'
}, {
    name: 'LP',
    structure: 'placeholder/tj'
}];

function codes(arr) {
    return urls.map(urlObj => {
        return arr.map(code => urlObj.structure.replace('placeholder', code));
    });
}

function generateFPOOUrls() {
    // Get the input value
    let input = document.getElementById('codes').value;
    if (input === '') {
        document.getElementById('codes').insertAdjacentHTML('afterend', '<p class="error-message">Please enter a code</p>');
        return;
    }
    // Split the input string by commas and trim whitespace
    let codesArray = input.split(/\s+/).map(code => code.trim());

    // Generate URLs using the codes function
    let result = codes(codesArray);

    // Display the generated URLs
    let outputSection = document.getElementById('url-output');
    outputSection.innerHTML = ''; // Clear previous output

    result.forEach((urlSet, index) => {
        let urlType = urls[index].name;
        let urlList = `<div class="url-list"><p>${urlType} URLs: ${copy_btn}</p>`;
        urlSet.forEach(url => {
            urlList += `<span>'${url}',</span>`;
        });
        urlList += `</div>`;
        outputSection.innerHTML += urlList;
    });
}

/* clear error messages when input is focused */
$('input#codes').on('change blur focus', function () {
    $('#fpoo-codes .tool-body .error-message').remove();
});


/* copy function */
function copyText(button) {
    // Find the closest .url-list div to the clicked button
    const urlListDiv = button.closest('.url-list');

    // Get the text content of all span elements inside the .url-list div
    const urlText = Array.from(urlListDiv.querySelectorAll('span'))
        .map(span => span.textContent)
        .join(' ');

    // Copy the text to the clipboard
    navigator.clipboard.writeText(urlText)
        .then(() => {
            console.log('Text copied to clipboard:', urlText);
        })
        .catch(err => {
            console.error('Failed to copy text:', err);
        });
}

function clearFPOOCodes() {
    document.getElementById('codes').value = '';
    document.getElementById('url-output').innerHTML = '';
}