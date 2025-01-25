function generateUrls() {
    const prodUrl = document.getElementById('prod-url')?.value.trim();
    const stagingUrl = document.getElementById('staging-url')?.value.trim();
    const localURL = document.getElementById('local-url')?.value.trim();

    const qaParam = document.getElementById('qa-param')?.value.trim();
    const nationalPagesChecked = document.getElementById('national-pages')?.checked;
    const localPagesChecked = document.getElementById('local-pages')?.checked;

    // Validate checkboxes
    if (!localPagesChecked && !nationalPagesChecked) {
        alert('Please select at least one option: Local Pages or National Pages.');
        return;
    }

    // Ensure Prod URL is provided
    if (!prodUrl) {
        alert('Prod URL is required.');
        return;
    }

    // Select all variation input elements
    const variationInputs = document.querySelectorAll('input[name^="variation-"]');
    if (variationInputs.length === 0) {
        alert('No variation links provided.');
        return;
    }

    let previewLinksHtml = '';
    let liveQaLinksHtml = '';

    // Helper function to extract parameters from a URL
    function extractConvertParams(url) {
        try {
            const urlObj = new URL(url.trim());
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

    variationInputs.forEach((variationInput, index) => {
        const variationLink = variationInput.value.trim();
        const variationName = $(variationInput).prev('label').text();

        if (!variationLink) {
            previewLinksHtml += `<h3>${variationName}</h3>
                <p class="error-message">Variation link is empty.</p>`;
            liveQaLinksHtml += `<h3>${variationName}</h3>
                <p class="error-message">Variation link is empty.</p>`;
            return;
        }

        const params = extractConvertParams(variationLink);
        if (!params) {
            previewLinksHtml += `<h3>${variationName}</h3>
                <p class="error-message">Invalid variation link. Unable to generate URLs.</p>`;
            liveQaLinksHtml += `<h3>${variationName}</h3>
                <p class="error-message">Invalid variation link. Unable to generate URLs.</p>`;
            return;
        }

        const { eParam, vParam } = params;

        // Preview Links
        //previewLinksHtml += `<h2>${variationName}</h2>`;
        if (nationalPagesChecked) {
            const nationalPreviewProd = `${prodUrl}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}`;
            const nationalPreviewStaging = stagingUrl
                ? `${stagingUrl}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}`
                : '';
            previewLinksHtml += `<h3>${variationName}</h3><p><strong>National Prod:</strong> <a href="${nationalPreviewProd}" target="_blank">${nationalPreviewProd}</a></p>`;
            if (nationalPreviewStaging) {
                previewLinksHtml += `<p><strong>National Stage:</strong> <a href="${nationalPreviewStaging}" target="_blank">${nationalPreviewStaging}</a></p>`;
            }
        }

        if (localPagesChecked) {
            const brand = brands.find(b => b.prod === prodUrl);
            if (brand) {
                const localPreviewProd = `${brand.prod_local_homepage}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}`;
                const localPreviewStaging = brand.staging_local_homepage
                    ? `${brand.staging_local_homepage}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}`
                    : '';
                previewLinksHtml += `<h3>${variationName}</h3><p><strong>Prod Local:</strong> <a href="${localPreviewProd}" target="_blank">${localPreviewProd}</a></p>`;
                if (localPreviewStaging) {
                    previewLinksHtml += `<p><strong>Prod Stage:</strong> <a href="${localPreviewStaging}" target="_blank">${localPreviewStaging}</a></p>`;
                }
            }
        }

        // Live QA Links
        let liveQaQuery = `?_conv_eforce=${eParam}.${vParam}`;

        if (qaParam) {
            liveQaQuery = `?utm_medium=${qaParam}&_conv_eforce=${eParam}.${vParam}`;
        }

        //liveQaLinksHtml += `<h2>${variationName}</h2>`;
        if (nationalPagesChecked) {
            const nationalQaProd = `${prodUrl}${liveQaQuery}`;
            const nationalQaStaging = stagingUrl
                ? `${stagingUrl}${liveQaQuery}`
                : '';
            liveQaLinksHtml += `<h3>${variationName}</h3><p><strong>Prod National:</strong> <a href="${nationalQaProd}" target="_blank">${nationalQaProd}</a></p>`;
            if (nationalQaStaging) {
                liveQaLinksHtml += `<p><strong>Stage National:</strong> <a href="${nationalQaStaging}" target="_blank">${nationalQaStaging}</a></p>`;
            }
        }

        if (localPagesChecked) {
            const brand = brands.find(b => b.prod === prodUrl); 
            if (brand) {
                const localQaProd = `${brand.prod_local_homepage}${liveQaQuery}`;
                const localQaStaging = brand.staging_local_homepage
                    ? `${brand.staging_local_homepage}${liveQaQuery}`
                    : '';
                liveQaLinksHtml += `<h3>${variationName}</h3><p><strong>Stage Prod:</strong> <a href="${localQaProd}" target="_blank">${localQaProd}</a></p>`;
                if (localQaStaging) {
                    liveQaLinksHtml += `<p><strong>Stage Local:</strong> <a href="${localQaStaging}" target="_blank">${localQaStaging}</a></p>`;
                }
            }
        }
    });

    const outputDiv = document.getElementById('output');
    if (previewLinksHtml || liveQaLinksHtml) {
        outputDiv.classList.add('urls-generated');
        outputDiv.innerHTML = `
            <div>
                <h2>Preview Links</h2>
                ${previewLinksHtml || '<p>No Preview Links generated. Please check your inputs.</p>'}
            </div>
            <div>
                <h2>Live QA Links</h2>
                ${liveQaLinksHtml || '<p>No Live QA Links generated. Please check your inputs.</p>'}
            </div>
        `;
    } else {
        outputDiv.innerHTML = '<p>No URLs were generated. Please check your inputs.</p>';
    }
}

// Function to fill Prod and Staging URLs
function fillUrls(prodUrl, stageUrl, localProd, localStage, button) {
    $('#brand-buttons button.active').removeClass('active');
    button.classList.add('active');

    document.getElementById('prod-url').value = prodUrl;
    document.getElementById('staging-url').value = stageUrl;
    document.getElementById('local-prod-url').value = localProd;
    document.getElementById('local-stage-url').value = localStage;

}


// Function to clear form inputs and output
function clearFormAndOutput() {
    document.getElementById('prod-url').value = '';
    document.getElementById('staging-url').value = '';
    document.getElementById('local-stage-url').value = '';
    document.getElementById('local-prod-url').value = '';

    document.getElementById('qa-param').value = '';
    document.getElementById('output').innerHTML = '';
    document.getElementById('output').classList.remove('urls-generated');
    $('#brand-buttons button.active').removeClass('active');
    $('body').removeClass('url-generator-active');

    // Clear all variation inputs
    const variationInputs = document.querySelectorAll('input[id^="variation-"]');

    variationInputs.forEach(input => {
        // If the input's ID is not 'variation-live-qa-og' or 'variation-live-qa-1', remove it
        if (input.id !== 'variation-og' && input.id !== 'variation-1') {
            $(input).parent().remove();
            if(input.id === 'variation-og'){
                input.prev('label').text('OG:');
            } else if(input.id === 'variation-1'){
                input.prev('label').text('V1:');
            }
        } else {
            input.value = '';
        }
        variationCount = 2
    });
}

// Attach event listener to the Clear buttons
document.getElementById('clear-button').addEventListener('click', clearFormAndOutput);

$('input#prod-url').on('change blur focus', function () {
    let el = $('input#prod-url').parent().find('.error-message');
    el.remove();
});

$('input#qa-param').on('change blur focus', function () {
    let el = $('input#qa-param').parent().find('.error-message');
    el.remove();
});

/* USE MRE CF 34 
$('#prod-url').val('https://mrelectric.com/')
$('#staging-url').val('https://dig-www-nei-mre2.nblyprod.com/');

$('#variation-og').val('https://mrelectric.com/?convert_action=convert_vpreview&convert_e=1004123614&convert_v=1004293134');
$('#variation-1').val('https://mrelectric.com/?convert_action=convert_vpreview&convert_e=1004123614&convert_v=1004293135');
*/