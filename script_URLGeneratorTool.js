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
    prod_local_homepage:'https://www.glassdoctor.com/chelmsford',
    staging_local_homepage:'https://develop-dwyr-mdg.pantheonsite.io/chelmsford/'
}, {
    brand_handle: 'molly-maid',
    brand: 'MLY',
    conceptID: 1,
    prod: 'https://www.mollymaid.com/',
    stage: 'https://dig-www-nei-mly2-stage.nblytest.com/',
    neighborly: true,
    prod_local_homepage:'https://www.mollymaid.com/chelmsford/',
    staging_local_homepage:'https://dig-www-nei-mly-stage.nblytest.com/chelmsford/'
}, {
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
    brand_handle: 'lights-feest',
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
},{
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
},{
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

let variationCount = 2;
function addVariationInput() {
    variationCount++;
    const variationGroupContainer = document.getElementById('variation-group-container');

    const newVariationGroup = document.createElement('div');
    newVariationGroup.className = 'variation-group';

    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', 'variation-live-qa-' + variationCount);

    // Set label for the first input as "Live QA - OG", others as "Live QA - V1", "Live QA - V2", etc.
    newLabel.textContent = variationCount === 1 ? 'Live QA - OG:' : 'Live QA - V' + (variationCount - 1) + ':';

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('id', 'variation-live-qa-' + (variationCount - 1));
    newInput.setAttribute('name', 'variation-live-qa[]');
    newInput.setAttribute('placeholder', 'Enter Forced Variation Snippet');

    newVariationGroup.appendChild(newLabel);
    newVariationGroup.appendChild(newInput);

    variationGroupContainer.appendChild(newVariationGroup);
}

function generateUrls() {
    const prodUrl = document.getElementById('prod-url').value;
    const stagingUrl = document.getElementById('staging-url').value;
    const qaParam = document.getElementById('qa-param').value;
    const localPagesChecked = document.getElementById('local-pages').checked;

    if (!prodUrl || !qaParam) {
        if (!prodUrl) {
            document.getElementById('prod-url').insertAdjacentHTML('afterend', '<p class="error-message">Prod URL is required.</p>');
        }
        if (!qaParam) {
            document.getElementById('qa-param').insertAdjacentHTML('afterend', '<p class="error-message">QA param is required.</p>');
        }
        return;
    }

    const variationInputs = document.querySelectorAll('input[name="variation-live-qa[]"]');
    let outputHtml = `<h2>Generated URLs</h2>`;

    function addQueryParams(url, qaParam, convParam) {
        if (!url) return '';
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        try {
            const urlObj = new URL(url);
            urlObj.searchParams.set('utm_medium', qaParam);

            if (!convParam.startsWith('&_conv_eforce=')) {
                if (/^\d+\.\d+$/.test(convParam)) {
                    convParam = '&_conv_eforce=' + convParam;
                } else if (convParam.startsWith('?')) {
                    convParam = convParam.replace('?', '&');
                } else if (!convParam.startsWith('&')) {
                    convParam = '&' + convParam;
                }
            }

            return urlObj.toString() + convParam;
        } catch (error) {
            console.error('Invalid URL:', url);
            return '';
        }
    }

    variationInputs.forEach((variationInput, index) => {
        const variationConvParam = variationInput.value;
        if (variationConvParam) {
            const prodUrlWithParam = addQueryParams(prodUrl, qaParam, variationConvParam);
            const stagingUrlWithParam = stagingUrl ? addQueryParams(stagingUrl, qaParam, variationConvParam) : '';

            outputHtml += `<h3>${index === 0 ? 'OG' : 'V' + index}</h3>
                <p><strong>Prod URL:</strong> <a href="${prodUrlWithParam}">${prodUrlWithParam}</a></p>`;

            if (stagingUrlWithParam) {
                outputHtml += `<p><strong>Staging URL:</strong> <a href="${stagingUrlWithParam}">${stagingUrlWithParam}</a></p>`;
            }

            if (localPagesChecked) {
                const brand = brands.find(b => b.prod === prodUrl);  // Assuming prod URL matches the brand
                if (brand && brand.prod_local_homepage && brand.staging_local_homepage) {
                    const prodLocalWithParam = addQueryParams(brand.prod_local_homepage, qaParam, variationConvParam);
                    const stagingLocalWithParam = addQueryParams(brand.staging_local_homepage, qaParam, variationConvParam);

                    outputHtml += `
                        <p><strong>Prod Local Homepage URL:</strong> <a href="${prodLocalWithParam}">${prodLocalWithParam}</a></p>
                        <p><strong>Staging Local Homepage URL:</strong> <a href="${stagingLocalWithParam}">${stagingLocalWithParam}</a></p>`
                    ;
                }
            }
        }
    });

    const outputDiv = document.getElementById('output');
    outputDiv.classList.add('urls-generated');
    $('body').addClass('url-generator-active');
    outputDiv.innerHTML = outputHtml;
}


// Generate buttons for each brand
function generateBrandButtons() {
    const brandDiv = document.getElementById('brand-buttons');
    
    brands.forEach(brand => {
        const button = document.createElement('button');
        button.textContent = brand.brand;
        button.setAttribute('data-neighborly', brand.neighborly)
        button.onclick = () => fillUrls(brand.prod, brand.stage, button);
        
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
function fillUrls(prodUrl, stageUrl, button) {
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
        // If the input's ID is not 'variation-live-qa-og' or 'variation-live-qa-1', remove it
        if (input.id !== 'variation-live-qa-og' && input.id !== 'variation-live-qa-1') {
            $(input).parent().remove();
        } else {
            input.value = '';
        }
        variationCount = 2
    });
}

// Attach event listener to the Clear button
document.getElementById('clear-button').addEventListener('click', clearFormAndOutput);


$('input#prod-url').on('change blur focus', function () {
    let el = $('input#prod-url').parent().find('.error-message');
    el.remove();
});

$('input#qa-param').on('change blur focus', function () {
    let el = $('input#qa-param').parent().find('.error-message');
    el.remove();
});