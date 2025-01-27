/* * * * * * * * */
/* QA URL GENERATOR */
/* * * * * * * * */
let brands = [
    /* NBLY */
    {
    brand_handle: 'aire-serve',
    brand: 'ASV',
    conceptID: 3,
    prod: 'https://www.aireserv.com/',
    stage: 'https://dig-www-nei-asv-stage.nblytest.com/',
    neighborly: true,
    prod_local_homepage:'https://www.aireserv.com/jacksonville',
    staging_local_homepage:'https://dig-www-nei-asv-stage.nblytest.com/jacksonville'
}, {
    brand_handle: 'five-star-painting',
    brand: 'FSP',
    conceptID: 4,
    prod: 'https://www.fivestarpainting.com/',
    stage: 'https://dig-www-nei-fsp-stage.nblytest.com/',
    neighborly: true,
    prod_local_homepage:'https://www.fivestarpainting.com/lagrange/',
    staging_local_homepage:'https://dig-www-nei-fsp-stage.nblytest.com/lagrange'
}, {
    brand_handle: 'grounds-guys',
    brand: 'GUY',
    conceptID: 6,
    prod: 'https://www.groundsguys.com/',
    stage: 'https://dig-www-nei-guy-stage.nblytest.com/',
    neighborly: true,
    prod_local_homepage:'https://www.groundsguys.com/sparksnv/',
    staging_local_homepage:'https://dig-www-nei-guy-stage.nblytest.com/sparksnv'
}, {
    brand_handle: 'glass-doctor',
    brand: 'MDG',
    conceptID: 5,
    prod: 'https://www.glassdoctor.com/',
    stage: 'https://develop-dwyr-mdg.pantheonsite.io/',
    neighborly: true,
    prod_local_homepage:'https://www.glassdoctor.com/tacoma-wa',
    staging_local_homepage:'https://develop-dwyr-mdg.pantheonsite.io/tacoma-wa/'
}, {
    brand_handle: 'molly-maid',
    brand: 'MLY',
    conceptID: 1,
    prod: 'https://www.mollymaid.com/',
    stage: 'https://dig-www-nei-mly2-stage.nblytest.com/',
    neighborly: true,
    prod_local_homepage:'https://www.mollymaid.com/chelmsford/',
    staging_local_homepage:'https://dig-www-nei-mly2-stage.nblytest.com/chelmsford/'
}, {
    brand_handle: 'mosquito-joe',
    brand: 'MOJ',
    conceptID: 18,
    prod: 'https://mosquitojoe.com/',
    stage: 'https://dig-www-nei-moj2-stage.nblytest.com/',
    neighborly: true,
    prod_local_homepage:'https://mosquitojoe.com/locations/northern-delaware/',
    staging_local_homepage:'https://dig-www-nei-moj2-stage.nblytest.com/locations/northern-delaware/'
},{
    brand_handle: 'mr-appliance',
    brand: 'MRA',
    conceptID: 8,
    prod: 'https://www.mrappliance.com/',
    stage: 'https://dig-www-nei-mra-stage.nblytest.com/',
    neighborly: true,
    prod_local_homepage:'https://www.mrappliance.com/indianapolis/',
    staging_local_homepage:'https://dig-www-nei-mra-stage.nblytest.com/indianapolis/'
}, {
    brand_handle: 'mr-electric',
    brand: 'MRE',
    conceptID: 9,
    prod: 'https://mrelectric.com/',
    stage: 'https://dig-www-nei-mre2.nblyprod.com/',
    neighborly: true,
    prod_local_homepage:'https://mrelectric.com/san-antonio',
    staging_local_homepage:'https://dig-www-nei-mre2.nblyprod.com/san-antonio'
}, {
    brand_handle: 'mr-handyman',
    brand: 'MRH',
    conceptID: 2,
    prod: 'https://www.mrhandyman.com/',
    stage: 'https://dig-www-nei-mrh-stage.nblytest.com/',
    neighborly: true,
    prod_local_homepage:'https://www.mrhandyman.com/south-essex-county/',
    staging_local_homepage:'https://dig-www-nei-mrh-stage.nblytest.com/south-essex-county/'
}, {
    brand_handle: 'mr-rooter',
    brand: 'MRR',
    conceptID: 10,
    prod: 'https://www.mrrooter.com/',
    stage: 'https://dig-www-nei-mrr-stage.nblytest.com/',
    neighborly: true,
    prod_local_homepage:'https://www.mrrooter.com/austin',
    staging_local_homepage:'https://dig-www-nei-mrr-stage.nblytest.com/austin'
},{
    brand_handle: 'window-genie',
    brand: 'WDG',
    conceptID: 16,
    prod: 'https://www.windowgenie.com/',
    stage: 'https://dig-www-nei-wdg2-stage.nblytest.com/',
    neighborly: true,
    prod_local_homepage:'https://www.windowgenie.com/west-austin',
    staging_local_homepage:'https://dig-www-nei-wdg2-stage.nblytest.com/west-austin'
},
/* NON NBLY */
{
    brand_handle: 'adm',
    brand: 'ADM',
    conceptID: 0,
    prod: 'https://www.adm.com/',
    stage: '',
    neighborly: false
},{
    brand_handle: 'sun-home-saunas',
    brand: 'Sun Home Saunas',
    conceptID: 0,
    prod: 'https://www.sunhomesaunas.com/',
    stage: '',
    neighborly: false
},{
    brand_handle: 'yoga-works',
    brand: 'Yoga Works',
    conceptID: 0,
    prod: 'https://yogaworks.com/',
    stage: '',
    neighborly: false
},{
    brand_handle: 'lights-fest',
    brand: 'Lights Festival',
    conceptID: 0,
    prod: 'https://www.thelightsfest.com/',
    stage: '',
    neighborly: false
},{
    brand_handle: 'lancer-skincare',
    brand: 'Lancer',
    conceptID: 0,
    prod: 'https://www.lancerskincare.com/',
    stage: '',
    neighborly: false
},/*{
    brand_handle: 'lexie-hearing',
    brand: 'Lexie Hearing',
    conceptID: 0,
    prod: 'https://www.lexiehearing.com/us',
    stage: '',
    neighborly: false
},{
    brand_handle: 'go-hearing',
    brand: 'Go Hearing',
    conceptID: 0,
    prod: 'https://www.gohearing.com/',
    stage: '',
    neighborly: false
},*/{
    brand_handle: '1up-nutrition',
    brand: '1UP',
    conceptID: 0,
    prod: 'https://www.1upnutrition.com/',
    stage: '',
    neighborly: false
},/*{
    brand_handle: 'emler-swim-school',
    brand: 'Emler',
    conceptID: 0,
    prod: 'https://www.emlerswimschool.com/',
    stage: '',
    neighborly: false
},*/{
    brand_handle: 'fresh-pressed-olive-oil',
    brand: 'FPOO',
    conceptID: 0,
    prod: 'https://www.freshpressedoliveoil.com/',
    stage: '',
    neighborly: false
},{
    brand_handle: 'moon-juice',
    brand: 'Moon Juice',
    conceptID: 0,
    prod: 'https://www.moonjuice.com/',
    stage: '',
    neighborly: false
},{
    brand_handle: 'spot-loan',
    brand: 'Spot Loan',
    conceptID: 0,
    prod: 'https://www.spotloan.com/',
    stage: '',
    neighborly: false
}];

