(function() {
    console.log('Hi');
    
})();


let variationCount = 1;
function addVariationInput() {
    variationCount++;
    const variationGroupContainer = document.getElementById('variation-group-container');

    const newVariationGroup = document.createElement('div');
    newVariationGroup.className = 'variation-group';

    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', 'variation-live-qa-' + variationCount);
    newLabel.textContent = 'Variation Live QA Link ' + variationCount + ':';

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
        alert("Please fill in both the Prod URL and the QA Parameter.");
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

            // Clean up _conv_eforce param if it starts with ?
            if (convParam.startsWith('?')) {
                convParam = convParam.replace('?', '&');
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
                <h3>Variation ${index + 1}</h3>
                <p><strong>Prod URL:</strong> <a href="${prodUrlWithParam}" target="_blank">${prodUrlWithParam}</a></p>
            `;

            if (stagingUrlWithParam) {
                outputHtml += `
                    <p><strong>Staging URL:</strong> <a href="${stagingUrlWithParam}" target="_blank">${stagingUrlWithParam}</a></p>
                `;
            }
        }
    });

    // Display the generated URLs
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = outputHtml;
}


/*
$('#prod-url').val('https://register3.thelightsfest.com/checkout')
$('#qa-param').val('CF_44_QA')
$('#variation-live-qa-1').val('?_conv_eforce=1004108753.1004259526')
*/