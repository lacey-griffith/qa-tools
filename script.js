function generateNblyUrls() {
    console.log('generating neighborly urls...');

    const prodUrl = $('#form #prod-url').val().trim();
    const stagingUrl = $('#form #staging-url').val().trim();
    const qaParam = $('#form #qa-param').val().trim();

    const localProdUrl = $('#form #prod-local-url').val().trim();
    const localStagingUrl = $('#form #staging-local-url').val().trim();

    const nationalChecked = $('#national-pages').is(':checked');
    const localChecked = $('#local-pages').is(':checked');

    console.log('national checked:' + nationalChecked);
    console.log('local checked:' + localChecked);

    // Validate checkboxes
    if (!localChecked && !nationalChecked) {
        showError('.nbly-form .checkbox-outer .error-msg');
        return;
    }
    removeError('.nbly-form .checkbox-outer .error-msg');

    // Validate prod URL
    if (!prodUrl) {
        showError('.prod-required .error-msg');
        return;
    }
    removeError('.prod-required .error-msg');

    // Validate variation inputs
    const variationInputs = $('input[name^="variation-"]');
    if (variationInputs.length === 0) {
        showError('#variation-group-container .error-msg');
        return;
    }
    removeError('#variation-group-container .error-msg');

    let previewNationalMarkup = '';
    let previewLocalMarkup = '';
    let qaNationalMarkup = '';
    let qaLocalMarkup = '';

    // Helper function to generate URLs
    function generateUrls(urls, variationName, eParam, vParam, qaParam) {
        let liveQaQuery = `?_conv_eforce=${eParam}.${vParam}`;
        if (qaParam) liveQaQuery = `?utm_medium=${qaParam}&_conv_eforce=${eParam}.${vParam}`;

        urls.forEach(url => {
            const previewProdUrl = `${url.prodUrl}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}`;
            const previewStagingUrl = url.stagingUrl ? `${url.stagingUrl}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}` : '';
            const qaProdUrl = `${url.prodUrl}${liveQaQuery}`;
            const qaStagingUrl = url.stagingUrl ? `${url.stagingUrl}${liveQaQuery}` : '';

            const { type, prodMarkup, qaMarkup } = url;

            if (type === 'National') {
                previewNationalMarkup += prodMarkup(previewProdUrl, previewStagingUrl, variationName);
                qaNationalMarkup += qaMarkup(qaProdUrl, qaStagingUrl, variationName);
            } else if (type === 'Local') {
                previewLocalMarkup += prodMarkup(previewProdUrl, previewStagingUrl, variationName);
                qaLocalMarkup += qaMarkup(qaProdUrl, qaStagingUrl, variationName);
            }
        });
    }

    // Helper function to handle errors
    function showError(selector) {
        $(selector).addClass('show');
    }

    function removeError(selector) {
        $(selector).removeClass('show');
    }

    // Extract Convert parameters
    function extractConvertParams(url) {
        try {
            const urlObj = new URL(url);
            const action = urlObj.searchParams.get('convert_action');
            const eParam = urlObj.searchParams.get('convert_e');
            const vParam = urlObj.searchParams.get('convert_v');

            if (action === 'convert_vpreview' && eParam && vParam) {
                return { eParam, vParam };
            }
            console.warn('Invalid or missing parameters in variation link:', url);
            return null;
        } catch (error) {
            console.error('Error parsing variation link:', url, error);
            return null;
        }
    }

    // Process variation inputs
    variationInputs.each(function () {
        const variationLink = $(this).val().trim();
        const variationName = $(this).prev('label').text();

        if (!variationLink) {
            // Empty link handling
            handleEmptyLink(variationName);
            return;
        }

        const params = extractConvertParams(variationLink);
        if (!params) {
            handleInvalidLink(variationName);
            return;
        }

        const { eParam, vParam } = params;

        const urls = [
            {
                type: 'National',
                prodUrl: prodUrl,
                stagingUrl: stagingUrl,
                prodMarkup: (previewProdUrl, previewStagingUrl, variationName) =>
                    `<h3>${variationName}</h3><p><strong>Prod:</strong> <a href="${previewProdUrl}" target="_blank">${previewProdUrl}</a></p>` +
                    (previewStagingUrl ? `<p><strong>Stage:</strong> <a href="${previewStagingUrl}" target="_blank">${previewStagingUrl}</a></p>` : ''),
                qaMarkup: (qaProdUrl, qaStagingUrl, variationName) =>
                    `<h3>${variationName}</h3><p><strong>Prod:</strong> <a href="${qaProdUrl}" target="_blank">${qaProdUrl}</a></p>` +
                    (qaStagingUrl ? `<p><strong>Stage:</strong> <a href="${qaStagingUrl}" target="_blank">${qaStagingUrl}</a></p>` : '')
            },
            {
                type: 'Local',
                prodUrl: localProdUrl,
                stagingUrl: localStagingUrl,
                prodMarkup: (previewProdUrl, previewStagingUrl, variationName) =>
                    `<h3>${variationName}</h3><p><strong>Prod:</strong> <a href="${previewProdUrl}" target="_blank">${previewProdUrl}</a></p>` +
                    (previewStagingUrl ? `<p><strong>Stage:</strong> <a href="${previewStagingUrl}" target="_blank">${previewStagingUrl}</a></p>` : ''),
                qaMarkup: (qaProdUrl, qaStagingUrl, variationName) =>
                    `<h3>${variationName}</h3><p><strong>Prod:</strong> <a href="${qaProdUrl}" target="_blank">${qaProdUrl}</a></p>` +
                    (qaStagingUrl ? `<p><strong>Stage:</strong> <a href="${qaStagingUrl}" target="_blank">${qaStagingUrl}</a></p>` : '')
            }
        ];

        generateUrls(urls, variationName, eParam, vParam, qaParam);
    });

    // Output generated links
    const outputDiv = $('#output');
    const finalMarkup = buildFinalMarkup(previewNationalMarkup, previewLocalMarkup, qaNationalMarkup, qaLocalMarkup);

    if (finalMarkup) {
        outputDiv.addClass('urls-generated').html(finalMarkup);
    } else {
        outputDiv.removeClass('urls-generated').html('<p>No URLs were generated. Please check your inputs.</p>');
    }
}

// Handle empty variation link cases
function handleEmptyLink(variationName) {
    previewNationalMarkup += nationalChecked ? `<h3>${variationName} (National)</h3><p class="error-message">Variation link is empty.</p>` : '';
    previewLocalMarkup += localChecked ? `<h3>${variationName} (Local)</h3><p class="error-message">Variation link is empty.</p>` : '';
}

// Handle invalid variation link cases
function handleInvalidLink(variationName) {
    previewNationalMarkup += nationalChecked ? `<h3>${variationName} (National)</h3><p class="error-message">Invalid variation link.</p>` : '';
    previewLocalMarkup += localChecked ? `<h3>${variationName} (Local)</h3><p class="error-message">Invalid variation link.</p>` : '';
}

// Build final markup for all preview/QA sections
function buildFinalMarkup(previewNational, previewLocal, qaNational, qaLocal) {
    let finalMarkup = '';
    if (previewNational) finalMarkup += `<h2>National Preview Links</h2>${previewNational}`;
    if (previewLocal) finalMarkup += `<h2>Local Preview Links</h2>${previewLocal}`;
    if (qaNational) finalMarkup += `<h2>National QA Links</h2>${qaNational}`;
    if (qaLocal) finalMarkup += `<h2>Local QA Links</h2>${qaLocal}`;
    return finalMarkup;
}
