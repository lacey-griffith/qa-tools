/* * * * * * * * */
/* QA URL GENERATOR */
/* * * * * * * * */
let brands = [{
    brand_handle: 'aire-serve',
    brand : 'ASV',
    conceptID: 3,
    prod: 'https://www.aireserv.com/',
    stage: 'https://dig-www-nei-asv-stage.nblytest.com/'
},{
    brand_handle: 'five-star-painting',
    brand : 'FSP',
    conceptID: 4,
    prod: 'https://www.fivestarpainting.com/',
    stage: 'https://dig-www-nei-fsp-stage.nblytest.com/'
},{
    brand_handle: 'grounds-guys',
    brand : 'GUY',
    conceptID: 6,
    prod: 'https://www.groundsguys.com/',
    stage: 'https://dig-www-nei-guy-stage.nblytest.com/'
},{
    brand_handle: 'glass-doctor',
    brand : 'MDG',
    conceptID: 5,
    prod: 'https://www.glassdoctor-us.com/',
    stage: 'https://develop-dwyr-mdg.pantheonsite.io/'
},{
    brand_handle: 'molly-maid',
    brand : 'MOL',
    conceptID: 1,
    prod: 'https://www.mollymaid.com/',
    stage: 'https://dig-www-nei-mly-stage.nblytest.com/'
},{
    brand_handle: 'mr-appliance',
    brand : 'MRA',
    conceptID: 8,
    prod: 'https://www.mrappliance.com/',
    stage: 'https://dig-www-nei-mra-stage.nblytest.com/'
},{
    brand_handle: 'mr-electric',
    brand : 'MRE',
    conceptID: 9,
    prod: 'https://mrelectric.com/',
    stage: 'https://dig-www-nei-mre2.nblyprod.com/'
},{
    brand_handle: 'mr-handyman',
    brand : 'MRH',
    conceptID: 2,
    prod: 'https://www.mrhandyman.com/',
    stage: 'https://dig-www-nei-mrh-stage.nblytest.com/'
},{
    brand_handle: 'mr-rooter',
    brand : 'MRR',
    conceptID: 10,
    prod: 'https://www.mrrooter.com/',
    stage: 'https://dig-www-nei-mrr-stage.nblytest.com/'
},{
    brand_handle: 'window-genie',
    brand : 'WDG',
    conceptID: 16,
    prod: 'https://www.windowgenie.com/',
    stage: 'https://dig-www-nei-wdg2-stage.nblytest.com/'
}];

let variationCount = 1;
function addVariationInput() {
    variationCount++;
    const variationGroupContainer = document.getElementById('variation-group-container');

    const newVariationGroup = document.createElement('div');
    newVariationGroup.className = 'variation-group';

    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', 'variation-live-qa-' + variationCount);
    newLabel.textContent = 'Live QA - V' + variationCount + ':';

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('id', 'variation-live-qa-' + variationCount);
    newInput.setAttribute('name', 'variation-live-qa[]');
    newInput.setAttribute('placeholder', 'Enter Variation Live QA Link');

    newVariationGroup.appendChild(newLabel);
    newVariationGroup.appendChild(newInput);

    variationGroupContainer.appendChild(newVariationGroup);
}