// Variation Label editing
const labelEditor = (label) => {
    label.attr('contenteditable','true');

    label.on('click', function(){
        let text = $(this).text();
        $(this).replaceWith(`<input class="editing-label" autofocus/>`);
        $('input.editing-label').val(text).focus();
        labelEditorEvents(text);
    });
};

function labelEditorEvents(controlText){
    $('input.editing-label').on('blur keydown', function(e){
        //only trigger for enter key
        if(e.type ==='keydown' && e.keyCode !== 13){
            return;
        }

        e.preventDefault();
        let text = $(this).val();
        if(text === ''){
            text = controlText;
        }

        let labelFor = $(this).next('input').attr('id');
        $(this).replaceWith(`<label for=${labelFor}>${text}</label>`);
        labelEditor($(`label[for=${labelFor}]`));
    });
}

const updateLabel = (label) => {
    console.log('Updated label content:', label.textContent);
    // Add any logic here to dynamically update the label
};

function addSection(){
    let url_markup = `<h4>QA URL Generator</h4>
        <div class="tool-inner">
            <div id="brand-buttons" class="brand-btn-container"></div>

            <div class="url-generator-inner tool-body nbly-form">
                <div>
                    <div>
                        <div class="form-group checkbox-container">
                            <input type="checkbox" id="local-pages" name="local-pages">
                            <label for="local-pages">Local Pages</label>
                        </div>
                        <div class="form-group checkbox-container">
                            <input type="checkbox" id="national-pages" name="national-pages" checked>
                            <label for="national-pages">National Pages</label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="prod-url">Prod URL:</label>
                        <input type="text" id="prod-url" name="prod-url" placeholder="Enter Prod URL">
                    </div>

                    <div class="form-group">
                        <label for="staging-url">Staging URL:</label>
                        <input type="text" id="staging-url" name="staging-url" placeholder="Enter Staging URL">
                    </div>

                    <div class="form-group">
                        <label for="local-prod-url">Local Prod URL:</label>
                        <input type="text" id="local-prod-url" name="local-prod-url" placeholder="Enter Local Prod URL">
                    </div>

                    <div class="form-group">
                        <label for="local-stage-url">Local Stage URL:</label>
                        <input type="text" id="local-stage-url" name="local-stage-url" placeholder="Enter Local Stage URL">
                    </div>

                    <div class="form-group">
                        <label for="qa-param">QA Parameter:</label>
                        <input type="text" id="qa-param" name="qa-param" placeholder="Enter QA Parameter">
                    </div>

                    <div id="variation-group-container">
                        <div class="variation-group">
                            <label for="variation-control">Control:</label>
                            <input type="text" id="variation-control" name="variation-live-qa[]"
                                placeholder="Enter Preview Link">
                        </div>

                        <div class="variation-group">
                            <label for="variation-1">V1:</label>
                            <input type="text" id="variation-1" name="variation-live-qa[]"
                                placeholder="Enter Preview Link">
                        </div>
                        <button class="btn add-var" type="button" onclick="addVariationInput()">+</button>
                    </div>
                    <button class="btn" id="clear-button">Clear</button>
                    <button class="btn" type="button" onclick="generateUrls()">Generate</button>
                </div>
            </div>

            <div class="output" id="output"></div>
        </div>`;

        $('section#url-generator').append(url_markup);

        $('section#url-generator #variation-group-container .variation-group').each((i,eL) => {
            let label = $(eL).find('label');
            labelEditor(label);
        });
}

