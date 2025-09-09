const brands = [
    /* NBLY */
    {
        brand_handle: 'aire-serv',
        brand: 'ASV',
        conceptID: 3,
        prod: 'https://www.aireserv.com/',
        staging: 'https://dig-www-nei-asv2-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/jacksonville','/branson','/permian-basin'],
        lead_flow :'/schedule-service',
        active_client: true
    },
    {
        brand_handle: 'five-star-painting',
        brand: 'FSP',
        conceptID: 4,
        prod: 'https://www.fivestarpainting.com/',
        staging: 'https://dig-www-nei-fsp2-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/wilmington-de','/marietta','/raleigh'],
        lead_flow :'/schedule-estimate',
        active_client: true
    },
    {
        brand_handle: 'grounds-guys',
        brand: 'GUY',
        conceptID: 6,
        prod: 'https://www.groundsguys.com/',
        staging: 'https://dig-www-nei-guy2.nblyprod.com/',
        neighborly: true,
        local_homepage: ['/mt-lebanon','/greater-little-rock','/palm-beach-fl'],
        lead_flow :'/request-job-estimate',
        active_client: false
    },
    {
        brand_handle: 'glass-doctor',
        brand: 'MDG',
        conceptID: 5,
        prod: 'https://www.glassdoctor.com/',
        staging: 'https://dig-www-nei-mdg2-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/tacoma-wa','/denton','/albion'],
        lead_flow :'/schedule-appointment',
        active_client: true
    },
    {
        brand_handle: 'molly-maid',
        brand: 'MLY',
        conceptID: 1,
        prod: 'https://www.mollymaid.com/',
        staging: 'https://dig-www-nei-mly2-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/north-county-san-diego','/la-verne','/santa-barbara'],
        lead_flow :'/request-a-free-estimate',
        active_client: true
    },
    {
        brand_handle: 'mosquito-joe',
        brand: 'MOJ',
        conceptID: 18,
        prod: 'https://mosquitojoe.com/',
        staging: 'https://dig-www-nei-moj2-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/northern-delaware','/noco','/south-bend'],
        lead_flow :'/schedule-appointment',
        active_client: true
    },
    {
        brand_handle: 'mr-appliance',
        brand: 'MRA',
        conceptID: 8,
        prod: 'https://www.mrappliance.com/',
        staging: 'https://dig-www-nei-mra2-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/austin','/northern-colorado','/lafayette','/south-charlotte'],
        lead_flow :'/schedule-service',
        active_client: true
    },
    {
        brand_handle: 'mr-electric',
        brand: 'MRE',
        conceptID: 9,
        prod: 'https://mrelectric.com/',
        staging: 'https://dig-www-nei-mre2-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/central-michigan','/chattanooga','/huntsville','/san-antonio'],
        lead_flow :'/schedule-appointment',
        active_client: true
    },
    {
        brand_handle: 'mr-handyman',
        brand: 'MRH',
        conceptID: 2,
        prod: 'https://www.mrhandyman.com/',
        staging: 'https://dig-www-nei-mrh-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/oklahoma-city-edmond','/wichita-metro-area','/bentonville-rogers-springdale'],
        lead_flow :'/request-service',
        active_client: true
    },
    {
        brand_handle: 'mr-rooter',
        brand: 'MRR',
        conceptID: 10,
        prod: 'https://www.mrrooter.com/',
        staging: 'https://dig-www-nei-mrr2-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/memphis','/virginia-beach','/winston-salem','/why-us-'],
        lead_flow :'/request-job-estimate',
        active_client: true
    },
    {
        brand_handle: 'mr-rooter-canada',
        brand: 'CA MRR',
        conceptID: 10,
        prod: 'https://www.mrrooter.ca/',
        staging: 'https://dig-www-nei-mrr2-ca-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/fort-mcmurray','/kamloops','/chilliwack'],
        lead_flow :'/request-job-estimate',
        active_client: true
    },
    {
        brand_handle: 'window-genie',
        brand: 'WDG',
        conceptID: 16,
        prod: 'https://www.windowgenie.com/',
        staging: 'https://dig-www-nei-wdg2-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/atlanta-metro','/memphis','/east-austin-pflugerville'],
        lead_flow :'/quote',
        active_client: true
    },{
        brand_handle: 'shelf-genie',
        brand: 'SHG',
        conceptID: 26,
        prod: 'https://www.shelfgenie.com/',
        staging: 'https://dig-www-nei-shg2-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/locations/treasure-valley','/locations/louisville','/locations/boulder-north-denver'],
        lead_flow :'/bookonline',
        active_client: true
    },{
        brand_handle: 'precision-garage-door',
        brand: 'PDS',
        conceptID: 27,
        prod: 'https://www.precisiondoor.net/',
        staging: 'https://dig-www-nei-pds2-stage.nblytest.com/',
        neighborly: true,
        local_homepage: ['/locations/texas/dallas','/locations/mississippi/jackson','/locations/louisiana/baton-rouge'],
        lead_flow :'/request-appointment',
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
        active_client: false
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

        <div class="form-group hidden">
            <label for="prod-local-url">Prod Local URL:</label>
            <input type="text" id="prod-local-url" name="local-url" placeholder="Enter Prod Local URL">
        </div>

        <div class="form-group hidden">
            <label for="staging-local-url">Staging Local URL:</label>
            <input type="text" id="staging-local-url" name="staging-local-url" placeholder="Enter Staging Local URL">
        </div>

        <div class="form-group" id="local-paths-dropdown-group">
            <label for="local-paths">Select Local Page(s):</label>
            <select id="local-paths" name="local-paths" multiple size="5"></select>
            <div class="checkbox-container">
                <input type="checkbox" id="select-all-locals" />
                <label for="select-all-locals">Select All</label>
            </div>
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

        <!-- = = = = = = = = = = = = = -->
        <!-- Start Site Area CheckBoxes -->
        <!-- = = = = = = = = = = = = = -->

        <div class="checkbox-outer">
        <label>Select Site Area</label>
            <!-- Local -->
            <div class="form-group checkbox-container">
                <input type="checkbox" id="local-pages" name="local-pages">
                <label for="local-pages">Local Homepages</label>
            </div>
            <!-- National -->
            <div class="form-group checkbox-container">
                <input type="checkbox" id="national-pages" name="national-pages" checked>
                <label for="national-pages">National Homepage</label>
            </div>

            <!-- Lead Flow -->
            <div class="form-group checkbox-container">
                <input type="checkbox" id="lead-flow" name="lead-flow">
                <label for="lead-flow">Lead Flow</label>
            </div>

            <div class="error-msg">Site Area selection is required!</div>
        </div>

        <!-- = = = = = = = = = = = = = -->
        <!-- End Site Area CheckBoxes -->
        <!-- = = = = = = = = = = = = = -->

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