function generateUrls() {
    const prodUrl = document.getElementById('prod-url').value;
    const stagingUrl = document.getElementById('staging-url').value;
    const qaParam = document.getElementById('qa-param').value;

    if(!prodUrl || !qaParam){
        if (!prodUrl){
            document.getElementById('prod-url').insertAdjacentHTML('afterend', '<p class="error-message">Prod URL is required.</p>');
        }
    
        if(!qaParam){
            document.getElementById('qa-param').insertAdjacentHTML('afterend', '<p class="error-message">QA param is required.</p>');
        }
    }

    // Get all variation live QA link inputs
    const variationInputs = document.querySelectorAll('input[name="variation-live-qa[]"]');
    
    // Initialize output string
    let outputHtml = `<h2>Generated URLs</h2>`;

    // Function to append the QA param and _conv_eforce to the URLs
    function addQueryParams(url, qaParam, convParam) {
        if (!url) return ''; // Return empty string if the URL is invalid or empty
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url; // Prepend https if no protocol is provided
        }

        try {
            const urlObj = new URL(url);
            // Append the utm_medium parameter with the QA value
            urlObj.searchParams.set('utm_medium', `${qaParam}_QA`);

            // Clean up _conv_eforce param
            if (convParam.startsWith('?')) {
                // If it starts with '?', replace it with '&'
                convParam = convParam.replace('?', '&');
            } else if (!convParam.startsWith('&')) {
                // If it doesn't start with '?' or '&', prepend an '&'
                convParam = '&' + convParam;
            }

            // Append the _conv_eforce param manually to avoid URL object escaping it
            return urlObj.toString() + convParam;
        } catch (error) {
            console.error('Invalid URL:', url); // Log the invalid URL
            return ''; // Return an empty string for invalid URLs
        }
    }

    // Generate URLs for each variation
    variationInputs.forEach((variationInput, index) => {
        const variationConvParam = variationInput.value; // Get the _conv_eforce from input

        if (variationConvParam) {
            const prodUrlWithParam = addQueryParams(prodUrl, qaParam, variationConvParam);
            const stagingUrlWithParam = stagingUrl ? addQueryParams(stagingUrl, qaParam, variationConvParam) : '';

            outputHtml += `
                <h3>V${index + 1}</h3>
                <p><strong>Prod URL:</strong> <a href="${prodUrlWithParam}">${prodUrlWithParam}</a></p>
            `;

            if (stagingUrlWithParam) {
                outputHtml += `
                    <p><strong>Staging URL:</strong> <a href="${stagingUrlWithParam}">${stagingUrlWithParam}</a></p>
                `;
            }
        }
    });

    // Display the generated URLs
    const outputDiv = document.getElementById('output');
    outputDiv.classList.add('urls-generated');
    $('body').addClass('url-generator-active');
    outputDiv.innerHTML = outputHtml;
}

// Generate buttons for each brand
function generateBrandButtons() {
    const brandButtonsDiv = document.getElementById('brand-buttons');
    
    brands.forEach(brand => {
        const button = document.createElement('button');
        button.textContent = brand.brand;
        button.onclick = () => fillUrls(brand.prod, brand.stage,button);
        brandButtonsDiv.appendChild(button);
    });
}

// Function to fill Prod and Staging URLs
function fillUrls(prodUrl, stageUrl,button) {
    $('#brand-buttons button.active').removeClass('active');
    button.classList.add('active');

    document.getElementById('prod-url').value = prodUrl;
    document.getElementById('staging-url').value = stageUrl;
}

// Generate the brand buttons on page load
generateBrandButtons();

// Function to clear form inputs and output
function clearFormAndOutput() {
    document.getElementById('prod-url').value = '';
    document.getElementById('staging-url').value = '';
    document.getElementById('qa-param').value = '';
    document.getElementById('output').innerHTML = '';
    document.getElementById('output').classList.remove('urls-generated');
    $('#brand-buttons button.active').removeClass('active');
    $('body').removeClass('url-generator-active');

    // Clear all variation inputs
    const variationInputs = document.querySelectorAll('input[id^="variation-live-qa-"]');
    variationInputs.forEach(input => {
        input.value = '';
    });
}

// Attach event listener to the Clear button
document.getElementById('clear-button').addEventListener('click', clearFormAndOutput);

/* * * * * * * * * * * */
/* FPOO URL GENERATOR */
/* * * * * * * * * * */
let copy_btn = `<button class='copy' onClick="copyText(this)">
    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>
</button>`;

let urls = [{
    name: 'Choose', 
    structure:'placeholder/choose'
},{
    name: 'SignUp', 
    structure:'/signup/placeholder'
},{
    name: 'LP', 
    structure:'placeholder/tj'
}];

function codes(arr) {
    return urls.map(urlObj => {
        return arr.map(code => urlObj.structure.replace('placeholder', code));
    });
}

function generateFPOOUrls() {
    // Get the input value
    let input = document.getElementById('codes').value;
    if(input === ''){
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
$('input#codes').on('change blur focus', function(){
    $('#fpoo-codes .tool-body .error-message').remove();
});

$('input#prod-url').on('change blur focus', function(){
    let el = $('input#prod-url').parent().find('.error-message');
    el.remove();
});

$('input#qa-param').on('change blur focus', function(){
    let el = $('input#qa-param').parent().find('.error-message');
    el.remove();
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

function clearFPOOCodes(){
    document.getElementById('codes').value = '';
    document.getElementById('url-output').innerHTML = '';
}