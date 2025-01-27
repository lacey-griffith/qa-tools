import { text } from 'express';
import { brands } from './config.js';

let copy_btn = `<button class='copy'> Copy
<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>
</button>`;

let nblyForm = `<div class='nbly-form'>
                    <div class='checkbox-outer'>
                        <div class="form-group checkbox-container">
                            <input type="checkbox" id="local-pages" name="local-pages">
                            <label for="local-pages">Local Pages</label>
                        </div>
                        <div class="form-group checkbox-container">
                            <input type="checkbox" id="national-pages" name="national-pages" checked>
                            <label for="national-pages">National Pages</label>
                        </div>
                        <div class='error-msg'>Select Local or National.</div>
                    </div>

                    <div class="form-group prod-required required">
                        <label for="prod-url">Prod Natl URL:</label>
                        <input type="text" id="prod-url" name="prod-url" placeholder="Enter Prod URL">
                        <div class='error-msg'>This URL is required.</div>
                    </div>

                    <div class="form-group">
                        <label for="staging-url">Staging Natl URL:</label>
                        <input type="text" id="staging-url" name="staging-url" placeholder="Enter Staging URL">
                    </div>

                    <div class="form-group">
                        <label for="prod-local-url">Prod Local URL:</label>
                        <input type="text" id="prod-local-url" name="local-url" placeholder="Enter Prod Local URL">
                    </div>

                    <div class="form-group">
                        <label for="staging-local-url">Staging Local URL:</label>
                        <input type="text" id="staging-local-url" name="staging-local-url" placeholder="Enter Staging Local URL">
                    </div>

                    <div class="form-group">
                        <label for="qa-param">QA Parameter:</label>
                        <input type="text" id="qa-param" name="qa-param" placeholder="Enter QA Parameter">
                    </div>

                    <div id="variation-group-container">
                        <div class="variation-group">
                            <label contendeditable="true" for="variation-control">Control:</label>
                            <input type="text" id="variation-control" name="variation-live-qa[]"
                                placeholder="Enter Preview Link">
                        </div>

                        <div class="variation-group">
                            <label contendeditable="true" for="variation-1">V1:</label>
                            <input type="text" id="variation-1" name="variation-live-qa[]"
                                placeholder="Enter Preview Link">
                        </div>
                        <button class="btn add-var" type="button">+</button>
                    </div>
                    <button class="btn" id="clear-button">Clear</button>
                    <button class="btn" type="button" id='generate-btn'>Generate</button>
                </div>`;

let regForm = `
        <div class='reg-form'>
                    <div class="form-group">
                        <label for="prod-url">URL:</label>
                        <input type="text" id="prod-url" name="prod-url" placeholder="Enter URL">
                    </div>

                    <div class="form-group">
                        <label for="staging-url">Staging URL:</label>
                        <input type="text" id="staging-url" name="staging-url" placeholder="Enter Staging URL">
                    </div>

                    <div class="form-group">
                        <label for="qa-param">QA Parameter:</label>
                        <input type="text" id="qa-param" name="qa-param" placeholder="Enter QA Parameter">
                    </div>

                    <div id="variation-group-container">
                        <div class="variation-group">
                            <label contendeditable="true for="variation-control">Control:</label>
                            <input type="text" id="variation-control" name="variation-live-qa[]"
                                placeholder="Enter Preview Link">
                        </div>

                        <div class="variation-group">
                            <label contendeditable="true for="variation-1">V1:</label>
                            <input type="text" id="variation-1" name="variation-live-qa[]"
                                placeholder="Enter Preview Link">
                        </div>
                        <button class="btn add-var" type="button">+</button>
                    </div>
                    <button class="btn" id="clear-button">Clear</button>
                    <button class="btn" type="button" id='generate-btn'>Generate</button>
                </div>`;

let ADMForm = `<div>
                <div>🚧 Work In Progress! 🚧</div>
                <a class='lol' href='#'>don't click it</a>
            </div>`;

