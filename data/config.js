const brands = [
    /* NBLY */
    {
        brand_handle: 'aire-serv',
        brand: 'ASV',
        conceptID: 3,
        prod: 'https://www.aireserv.com/',
        staging: 'https://dig-www-nei-asv2-stage.nblytest.com/',
        neighborly: true,
        prod_local_homepage:'https://www.aireserv.com/jacksonville',
        staging_local_homepage:'https://dig-www-nei-asv2-stage.nblytest.com/jacksonville',
        active_client: true
    },
    {
        brand_handle: 'five-star-painting',
        brand: 'FSP',
        conceptID: 4,
        prod: 'https://www.fivestarpainting.com/',
        staging: 'https://dig-www-nei-fsp2-stage.nblytest.com/',
        neighborly: true,
        prod_local_homepage:'https://www.fivestarpainting.com/lagrange/',
        staging_local_homepage:'https://dig-www-nei-fsp2-stage.nblytest.com/lagrange',
        active_client: false
    },
    {
        brand_handle: 'grounds-guys',
        brand: 'GUY',
        conceptID: 6,
        prod: 'https://www.groundsguys.com/',
        staging: 'https://dig-www-nei-guy2.nblyprod.com/',
        neighborly: true,
        prod_local_homepage:'https://www.groundsguys.com/sparksnv/',
        staging_local_homepage:'https://dig-www-nei-guy2.nblyprod.com/sparksnv',
        active_client: false
    },
    {
        brand_handle: 'glass-doctor',
        brand: 'MDG',
        conceptID: 5,
        prod: 'https://www.glassdoctor.com/',
        staging: 'https://dig-www-nei-mdg2-stage.nblytest.com/',
        neighborly: true,
        prod_local_homepage:'https://www.glassdoctor.com/tacoma-wa',
        staging_local_homepage:'https://dig-www-nei-mdg2-stage.nblytest.com/tacoma-wa/',
        active_client: false
    },
    {
        brand_handle: 'molly-maid',
        brand: 'MLY',
        conceptID: 1,
        prod: 'https://www.mollymaid.com/',
        staging: 'https://dig-www-nei-mly2-stage.nblytest.com/',
        neighborly: true,
        prod_local_homepage:'https://www.mollymaid.com/chelmsford/',
        staging_local_homepage:'https://dig-www-nei-mly2-stage.nblytest.com/chelmsford/',
        active_client: true
    },
    {
        brand_handle: 'mosquito-joe',
        brand: 'MOJ',
        conceptID: 18,
        prod: 'https://mosquitojoe.com/',
        staging: 'https://dig-www-nei-moj2-stage.nblytest.com/',
        neighborly: true,
        prod_local_homepage:'https://mosquitojoe.com/locations/northern-delaware/',
        staging_local_homepage:'https://dig-www-nei-moj2-stage.nblytest.com/locations/northern-delaware/',
        active_client: true
    },
    {
        brand_handle: 'mr-appliance',
        brand: 'MRA',
        conceptID: 8,
        prod: 'https://www.mrappliance.com/',
        staging: 'https://dig-www-nei-mra2-stage.nblytest.com/',
        neighborly: true,
        prod_local_homepage:'https://www.mrappliance.com/indianapolis/',
        staging_local_homepage:'https://dig-www-nei-mra2-stage.nblytest.com/indianapolis/',
        active_client: true
    },
    {
        brand_handle: 'mr-electric',
        brand: 'MRE',
        conceptID: 9,
        prod: 'https://mrelectric.com/',
        staging: 'https://dig-www-nei-mre2-stage.nblytest.com/',
        neighborly: true,
        prod_local_homepage:'https://mrelectric.com/san-antonio',
        staging_local_homepage:'https://dig-www-nei-mre2-stage.nblytest.com/san-antonio'
    },
    {
        brand_handle: 'mr-handyman',
        brand: 'MRH',
        conceptID: 2,
        prod: 'https://www.mrhandyman.com/',
        staging: 'https://dig-www-nei-mrh-stage.nblytest.com/',
        neighborly: true,
        prod_local_homepage:'https://www.mrhandyman.com/south-essex-county/',
        staging_local_homepage:'https://dig-www-nei-mrh-stage.nblytest.com/south-essex-county/',
        active_client: false
    },
    {
        brand_handle: 'mr-rooter',
        brand: 'MRR',
        conceptID: 10,
        prod: 'https://www.mrrooter.com/',
        staging: 'https://dig-www-nei-mrr2-stage.nblytest.com/',
        neighborly: true,
        prod_local_homepage:'https://www.mrrooter.com/austin',
        staging_local_homepage:'https://dig-www-nei-mrr2-stage.nblytest.com/austin',
        active_client: true
    },
    {
        brand_handle: 'window-genie',
        brand: 'WDG',
        conceptID: 16,
        prod: 'https://www.windowgenie.com/',
        staging: 'https://dig-www-nei-wdg2-stage.nblytest.com/',
        neighborly: true,
        prod_local_homepage:'https://www.windowgenie.com/west-austin',
        staging_local_homepage:'https://dig-www-nei-wdg2-stage.nblytest.com/west-austin',
        active_client: false
    },{
        brand_handle: 'precision-garage-door',
        brand: 'PDS',
        conceptID: 27,
        prod: 'https://www.precisiondoor.net/',
        staging: 'https://dig-www-nei-pds2-stage.nblytest.com/',
        neighborly: true,
        prod_local_homepage:'',
        staging_local_homepage:'',
        active_client: false
    },
    /* NON NBLY */
    {
        brand_handle: 'adm',
        brand: 'ADM',
        conceptID: 0,
        prod: 'https://www.adm.com/',
        staging: '',
        neighborly: false,
        active_client: false
    },
    {
        brand_handle: 'sun-home-saunas',
        brand: 'Sun Home Saunas',
        conceptID: 0,
        prod: 'https://www.sunhomesaunas.com/',
        staging: '',
        neighborly: false,
        active_client: true
    },
    {
        brand_handle: 'yoga-works',
        brand: 'Yoga Works',
        conceptID: 0,
        prod: 'https://yogaworks.com/',
        staging: '',
        neighborly: false,
        active_client: false
    },
    {
        brand_handle: 'lights-fest',
        brand: 'Lights Festival',
        conceptID: 0,
        prod: 'https://www.thelightsfest.com/',
        staging: '',
        neighborly: false,
        active_client: false
    },
    {
        brand_handle: 'lancer-skincare',
        brand: 'Lancer',
        conceptID: 0,
        prod: 'https://www.lancerskincare.com/',
        staging: '',
        neighborly: false,
        active_client: false
    },
    {
        brand_handle: 'lexie-hearing',
        brand: 'Lexie Hearing',
        conceptID: 0,
        prod: 'https://www.lexiehearing.com/us',
        staging: '',
        neighborly: false,
        active_client: false
    },
    {
        brand_handle: 'go-hearing',
        brand: 'Go Hearing',
        conceptID: 0,
        prod: 'https://www.gohearing.com/',
        staging: '',
        neighborly: false,
        active_client: false
    },
    {
        brand_handle: '1up-nutrition',
        brand: '1UP',
        conceptID: 0,
        prod: 'https://www.1upnutrition.com/',
        staging: '',
        neighborly: false,
        active_client: false
    },
    {
        brand_handle: 'emler-swim-school',
        brand: 'Emler',
        conceptID: 0,
        prod: 'https://www.emlerswimschool.com/',
        staging: '',
        neighborly: false,
        active_client: false
    },
    {
        brand_handle: 'fresh-pressed-olive-oil',
        brand: 'FPOO',
        conceptID: 0,
        prod: 'https://www.freshpressedoliveoil.com/',
        staging: '',
        neighborly: false,
        active_client: true
    },
    {
        brand_handle: 'moon-juice',
        brand: 'Moon Juice',
        conceptID: 0,
        prod: 'https://www.moonjuice.com/',
        staging: '',
        neighborly: false,
        active_client: false
    },
    {
        brand_handle: 'spotloan',
        brand: 'Spotloan',
        conceptID: 0,
        prod: 'https://www.spotloan.com/',
        staging: '',
        neighborly: false,
        active_client: true
    },
    {
        brand_handle: 'brident',
        brand: 'Brident',
        conceptID: 0,
        prod: '',
        staging: '',
        neighborly: false,
        active_client: true
    },
    {
        brand_handle: 'smile-express',
        brand: 'Smile Express',
        conceptID: 0,
        prod: '',
        staging: '',
        neighborly: false,
        active_client: true
    },
    {
        brand_handle: 'dental-works',
        brand: 'Dental Works',
        conceptID: 0,
        prod: '',
        staging: '',
        neighborly: false,
        active_client: true
    }
];