let variationCount = 2;
function addVariationInput() {
    variationCount++;
    //Container hosting variation inputs
    const variationGroupContainer = document.getElementById('variation-group-container');

    //Create new input & label
    const newVariationGroup = document.createElement('div');
    newVariationGroup.className = 'variation-group';
    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', 'variation-' + variationCount);
    newLabel.setAttribute('contenteditable', 'true');

    // Set label for the first input as "Live QA - Control", others as "Live QA - V1", "Live QA - V2", etc.
    newLabel.textContent = variationCount === 1 ? 'Control:' : 'V' + (variationCount - 1) + ':';

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('id', 'variation-' + (variationCount - 1));
    newInput.setAttribute('name', 'variation-[]');
    newInput.setAttribute('placeholder', 'Enter Preview Link');

    newVariationGroup.appendChild(newLabel);
    newVariationGroup.appendChild(newInput);

    variationGroupContainer.appendChild(newVariationGroup);
}

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
            previewLinksHtml += `<h3>${variationName}</h3><p><strong>Prod National:</strong> <a href="${nationalPreviewProd}" target="_blank">${nationalPreviewProd}</a></p>`;
            if (nationalPreviewStaging) {
                previewLinksHtml += `<p><strong>Stage National:</strong> <a href="${nationalPreviewStaging}" target="_blank">${nationalPreviewStaging}</a></p>`;
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
                    previewLinksHtml += `<p><strong>Stage Local:</strong> <a href="${localPreviewStaging}" target="_blank">${localPreviewStaging}</a></p>`;
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
                liveQaLinksHtml += `<h3>${variationName}</h3><p><strong>Prod Local:</strong> <a href="${localQaProd}" target="_blank">${localQaProd}</a></p>`;
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

// Generate buttons for each brand
function generateBrandButtons() {
    const brandDiv = document.getElementById('brand-buttons');
    
    brands.forEach(brand => {
        const button = document.createElement('button');
        button.textContent = brand.brand;
        button.setAttribute('data-neighborly', brand.neighborly)
        button.onclick = () => fillUrls(brand.prod, brand.stage, brand.prod_local_homepage, brand.staging_local_homepage, button);
        
        // Add an event listener for when the button is clicked
        button.addEventListener('click', function() {
        let isNeighborly = button.getAttribute('data-neighborly') === 'true';
        
        if (!isNeighborly) {
            // Uncheck the local pages checkbox if it's a non-NBLY brand
            document.querySelector('#local-pages').checked = false;
        }
        // Handle other button click functionality here
    });

        brandDiv.appendChild(button);
    });
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

// Generate the brand buttons on page load
addSection();
generateBrandButtons();

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
        // If the input's ID is not 'variation-live-qa-control' or 'variation-live-qa-1', remove it
        if (input.id !== 'variation-control' && input.id !== 'variation-1') {
            $(input).parent().remove();
            if(input.id === 'variation-control'){
                input.prev('label').text('Control:');
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

$('#variation-control').val('https://mrelectric.com/?convert_action=convert_vpreview&convert_e=1004123614&convert_v=1004293134');
$('#variation-1').val('https://mrelectric.com/?convert_action=convert_vpreview&convert_e=1004123614&convert_v=1004293135');
*/