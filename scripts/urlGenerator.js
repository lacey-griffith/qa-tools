import { brands, nblyForm, regForm } from '../data/config.js';
import { testBtnHandler } from '../data/testing.js';
import { copyText, clear } from './helpers.js';

let enableTesting = false; // set to true to reveal the "fill-in values test" button;

(function () {
    function addSteps() {
        //target parent container
        let container = $('section#url-generator');
        container.addClass('step-container no-form');

        //add brand btn container
        container.append(`<h4>QA URL Generator</h4>
            <div id="form" class="form-option">
            <div class="tool-inner">
                <div id="stepOne" class="">
                    <h2>Choose Client:</h2>
                    <div class="brand-btn-container initial"></div>
                </div>
                <div class="url-generator-inner tool-body transparent-background"></div>
            </div>
        </div>
        <div id="output" class="output" ></div>`);

        //build button for each active brand
        brands.forEach(function (item, i) {
            //skip inactive clients
            if (!item.active_client) {
                return;
            }
            let btn = `<button data-handle="${item.brand_handle}" data-neighborly=${item.neighborly}>${item.brand}</button>`;
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
        let markUp = ``; // #fpoo-codes remove hidden
        const fpooCodes = document.querySelector('#fpoo-codes');

        //if brand.neighborly is true
        if (activeBrand.neighborly) {
            markUp = nblyForm(enableTesting);
            //if brand.neighborly is false
        } else if (activeBrand.brand === 'ADM') {
            markUp = ADMForm;
        } else {
            if (handle === 'fresh-pressed-olive-oil') {
                fpooCodes.classList.remove('hidden');
            }
            else {
                fpooCodes.classList.add('hidden');
            }
            markUp = regForm(enableTesting);
        }

        $('section#url-generator').removeClass('no-form').addClass('form-present');

        //add respective form to page and show it
        $('#form .tool-body').html(markUp);
        $('#form .tool-body').removeClass('transparent-background');

        // add testing functionality if enabled
        if (enableTesting) testBtnHandler(activeBrand);

        //Set values based on brand info
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
            clear();
        });

        //add event listener to generate urls
        $('#generate-btn').on('click', function () {
            if (activeBrand.neighborly) {
                generateNblyUrls();
            } else {
                generateUrls();
            }
        });

        //i crack myself up tbh
        let clicks = 0;
        $('a.lol').on('click', function () {
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

    /**
     * this function declares the variables for URLs and parameters based on the form values
     */
    const generateUrls = () => {
        const prodUrl = document.querySelector('#form #prod-url').value.trim();
        const stagingUrl = document.querySelector('#form #staging-url').value.trim();
        const qaParam = document.querySelector('#form #qa-param').value.trim();
    }

    /**
     * description of function 
     * @returns String (string of a particular url, for example)
     */
    const generateNblyUrls = () => {
        console.log('generating neighborly urls...');

        const prodUrl = document.querySelector('#form #prod-url').value.trim();
        const stagingUrl = document.querySelector('#form #staging-url').value.trim();
        const qaParam = document.querySelector('#form #qa-param').value.trim();

        const localProdUrl = document.querySelector('#form #prod-local-url').value.trim();
        const localStagingUrl = document.querySelector('#form #staging-local-url').value.trim();

        const nationalChecked = document.querySelector('#national-pages').checked;
        const localChecked = document.querySelector('#local-pages').checked;
        

        //check that at least one is selected
        if (!localChecked && !nationalChecked) {
            document.querySelector('.nbly-form .checkbox-outer .error-msg')?.classList.add('show');
            return;
        }
        document.querySelector('.nbly-form .checkbox-outer .error-msg')?.classList.remove('show');

        //check if main url is present
        if (!prodUrl) {
            document.querySelector('.prod-required .error-msg')?.classList.add('show');
            return;
        }
        document.querySelector('.prod-required .error-msg')?.classList.remove('show');

        // Select all variation input elements
        const variationInputs = document.querySelectorAll('input[name^="variation-"]');
        if (!variationInputs.length) {
            document.querySelector('#variation-group-container .error-msg')?.classList.add('show');
            return;
        }
        document.querySelector('#variation-group-container .error-msg')?.classList.remove('show');

        let previewNationalMarkup = '';
        let previewLocalMarkup = '';
        let qaNationalMarkup = '';
        let qaLocalMarkup = '';

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

        /**
         * Process variation inputs and generate both preview and QA links
         */
        Array.from(variationInputs).forEach((input) => {
            const variationLink = input.value.trim();
            const variationName = input.previousElementSibling.textContent;

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
                        previewNationalMarkup += `<span>\n</span><h3>${variationName}</h3><span>\n</span>`;
                        previewNationalMarkup += `<p><strong>Prod:</strong> <a href="${previewProdUrl}" target="_blank">${previewProdUrl}</a></p>`;
                        if (previewStagingUrl) {
                            previewNationalMarkup += `<p><strong>Staging:</strong> <a href="${previewStagingUrl}" target="_blank">${previewStagingUrl}</a></p>`;
                        }
            
                        // Add to National QA Links
                        qaNationalMarkup += `<span>\n</span><h3>${variationName}</h3><span>\n</span>`;
                        qaNationalMarkup += `<p><strong>Prod:</strong> <a href="${qaProdUrl}" target="_blank">${qaProdUrl}</a></p>`;
                        if (qaStagingUrl) {
                            qaNationalMarkup += `<p><strong>Staging:</strong> <a href="${qaStagingUrl}" target="_blank">${qaStagingUrl}</a></p>`;
                        }
                    } else if (url.type === 'Local') {
                        // Add to Local Preview Links
                        previewLocalMarkup += `<span>\n</span><h3>${variationName}</h3><span>\n</span>`;
                        previewLocalMarkup += `<p><strong>Prod:</strong> <a href="${previewProdUrl}" target="_blank">${previewProdUrl}</a></p>`;
                        if (previewStagingUrl) {
                            previewLocalMarkup += `<p><strong>Staging:</strong> <a href="${previewStagingUrl}" target="_blank">${previewStagingUrl}</a></p>`;
                        }
            
                        // Add to Local QA Links
                        qaLocalMarkup += `<span>\n</span><h3>${variationName}</h3><span>\n</span>`;
                        qaLocalMarkup += `<p><strong>Prod:</strong> <a href="${qaProdUrl}" target="_blank">${qaProdUrl}</a></p>`;
                        if (qaStagingUrl) {
                            qaLocalMarkup += `<p><strong>Staging:</strong> <a href="${qaStagingUrl}" target="_blank">${qaStagingUrl}</a></p>`;
                        }
                    }
                }
            });
            
            // Output the generated links separately for National and Local
            const outputDiv = document.querySelector('#output');
            // clear the current div first
            outputDiv.innerHTML = '';

                if (previewNationalMarkup) {
                    outputDiv.insertAdjacentHTML('beforeend', `<div id="national-preview">
                        <div class="link-container"></div>
                    </div>`);
                    document.querySelector('#national-preview .link-container').innerHTML = `<span>\n</span><h2>National Preview Links</h2>${previewNationalMarkup}`;
                }
                if (previewLocalMarkup) {
                    outputDiv.insertAdjacentHTML('beforeend', `<div id="local-preview"> 
                        <div class="link-container"></div>
                    </div>`);
                    document.querySelector('#local-preview .link-container').innerHTML = `<span>\n</span><h2>Local Preview Links</h2>${previewLocalMarkup}`;
                }
                if (qaNationalMarkup) {
                    outputDiv.insertAdjacentHTML('beforeend', `<div id="national-qa">
                        <div class="link-container"></div>
                    </div>`);
                    document.querySelector(`#national-qa .link-container`).innerHTML = `<span>\n</span><h2>National QA Links</h2>${qaNationalMarkup}`;
                }
                if (qaLocalMarkup) {
                    outputDiv.insertAdjacentHTML('beforeend', `<div id="local-qa">
                        <div class="link-container"></div>
                    </div>`);
                    document.querySelector('#local-qa .link-container').innerHTML = `<span>\n</span><h2>Local QA Links</h2>${qaLocalMarkup}`;
                }
            
                // If no URLs were generated, show a message
                if (!previewNationalMarkup && !previewLocalMarkup && !qaNationalMarkup && !qaLocalMarkup) {
                    outputDiv.classList.remove('urls-generated').innerHTML = '<p>No URLs were generated. Please check your inputs.</p>';
                } else {
                    outputDiv.classList.add('urls-generated');
                }

                outputDiv.insertAdjacentHTML('beforeend', `<div class="copy-container">
                    <button class="copy"> Copy
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>
                    </button>
                </div>`);

                document.querySelector('button.copy').addEventListener('click', (e) => {
                    copyText(e.target);
                });
            
        });
    }

    document.addEventListener('DOMContentLoaded', function (e) {
        addSteps();
    });
})();
