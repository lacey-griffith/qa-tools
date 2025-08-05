import { brands, nblyForm, regForm, ADMForm } from "../data/config.js";
import { testBtnHandler } from "../data/testing.js";
import {
  copyText,
  clear,
  extractConvertParams,
  updateVariationNames,
  addNewVariationNameInputs,
  trolling,
} from "./helpers.js";

let enableTesting = true; // set to true to reveal the "fill-in values test" button;
let varCount = 2;
let allLinksValue;

(function () {
  function addSteps() {
    //target parent container
    let container = $("section#url-generator");
    container.addClass("step-container no-form");

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
      $("#stepOne .brand-btn-container").append(btn);
    });

    //send user to step 2 on button click
    $("#stepOne button").on("click", function () {
      $(".brand-btn-container").removeClass("initial");
      let handle = $(this).attr("data-handle");

      //remove active class from other buttons
      if (!$(this).hasClass("active")) {
        $("#stepOne button.active").removeClass("active");
        $(this).addClass("active");
      }

      //build forms
      buildForm(handle);
    });
  }

  //show the right form per client
  function buildForm(handle) {
    let activeBrand = brands.find((brand) => brand.brand_handle === handle);
    const fpooCodes = $("#fpoo-codes");
    let markUp = ``;

    //determine form markup based on brand
    if (activeBrand.neighborly) {
      //if neighborly
      markUp = nblyForm(enableTesting);
    } else if (activeBrand.brand === "ADM") {
      //if ADM
      markUp = ADMForm;
    } else {
      if (handle === "fresh-pressed-olive-oil") {
        fpooCodes.removeClass("hidden");
      } else {
        fpooCodes.addClass("hidden");
      }
      markUp = regForm(enableTesting);
    }

    //prep the form
    let formSection = $("section#url-generator");
    formSection.removeClass("no-form").addClass("form-present");

    //add form to page and show it
    $("#form .tool-body").html(markUp).removeClass("transparent-background");

    if (activeBrand.brand === "ADM") {
      trolling();
    } else if (activeBrand.brand === "PDS") {
      $("input#local-pages").attr("disabled", true);
    }

    // add testing functionality if enabled
    if (enableTesting) testBtnHandler(activeBrand);

    //autofill urls based on brand
    $("#form #prod-url").val(activeBrand.prod);
    $("#form #staging-url").val(activeBrand.staging);

    //include neighborly local pages
if (activeBrand.neighborly && activeBrand.local_homepage) {
  const localPath = Array.isArray(activeBrand.local_homepage)
    ? activeBrand.local_homepage[0]
    : activeBrand.local_homepage;

  const baseProd = activeBrand.prod.replace(/\/$/, "");
  const baseStaging = activeBrand.staging?.replace(/\/$/, "") || "";

  $("#form #prod-local-url").val(`${baseProd}${localPath}`);
  $("#form #staging-local-url").val(`${baseStaging}${localPath}`);
}


    //add event listener for adding a variaton btn (+)
    $("button.btn.add-var").on("click", function () {
      addVariationInput();
    });

    //make variation labels editable
    $("section#url-generator #variation-group-container .variation-group").each(
      (i, eL) => {
        labelEditor($(eL).find("label"));
      }
    );

    //add event listener to clear form
    $("#clear-button").on("click", function () {
      clear(); // clear the form
      varCount = 2; // reset the variation count so it's ready for next time
    });

    //add event listener to generate urls
    $("#generate-btn").on("click", function () {
      activeBrand.neighborly ? generateNblyUrls() : generateUrls();
    });

    // add event listener for pasting into All Links
    // this will update the available variation name slot count
    $("#all-links").on("change", (e) => {
      if (allLinksValue !== e.target.value) {
        allLinksValue = e.target.value;
        updateVariationNames(labelEditor, e.target.value);
      }
    });
  }

  //Add more variations
  function addVariationInput() {
    varCount++;
    //target container
    let varContainer = $("#variation-group-container");

    let newVar = `<div class="variation-group">
            <label contendeditable="true" for="variation-${varCount - 1}">V${
      varCount - 1
    }:</label>
            <input type="text" id="variation-${
              varCount - 1
            }" name="variation-live-qa[]" placeholder="Enter Preview Link">
        </div>`;

    //add new label to page and make it editable
    varContainer.append(newVar);
    let label = $(`.variation-group [for="variation-${varCount - 1}"]`);
    labelEditor(label);

    // repeat the same process for variation names
    addNewVariationNameInputs(labelEditor, varCount);
  }

  // Variation Label editing
  const labelEditor = (label) => {
    label.attr("contenteditable", "true");

    label.on("click", function () {
      let text = $(this).text();
      $(this).replaceWith(`<input class="editing-label" autofocus/>`);
      $("input.editing-label").val(text).focus();
      labelEditorEvents(text);
    });
  };

  function labelEditorEvents(OgText) {
    $("input.editing-label").on("blur keydown", function (e) {
      //only trigger for enter key
      if (e.type === "keydown" && e.keyCode !== 13) {
        return;
      }

      e.preventDefault();
      let text = $(this).val();
      if (text === "") {
        text = OgText;
      }

      let labelFor = $(this).next("input").attr("id");
      $(this).replaceWith(`<label for=${labelFor}>${text}</label>`);
      labelEditor($(`label[for=${labelFor}]`));
    });
  }

  /**
   * this function declares the variables for URLs and parameters based on the form values
   */
  const generateUrls = () => {
    const prodUrl = $("#form #prod-url").val().trim();
    const stagingUrl = $("#form #staging-url").val().trim();
    const qaParam = $("#form #qa-param").val().trim();
  };

  /**
   * description of function
   * @returns String (string of a particular url, for example)
   */
  const generateNblyUrls = () => {
    console.log("generating neighborly urls...");
    const activeBrandHandle = $("#stepOne button.active").data("handle");
    const brand = brands.find((b) => b.brand_handle === activeBrandHandle);

    const prodUrl = $("#form #prod-url").val().trim();
    const stagingUrl = $("#form #staging-url").val().trim();
    const qaParam = $("#form #qa-param").val().trim();

    /* === Site Areas === */
    const siteAreas = [
      { key: "national-pages", pathKey: "", label: "National" },
      { key: "local-pages", pathKey: "local_homepage", label: "Local" },
      { key: "lead-flow", pathKey: "lead_flow", label: "Lead Flow" },
    ];

    const nationalChecked = $("#national-pages").is(":checked");
    const localChecked = $("#local-pages").is(":checked");

    const selectedAreas = siteAreas.filter((area) =>
      $(`#${area.key}`).is(":checked")
    );

    if (selectedAreas.length === 0) {
      $(".nbly-form .checkbox-outer .error-msg")?.addClass("show");
      return;
    }
    $(".nbly-form .checkbox-outer .error-msg")?.removeClass("show");

    //check if main url is present
    if (!prodUrl) {
      $(".prod-required .error-msg")?.addClass("show");
      return;
    }
    $(".prod-required .error-msg")?.removeClass("show");

    // Select all variation input elements
    let variationInputs;
    const allLinks = $("#all-links").val().trim();
    if (allLinks.length) {
      variationInputs = allLinks
        .split(/[\n\t\s]/)
        .filter((x) => x.includes("http"));
    } else {
      variationInputs = Array.from(
        $('input[name^="variation-"]')
          .not('input[name^="variation-name-"]')
          .map((x, i) => $(i).val().trim())
      );
      if (!variationInputs.length) {
        $("#variation-group-container .error-msg")?.addClass("show");
        return;
      }
      $("#variation-group-container .error-msg")?.removeClass("show");
    }

    /* === Preview Links === */
    let previewNationalMarkup = "";
    let previewLocalMarkup = "";
    let previewLeadFlowMarkup = "";

    /* === Live QA Links === */
    let qaNationalMarkup = "";
    let qaLocalMarkup = "";
    let qaLeadFlowMarkup = "";

    /**
     * Process variation inputs and generate both preview and QA links
     */
    variationInputs.forEach((value, index) => {
      const variationLink = value;
      const variationNumber = index == 0 ? "Control" : `V${index}`;

      let variationName = "";
      if (index > 0) {
        variationName = $(`#variation-name-${index}`)?.val().trim();
        variationName.length ? (variationName = ` (${variationName})`) : "";
      }

      if (!variationLink) {
        // Handle empty variation links for both National and Local
        if (nationalChecked) {
          previewNationalMarkup += `<h3>${variationNumber} </h3><p class="error-message">Variation link is empty.</p>`;
          qaNationalMarkup += `<h3>${variationNumber} </h3><p class="error-message">Variation link is empty.</p>`;
        }
        if (localChecked) {
          previewLocalMarkup += `<h3>${variationNumber} </h3><p class="error-message">Variation link is empty.</p>`;
          qaLocalMarkup += `<h3>${variationNumber} </h3><p class="error-message">Variation link is empty.</p>`;
        }
        return;
      }

      console.log(variationLink);

      const params = extractConvertParams(variationLink);
      if (!params) {
        selectedAreas.forEach(({ label }) => {
          if (label === "National") {
            previewNationalMarkup += `<h3>${variationNumber} </h3><p class="error-message">Variation link is empty.</p>`;
            qaNationalMarkup += `<h3>${variationNumber} </h3><p class="error-message">Variation link is empty.</p>`;
          }
          if (label === "Local") {
            previewLocalMarkup += `<h3>${variationNumber} </h3><p class="error-message">Variation link is empty.</p>`;
            qaLocalMarkup += `<h3>${variationNumber} </h3><p class="error-message">Variation link is empty.</p>`;
          }
          if (label === "Lead Flow") {
            previewLeadFlowMarkup += `<h3>${variationNumber} </h3><p class="error-message">Variation link is empty.</p>`;
            qaLeadFlowMarkup += `<h3>${variationNumber} </h3><p class="error-message">Variation link is empty.</p>`;
          }
        });
      }

      const { eParam, vParam } = params;
      //set up urls if QA param is present for live qa or as preview links
      let liveQaQuery = `?_conv_eforce=${eParam}.${vParam}`;
      if (qaParam) {
        liveQaQuery = `?utm_medium=${qaParam}&_conv_eforce=${eParam}.${vParam}`;
      }

      selectedAreas.forEach(({ pathKey, label }) => {
        const path = pathKey ? brand[pathKey] : "";
        const baseProd = brand.prod.replace(/\/$/, "");
        const baseStaging = brand.staging?.replace(/\/$/, "");

        const prodUrl = path ? `${baseProd}${path}` : `${baseProd}/`;
        const stagingUrl =
          path && baseStaging ? `${baseStaging}${path}` : baseStaging || "";

        const previewProdUrl = `${prodUrl}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}`;
        const previewStagingUrl = stagingUrl
          ? `${stagingUrl}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}`
          : "";

        const qaProdUrl = `${prodUrl}${liveQaQuery}`;
        const qaStagingUrl = stagingUrl ? `${stagingUrl}${liveQaQuery}` : "";

        const markupTitle = `${variationNumber}${variationName} (${label})`;

        const previewMarkup = `<span>\n</span><h3>${markupTitle}:</h3><p><strong>Prod:</strong> <a href="${previewProdUrl}" target="_blank">${previewProdUrl}</a></p> 
        ${
          previewStagingUrl
            ? `<p><strong>Staging:</strong> <a href="${previewStagingUrl}" target="_blank">${previewStagingUrl}</a></p>`
            : ""
        }`;

        const qaMarkup = `<span>\n</span><h3>${markupTitle}:</h3><p><strong>Prod:</strong> <a href="${qaProdUrl}" target="_blank">${qaProdUrl}</a></p>
        ${
          qaStagingUrl
            ? `<p><strong>Staging:</strong> <a href="${qaStagingUrl}" target="_blank">${qaStagingUrl}</a></p>`
            : ""
        }`;

        switch (label) {
          case "National":
            previewNationalMarkup += previewMarkup;
            qaNationalMarkup += qaMarkup;
            break;
          case "Local":
            previewLocalMarkup += previewMarkup;
            qaLocalMarkup += qaMarkup;
            break;
          case "Lead Flow":
            previewLeadFlowMarkup =
              (previewLeadFlowMarkup || "") + previewMarkup;
            qaLeadFlowMarkup = (qaLeadFlowMarkup || "") + qaMarkup;
            break;
        }
      });

      // Output the generated links separately for National and Local
      const outputDiv = $("#output");
      // clear the current div first
      outputDiv.html("");

      if (previewNationalMarkup) {
        outputDiv.append(`<div id="national-preview">
                        <div class="link-container"></div>
                    </div>`);
        $("#national-preview .link-container").html(
          `<span>\n</span> <h2>National Preview Links</h2>${previewNationalMarkup}`
        );
      }
      if (previewLocalMarkup) {
        outputDiv.append(`<div id="local-preview"> 
                        <div class="link-container"></div>
                    </div>`);
        $("#local-preview .link-container").html(
          `<span>\n</span> <h2>Local Preview Links</h2>${previewLocalMarkup}`
        );
      }
      if (qaNationalMarkup) {
        outputDiv.append(`<div id="national-qa">
                        <div class="link-container"></div>
                    </div>`);
        $(`#national-qa .link-container`).html(
          `<span>\n</span> <h2>National QA Links</h2>${qaNationalMarkup}`
        );
      }
      if (qaLocalMarkup) {
        outputDiv.append(`<div id="local-qa">
                        <div class="link-container"></div>
                    </div>`);
        $("#local-qa .link-container").html(
          `<span>\n</span> <h2>Local QA Links</h2>${qaLocalMarkup}`
        );
      }

      if (previewLeadFlowMarkup) {
        outputDiv.append(`<div id="leadflow-preview">
                    <div class="link-container"></div>
                </div>`);
        $("#leadflow-preview .link-container").html(
          `<span>\n</span> <h2>Lead Flow Preview Links</h2>${previewLeadFlowMarkup}`
        );
      }

      if (qaLeadFlowMarkup) {
        outputDiv.append(`<div id="leadflow-qa">
                    <div class="link-container"></div>
                </div>`);
        $("#leadflow-qa .link-container").html(
          `<span>\n</span> <h2>Lead Flow QA Links</h2>${qaLeadFlowMarkup}`
        );
      }

      // If no URLs were generated, show a message
      if (
        !previewNationalMarkup &&
        !previewLocalMarkup &&
        !previewLeadFlowMarkup &&
        !qaNationalMarkup &&
        !qaLocalMarkup &&
        !qaLeadFlowMarkup
      ) {
        outputDiv
          .removeClass("urls-generated")
          .html("<p>No URLs were generated. Please check your inputs.</p>");
      } else {
        outputDiv.addClass("urls-generated");
      }

      outputDiv.append(`<div class="copy-container">
                    <button class="copy"> Copy
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>
                    </button>
                </div>`);

      $("button.copy").on("click", (e) => {
        copyText(e.target);
      });
    });
  };

  $("DOMContentLoaded", function (e) {
    addSteps();
  });
})();
