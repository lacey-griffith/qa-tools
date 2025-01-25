import { brands } from './config.js';

let nblyForm = `<div class='nbly-form'>
                    <div class='checkbox-outer'>
                        <div class="form-group checkbox-container">
                            <input type="checkbox" id="local-pages" name="local-pages">
                            <label for="local-pages">Local Pages</label>
                        </div>
                        <div class="form-group checkbox-container">
                            <input type="checkbox" id="national-pages" name="national-pages">
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

let regForm = `
        <div class='reg-form'>
                    <div class="form-group">
                        <label for="url">URL:</label>
                        <input type="text" id="url" name="url" placeholder="Enter URL">
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

    function buildForm(handle) {
        let activeBrand = brands.find(brand => brand.brand_handle === handle);
        let markUp = ``;

        //if brand.neighborly is true
        if (activeBrand.neighborly) {
            markUp = nblyForm;
            //if brand.neighborly is false
        } else if (!activeBrand.neighborly) {
            //If ADM (Optimizely)
            if(!activeBrand.neighborly && activeBrand.brand === 'ADM'){
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
            if(activeBrand.neighborly){
                generateNblyUrls();
            } else {
                generateUrls();
            }
        });

        //i crack myself up tbh
        let clicks = 0;
        $('a.lol').on('click',function(){
            console.log(clicks)
            let url ='https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            clicks++
            if(clicks == 1){
                $(this).text('stop it');
            } else if(clicks == 2){
                $(this).text('seriously? knock it off');
            } else if(clicks == 3){
                $(this).text('ok I warned you... last chance');
            } else if(clicks >= 4){
                window.open(url,"_blank");
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

    function generateUrls(){
        const prodUrl = $();
        const stagingUrl = $();
        const qaParam = $();


    }

    function generateNblyUrls(){
        const prodUrl = $();
        const stagingUrl = $();

        const localProdUrl = $();
        const localStagingUrl = $();
        const qaParam = $();

        const nationalChecked = document.getElementById('national-pages')?.checked;
        const localChecked= document.getElementById('local-pages')?.checked;

        //determine which site area we are working with, national or local
        if(!localChecked && !nationalChecked){
            $('.form-group.checkbox-container .error-msg').addClass('show');
            return;
        }
        $('.form-group.checkbox-container .error-msg.show').removeClass('show');

        //make sure main url is present
        if(!prodUrl){
            $('.prod-required .error-msg').addClass('show');
            return;
        }
        $('.prod-required .error-msg.show').removeClass('show');

        // Select all variation input elements
        const variationInputs = document.querySelectorAll('input[name^="variation-"]');
        if(variationInputs.length === 0){
            $('#variation-group-container .error-msg').addClass('show');
            return;
        }
        $('#variation-group-container .error-msg.show').removeClass('show');

        let previewMarkUp = ``;
        let liveQaMarkUp = ``;

    }

    function Clear(){
        //remove additional variations that may have been added
        const variations = $('#url-generator input[id^="variation-"]');
        variations.each((i, input) => {
            //remove any that are not variation-control or variation-1
            if(input.id !== 'variation-control' && input.id !== 'variation-1'){
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