(function() {
    
})();

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

    if (!prodUrl || !qaParam) {
        alert("Please fill Prod URL and QA Param.");
        return;
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


/*
$('#prod-url').val('https://register3.thelightsfest.com/checkout')
$('#qa-param').val('CF_44_QA')
$('#variation-live-qa-1').val('?_conv_eforce=1004108753.1004259526')
*/