(function () {
    function addSteps() {
        //target parent container
        let container = $('section#url-generator');
        container.addClass('step-container no-form');

        //add brand btn contaiiner
        container.append(`<h4>QA URL Generator</h4>
            <div id='form' class='form-option'>
            <div class='tool-inner'>
                <div id='stepOne' class=''>
                    <h2>Choose Client:</h2>
                    <div class='brand-btn-container initial'></div>
                </div>
                <div class='url-generator-inner tool-body transparent-background'></div>
            </div>
        </div>
        <div id="output" class="output" ></div>`);

        //build button for each active brand
        brands.forEach(function (item, i) {
            //skip inactive clients
            if (!item.active_client) {
                return;
            }
            let btn = `<button data-handle='${item.brand_handle}' data-neighborly=${item.neighborly}>${item.brand}</button>`;
            $('#stepOne .brand-btn-container').append(btn);
        });

        //send user to step 2 on button click
        $('#stepOne button').on('click', function () {
            $('.brand-btn-container').removeClass('initial');
            let handle = $(this).attr('data-handle');

            //remove active class from other buttons
            if (!$(this).hasClass('active')) {
                $('#stepOne button.active').removeClass('active');
                $(this).addClass('active');
            }

            //build forms
            buildForm(handle);
        });
    }

    //show the right form per client
    function buildForm(handle) {
        let activeBrand = brands.find(brand => brand.brand_handle === handle);
        let markUp = ``;

        //if brand.neighborly is true
        if (activeBrand.neighborly) {
            markUp = nblyForm;
            //if brand.neighborly is false
        } else if (!activeBrand.neighborly) {
            //If ADM (Optimizely)
            if (!activeBrand.neighborly && activeBrand.brand === 'ADM') {
                markUp = ADMForm;
            } else {
                markUp = regForm;
            }
        }

        $('section#url-generator').removeClass('no-form').addClass('form-present');

        //add respective form to page and show it
        $('#form .tool-body').html(markUp);
        $('#form .tool-body').removeClass('transparent-background');

        //Set values based on brand info
        console.log(activeBrand.staging)
        console.log($('#form #prod-url'))
        $('#form #prod-url').val(activeBrand.prod)
        $('#form #staging-url').val(activeBrand.staging)

        //include neighborly local pages
        if (activeBrand.neighborly) {
            $('#form #prod-local-url').val(activeBrand.prod_local_homepage)
            $('#form #staging-local-url').val(activeBrand.staging_local_homepage)
        }

        //add event listener for adding a variaton btn (+)
        $('button.btn.add-var').on('click', function () {
            addVariationInput();
        });

        //make labels editable
        $('section#url-generator #variation-group-container .variation-group').each((i, eL) => {
            let label = $(eL).find('label');
            labelEditor(label);
        });

        //add event listener to clear form
        $('#clear-button').on('click', function () {
            Clear();
        });

        //add event listener to generate urls
        $('#generate-btn').on('click', function () {
            console.log('clicked')
            console.log(activeBrand.neighborly)
            if (activeBrand.neighborly) {
                generateNblyUrls();
            } else {
                generateUrls();
            }
        });

        //i crack myself up tbh
        let clicks = 0;
        $('a.lol').on('click', function () {
            console.log(clicks)
            let url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            clicks++
            if (clicks == 1) {
                $(this).text('stopppp it');
            } else if (clicks == 2) {
                $(this).text('seriously? knock it off');
            } else if (clicks == 3) {
                $(this).text('ok I warned you... last chance');
            } else if (clicks >= 4) {
                window.open(url, "_blank");
            }
        });
    }

    //Add more variations
    let varCount = 2;
    function addVariationInput() {
        varCount++;
        //target container
        let varContainer = $('#variation-group-container');

        let newVar = `<div class="variation-group">
            <label contendeditable="true" for="variation-${varCount - 1}">V${varCount - 1}:</label>
            <input type="text" id="variation-${varCount - 1}" name="variation-live-qa[]" placeholder="Enter Preview Link">
        </div>`;

        //add new label to page and make it editable
        varContainer.append(newVar);
        let label = $(`.variation-group [for="variation-${varCount - 1}"]`);
        labelEditor(label);
    }

    // Variation Label editing
    const labelEditor = (label) => {
        label.attr('contenteditable', 'true');

        label.on('click', function () {
            let text = $(this).text();
            $(this).replaceWith(`<input class="editing-label" autofocus/>`);
            $('input.editing-label').val(text).focus();
            labelEditorEvents(text);
        });
    };

    function labelEditorEvents(OgText) {
        $('input.editing-label').on('blur keydown', function (e) {
            //only trigger for enter key
            if (e.type === 'keydown' && e.keyCode !== 13) {
                return;
            }

            e.preventDefault();
            let text = $(this).val();
            if (text === '') {
                text = OgText;
            }

            let labelFor = $(this).next('input').attr('id');
            $(this).replaceWith(`<label for=${labelFor}>${text}</label>`);
            labelEditor($(`label[for=${labelFor}]`));
        });
    }

    function generateUrls() {
        const prodUrl = $('#form #prod-url').val().trim();
        const stagingUrl = $('#form #staging-url').val().trim();
        const qaParam = $('#form #qa-param').val().trim();



    }

    function generateNblyUrls() {
        console.log('generating neighborly urls...');

        const prodUrl = $('#form #prod-url').val().trim();
        const stagingUrl = $('#form #staging-url').val().trim();
        const qaParam = $('#form #qa-param').val().trim();

        const localProdUrl = $('#form #prod-local-url').val().trim();
        const localStagingUrl = $('#form #staging-local-url').val().trim();

        const nationalChecked = $('#national-pages').is(':checked');
        const localChecked = $('#local-pages').is(':checked');
        

        //check that at least one is selected
        if (!localChecked && !nationalChecked) {
            $('.nbly-form .checkbox-outer .error-msg').addClass('show');
            return;
        }
        $('.nbly-form .checkbox-outer .error-msg.show').removeClass('show');

        //check if main url is present
        if (!prodUrl) {
            $('.prod-required .error-msg').addClass('show');
            return;
        }
        $('.prod-required .error-msg.show').removeClass('show');

        // Select all variation input elements
        const variationInputs = $('input[name^="variation-"]');
        if (variationInputs.length === 0) {
            $('#variation-group-container .error-msg').addClass('show');
            return;
        }
        $('#variation-group-container .error-msg.show').removeClass('show');

        let previewNationalMarkup = '';
        let previewLocalMarkup = '';
        let qaNationalMarkup = '';
        let qaLocalMarkup = '';

        // Helper function to extract parameters from a URL
        function extractConvertParams(url) {
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

        // Process variation inputs and generate both preview and QA links
        variationInputs.each(function () {
            const variationLink = $(this).val().trim();
            const variationName = $(this).prev('label').text();

            if (!variationLink) {
                // Handle empty variation links for both National and Local
                if (nationalChecked) {
                    previewNationalMarkup += `<h3>${variationName} (National)</h3><p class="error-message">Variation link is empty.</p>`;
                    qaNationalMarkup += `<h3>${variationName} (National)</h3><p class="error-message">Variation link is empty.</p>`;
                }
                if (localChecked) {
                    previewLocalMarkup += `<h3>${variationName} (Local)</h3><p class="error-message">Variation link is empty.</p>`;
                    qaLocalMarkup += `<h3>${variationName} (Local)</h3><p class="error-message">Variation link is empty.</p>`;
                }
                return;
            }

            const params = extractConvertParams(variationLink);
            if (!params) {
                // Handle invalid variation links for both National and Local
                if (nationalChecked) {
                    previewNationalMarkup += `<h3>${variationName} (National)</h3><p class="error-message">Invalid variation link. Unable to generate URLs.</p>`;
                    qaNationalMarkup += `<h3>${variationName} (National)</h3><p class="error-message">Invalid variation link. Unable to generate URLs.</p>`;
                }
                if (localChecked) {
                    previewLocalMarkup += `<h3>${variationName} (Local)</h3><p class="error-message">Invalid variation link. Unable to generate URLs.</p>`;
                    qaLocalMarkup += `<h3>${variationName} (Local)</h3><p class="error-message">Invalid variation link. Unable to generate URLs.</p>`;
                }
                return;
            }

            const { eParam, vParam } = params;
            //set up urls if QA param is present for live qa or as preview links
            let liveQaQuery = `?_conv_eforce=${eParam}.${vParam}`;
            if (qaParam) {
                liveQaQuery = `?utm_medium=${qaParam}&_conv_eforce=${eParam}.${vParam}`;
            }

            // Generate URLs for National + Local + Preview + Live QA
            const urls = [
                {
                    type: 'National',
                    prodUrl: prodUrl,
                    stagingUrl: stagingUrl
                },
                {
                    type: 'Local',
                    prodUrl: localProdUrl,
                    stagingUrl: localStagingUrl
                }
            ];

            urls.forEach(url => {
                if (nationalChecked && url.type === 'National' || localChecked && url.type === 'Local') {
                    const previewProdUrl = `${url.prodUrl}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}`;
                    const previewStagingUrl = url.stagingUrl ? `${url.stagingUrl}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}` : '';
                    const qaProdUrl = `${url.prodUrl}${liveQaQuery}`;
                    const qaStagingUrl = url.stagingUrl ? `${url.stagingUrl}${liveQaQuery}` : '';
            
                    // Separate National and Local links
                    if (url.type === 'National') {
                        // Add to National Preview Links
                        previewNationalMarkup += `<h3>${variationName}</h3>`;
                        previewNationalMarkup += `<p><strong>Prod:</strong> <a href="${previewProdUrl}" target="_blank">${previewProdUrl}</a></p>`;
                        if (previewStagingUrl) {
                            previewNationalMarkup += `<p><strong>Stage:</strong> <a href="${previewStagingUrl}" target="_blank">${previewStagingUrl}</a></p>`;
                        }
            
                        // Add to National QA Links
                        qaNationalMarkup += `<h3>${variationName}</h3>`;
                        qaNationalMarkup += `<p><strong>Prod:</strong> <a href="${qaProdUrl}" target="_blank">${qaProdUrl}</a></p>`;
                        if (qaStagingUrl) {
                            qaNationalMarkup += `<p><strong>Stage:</strong> <a href="${qaStagingUrl}" target="_blank">${qaStagingUrl}</a></p>`;
                        }
                    } else if (url.type === 'Local') {
                        // Add to Local Preview Links
                        previewLocalMarkup += `<h3>${variationName}</h3>`;
                        previewLocalMarkup += `<p><strong>Prod:</strong> <a href="${previewProdUrl}" target="_blank">${previewProdUrl}</a></p>`;
                        if (previewStagingUrl) {
                            previewLocalMarkup += `<p><strong>Stage:</strong> <a href="${previewStagingUrl}" target="_blank">${previewStagingUrl}</a></p>`;
                        }
            
                        // Add to Local QA Links
                        qaLocalMarkup += `<h3>${variationName}</h3>`;
                        qaLocalMarkup += `<p><strong>Prod:</strong> <a href="${qaProdUrl}" target="_blank">${qaProdUrl}</a></p>`;
                        if (qaStagingUrl) {
                            qaLocalMarkup += `<p><strong>Stage:</strong> <a href="${qaStagingUrl}" target="_blank">${qaStagingUrl}</a></p>`;
                        }
                    }
                }
            });
            
            // Output the generated links separately for National and Local
            const outputDiv = $('#output');
            outputDiv.html(`
            `);

                if (previewNationalMarkup) {
                    outputDiv.append(`<div id="national-preview">
                        ${copy_btn}
                        <div class='link-container'></div>
                        </div>`);
                    $('#national-preview .link-container').html(`<h2>National Preview Links</h2>${previewNationalMarkup}`);
                }
                if (previewLocalMarkup) {
                    outputDiv.append(`<div id="local-preview"> 
                        ${copy_btn}
                        <div class='link-container'></div>
                        </div>`);
                    $('#local-preview .link-container').html(`<h2>Local Preview Links</h2>${previewLocalMarkup}`);
                }
                if (qaNationalMarkup) {
                    outputDiv.append(`<div id="national-qa">
                        ${copy_btn}
                        <div class='link-container'></div>
                        </div>`);
                    $(`#national-qa .link-container`).html(`<h2>National QA Links</h2>${qaNationalMarkup}`);
                }
                if (qaLocalMarkup) {
                    outputDiv.append(`<div id="local-qa">
                        ${copy_btn}
                        <div class='link-container'></div>
                        </div>`);
                    $('#local-qa .link-container').html(`<h2>Local QA Links</h2>${qaLocalMarkup}`);
                }
            
                // If no URLs were generated, show a message
                if (!previewNationalMarkup && !previewLocalMarkup && !qaNationalMarkup && !qaLocalMarkup) {
                    outputDiv.removeClass('urls-generated').html('<p>No URLs were generated. Please check your inputs.</p>');
                } else {
                    outputDiv.addClass('urls-generated');
                }

                $('button.copy').on('click', function(){
                    copyText($(this));
                });
            
        });
    }

    /* copy function */
    function copyText(button) {

        // Find the closest parent div to the clicked button
        const parentDiv = button.parent().find('.link-container');

        // Get the text content of all elements inside the parent div
        const textToCopy = parentDiv.innerText;
        console.log(parentDiv);
        console.log(textToCopy)

        // Copy the text to the clipboard
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Text copied to clipboard:', textToCopy);
            })
            .catch(err => {
                console.error('Failed to copy text:', err);
            });
    }

    function Clear() {
        //remove additional variations that may have been added
        const variations = $('#url-generator input[id^="variation-"]');
        variations.each((i, input) => {
            //remove any that are not variation-control or variation-1
            if (input.id !== 'variation-control' && input.id !== 'variation-1') {
                $(input).parent().remove();
            } else {
                //determine if its not the control, must be v1, apply text accordingly
                const labelText = input.id === 'variation-control' ? 'Control:' : 'V1:';
                $(input).val('');
                //console.log(labelText)
                console.log($(input).parent().find('label'))
                $(input).parent().find('label').text(labelText);
            }
        });

        //remove input values of urls & output

    }


    document.addEventListener('DOMContentLoaded', function (e) {
        addSteps();
    });
})();

/*
$('#variation-control').val('https://mrelectric.com/?convert_action=convert_vpreview&convert_e=1004123614&convert_v=1004293134');
$('#variation-1').val('https://mrelectric.com/?convert_action=convert_vpreview&convert_e=1004123614&convert_v=1004293135');
$('#variation-2').val('https://mrelectric.com/?convert_action=convert_vpreview&convert_e=1004123614&convert_v=9999999999');
 */