/*function generateNblyUrls() {
    console.log('Generating Neighborly URLs...');

    const prodUrl = $('#prod-url').val().trim();
    const stagingUrl = $('#staging-url').val().trim();
    const qaParam = $('#qa-param').val().trim();

    const localProdUrl = $('#prod-local-url').val().trim();
    const localStagingUrl = $('#staging-local-url').val().trim();

    const nationalChecked = $('#national-pages').is(':checked');
    const localChecked = $('#local-pages').is(':checked');

    console.log('National checked:', nationalChecked);
    console.log('Local checked:', localChecked);

    if (!localChecked && !nationalChecked) {
        showError('.nbly-form .checkbox-outer .error-msg');
        return;
    }
    hideError('.nbly-form .checkbox-outer .error-msg');

    if (!prodUrl) {
        showError('.prod-required .error-msg');
        return;
    }
    hideError('.prod-required .error-msg');

    const variationInputs = $('input[name^="variation-"]');
    if (variationInputs.length === 0) {
        showError('#variation-group-container .error-msg');
        return;
    }
    hideError('#variation-group-container .error-msg');

    let previewNationalMarkup = '';
    let previewLocalMarkup = '';
    let qaNationalMarkup = '';
    let qaLocalMarkup = '';

    // Helper function to handle error messages
    function showError(selector) {
        $(selector).addClass('show');
    }

    function hideError(selector) {
        $(selector).removeClass('show');
    }

    // Helper function to extract parameters from the URL
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

    // Helper function to generate markup for URLs
    function generateUrlsMarkup(variationName, eParam, vParam, urls) {
        const liveQaQuery = qaParam ? `?utm_medium=${qaParam}&_conv_eforce=${eParam}.${vParam}` : `?_conv_eforce=${eParam}.${vParam}`;
        const result = {
            previewNational: '',
            previewLocal: '',
            qaNational: '',
            qaLocal: ''
        };

        urls.forEach(url => {
            const previewProdUrl = `${url.prodUrl}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}`;
            const previewStagingUrl = url.stagingUrl ? `${url.stagingUrl}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}` : '';
            const qaProdUrl = `${url.prodUrl}${liveQaQuery}`;
            const qaStagingUrl = url.stagingUrl ? `${url.stagingUrl}${liveQaQuery}` : '';

            if (url.type === 'National') {
                result.previewNational = `<h3>${variationName}</h3><p><strong>Prod:</strong> <a href="${previewProdUrl}" target="_blank">${previewProdUrl}</a></p>`;
                if (previewStagingUrl) result.previewNational += `<p><strong>Stage:</strong> <a href="${previewStagingUrl}" target="_blank">${previewStagingUrl}</a></p>`;
                result.qaNational = `<h3>${variationName}</h3><p><strong>Prod:</strong> <a href="${qaProdUrl}" target="_blank">${qaProdUrl}</a></p>`;
                if (qaStagingUrl) result.qaNational += `<p><strong>Stage:</strong> <a href="${qaStagingUrl}" target="_blank">${qaStagingUrl}</a></p>`;
            } else if (url.type === 'Local') {
                result.previewLocal = `<h3>${variationName}</h3><p><strong>Prod:</strong> <a href="${previewProdUrl}" target="_blank">${previewProdUrl}</a></p>`;
                if (previewStagingUrl) result.previewLocal += `<p><strong>Stage:</strong> <a href="${previewStagingUrl}" target="_blank">${previewStagingUrl}</a></p>`;
                result.qaLocal = `<h3>${variationName}</h3><p><strong>Prod:</strong> <a href="${qaProdUrl}" target="_blank">${qaProdUrl}</a></p>`;
                if (qaStagingUrl) result.qaLocal += `<p><strong>Stage:</strong> <a href="${qaStagingUrl}" target="_blank">${qaStagingUrl}</a></p>`;
            }
        });

        return result;
    }

    variationInputs.each(function () {
        const variationLink = $(this).val().trim();
        const variationName = $(this).prev('label').text();

        if (!variationLink) {
            const errorMessage = `<h3>${variationName}</h3><p class="error-message">Variation link is empty.</p>`;
            if (nationalChecked) previewNationalMarkup += errorMessage;
            if (localChecked) previewLocalMarkup += errorMessage;
            return;
        }

        const params = extractConvertParams(variationLink);
        if (!params) {
            const invalidLinkMessage = `<h3>${variationName}</h3><p class="error-message">Invalid variation link. Unable to generate URLs.</p>`;
            if (nationalChecked) previewNationalMarkup += invalidLinkMessage;
            if (localChecked) previewLocalMarkup += invalidLinkMessage;
            return;
        }

        const { eParam, vParam } = params;
        const urls = [
            { type: 'National', prodUrl, stagingUrl },
            { type: 'Local', prodUrl: localProdUrl, stagingUrl: localStagingUrl }
        ];

        const markup = generateUrlsMarkup(variationName, eParam, vParam, urls);

        if (nationalChecked) {
            previewNationalMarkup += markup.previewNational;
            qaNationalMarkup += markup.qaNational;
        }
        if (localChecked) {
            previewLocalMarkup += markup.previewLocal;
            qaLocalMarkup += markup.qaLocal;
        }
    });

    const outputDiv = $('#output');
    let finalMarkup = '';

    if (previewNationalMarkup) finalMarkup += `<h2>National Preview Links</h2>${previewNationalMarkup}`;
    if (previewLocalMarkup) finalMarkup += `<h2>Local Preview Links</h2>${previewLocalMarkup}`;
    if (qaNationalMarkup) finalMarkup += `<h2>National QA Links</h2>${qaNationalMarkup}`;
    if (qaLocalMarkup) finalMarkup += `<h2>Local QA Links</h2>${qaLocalMarkup}`;

    if (finalMarkup) {
        outputDiv.addClass('urls-generated').html(finalMarkup);
    } else {
        outputDiv.removeClass('urls-generated').html('<p>No URLs were generated. Please check your inputs.</p>');
    }
}
*/

/* CHAT GPT VERSION */