const nblyForm = (enableTesting) => {
    return `<div class="nbly-form">
        <div class="form-group prod-required required">
            <label for="prod-url">Prod Natl URL:</label>
            <input type="text" id="prod-url" name="prod-url" placeholder="Enter Prod URL">
            <div class="error-msg">This URL is required.</div>
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

        <div class="form-group">
            <label for="all-links">All Links:</label>
            <input type="text" id="all-links" name="all-links" placeholder="All Links (Copied from QA Doc with Labels)">
        </div>

        <p>OR</p>

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

        <div id="variation-name-group-container">
            <div class="variation-name-group">
                <label contendeditable="true" for="variation-name-1">V1 Name:</label>
                <input type="text" id="variation-name-1" name="variation-name-1"
                    placeholder="Enter Name of Variation">
            </div>
        </div>

        <div class="checkbox-outer">
            <div class="form-group checkbox-container">
                <input type="checkbox" id="local-pages" name="local-pages">
                <label for="local-pages">Local Pages</label>
            </div>
            <div class="form-group checkbox-container">
                <input type="checkbox" id="national-pages" name="national-pages" checked>
                <label for="national-pages">National Pages</label>
            </div>
            <div class="error-msg">Select Local or National.</div>
        </div>

        <button class="btn" id="clear-button">Clear</button>
        <button class="btn" type="button" id="generate-btn">Generate</button>
        <button class="btn ${enableTesting ? '' : 'hidden'}" type="button" id="test-btn">Fill-In Test Values</button>
    </div>`;
}

const regForm = (enableTesting) => {
    return `<div class="reg-form">
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

        <div class="form-group">
            <label for="all-links">All Links:</label>
            <input type="text" id="all-links" name="all-links" placeholder="All Links (Copied from QA Doc with Labels)">
        </div>

        <p>OR</p>

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

        <div id="variation-name-group-container">
            <div class="variation-name-group">
                <label contendeditable="true" for="variation-name-1">V1 Name:</label>
                <input type="text" id="variation-name-1" name="variation-name-1"
                    placeholder="Enter Name of Variation">
            </div>
        </div>

        <button class="btn" id="clear-button">Clear</button>
        <button class="btn" type="button" id="generate-btn">Generate</button>
        <button class="btn ${enableTesting ? '' : 'hidden'}" type="button" id="test-btn">Fill-In Test Values</button>
    </div>`;
}

const ADMForm = `
    <div>
        <div>🚧 Work In Progress! 🚧</div>
        <a class="lol" href="#">don't click it</a>
    </div>`;

export { brands, nblyForm, regForm, ADMForm };