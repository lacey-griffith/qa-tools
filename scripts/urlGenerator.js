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

// slug + url helpers
const stripSlashes = (s = "") => s.replace(/^\/+|\/+$/g, "");
const ensureTrailingSlash = (s = "") => (s.endsWith("/") ? s : s + "/");
const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

// join base + path safely; accept full URLs in `path` if they sneak in
const joinUrl = (base, path) => {
  if (!path) return ensureTrailingSlash(base.replace(/\/$/, ""));
  if (/^https?:\/\//i.test(path)) return ensureTrailingSlash(path);
  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = stripSlashes(path);
  return ensureTrailingSlash(`${cleanBase}/${cleanPath}`);
};

// local slug normalization + utilities
const normSlug = (s = "") => "/" + stripSlashes(String(s).trim().toLowerCase());
const normalizeSlugList = (arr) => Array.from(new Set(toArray(arr).map(normSlug)));
const visibleOptions = ($sel) =>
  Array.from($sel.find("option")).filter((o) => !o.disabled && $(o).is(":visible"));

// --- feature flag for new site-area dropdowns ---
const USE_SITEAREA_DROPDOWNS = true;

// tiny show/hide helpers
const showEl = (el) => el && (el.style.display = "");
const hideEl = (el) => el && (el.style.display = "none");

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
    brands.forEach(function (item) {
      if (!item.active_client) return; //skip inactive clients
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
      markUp = nblyForm(enableTesting);
    } else if (activeBrand.brand === "ADM") {
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

    // Hide & disable legacy local URL inputs if we're using dropdowns
    if (USE_SITEAREA_DROPDOWNS) {
      const legacyProdLocal = document.querySelector("#prod-local-url");
      const legacyStageLocal = document.querySelector("#staging-local-url");
      [legacyProdLocal, legacyStageLocal].forEach((el) => {
        if (!el) return;
        hideEl(el);
        el.value = "";
        el.disabled = true;
      });
    }


// Local paths UI - CHECKBOX DROPDOWN (search + select all + apply/cancel)
if (activeBrand.neighborly && USE_SITEAREA_DROPDOWNS) {
  const normalizedLocals = normalizeSlugList(activeBrand.local_homepage || []);

  // hide the original <select>
  const $select = $("#local-paths");
  $select.hide();

  // A dedicated wrapper so we can show/hide the entire Local control as a block
  let $localWrap = $("#dd-local-homepages-wrap");
  if (!$localWrap.length) {
    $localWrap = $(`<div id="dd-local-homepages-wrap" class="sitearea-wrap"></div>`)
      .insertAfter($select); // sits where the <select> used to be
  }
  $localWrap.empty(); // rebuild fresh per brand


  // === Dropdown scaffold (created once, reused) ===
  let $host = $("#local-paths-dropdown");
  if (!$host.length) {
    $host = $(`
      <div id="local-paths-dropdown" class="ms-host">
        <label id="local-multiselect-label" class="ms-label">Locations</label>
        <button
          id="local-multiselect-trigger"
          class="ms-trigger"
          type="button"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-labelledby="local-multiselect-label local-multiselect-trigger"
        >
          Choose locations
          <span class="ms-count" aria-hidden="true"></span>
        </button>

        <div
          id="local-multiselect-panel"
          class="ms-panel"
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby="local-multiselect-label"
          hidden
        >
          <div class="ms-toolbar">
            <input id="local-multiselect-search" class="ms-search" type="search" placeholder="Filter locations…" autocomplete="off" />
            <div class="ms-actions">
              <button type="button" id="ms-select-all" class="ms-action">Select all</button>
              <button type="button" id="ms-clear-all" class="ms-action">Clear</button>
            </div>
          </div>

          <!-- Keep the same ID so downstream code keeps working -->
          <div id="local-paths-boxes" class="ms-list" tabindex="-1" aria-label="Locations list"></div>

          <div class="ms-footer">
            <button type="button" id="ms-apply" class="ms-primary">Apply</button>
            <button type="button" id="ms-cancel" class="ms-secondary">Cancel</button>
          </div>
        </div>
      </div>
    `).appendTo($localWrap);

    // error holder (once)
    $('<div id="local-select-error" class="error-msg" style="display:none;">Select at least one location.</div>')
      .insertAfter($host);
  }

  const $panel      = $("#local-multiselect-panel");
  const $trigger    = $("#local-multiselect-trigger");
  const $countEl    = $("#local-paths-dropdown .ms-count");
  const $search     = $("#local-multiselect-search");
  const $boxes      = $("#local-paths-boxes");
  const $btnAll     = $("#ms-select-all");
  const $btnClear   = $("#ms-clear-all");
  const $btnApply   = $("#ms-apply");
  const $btnCancel  = $("#ms-cancel");

  // Utility for safe IDs
  const safeId = (slug) => `loc-${slug.replace(/[^a-z0-9]+/gi, "-")}`;

  // Build the checkbox rows (idempotent)
  $boxes.empty();
  normalizedLocals.forEach((slug) => {
    const id = safeId(slug);
    $boxes.append(
      `<label class="local-opt-row">
         <input class="local-opt" type="checkbox" id="${id}" value="${slug}" />
         <span class="local-opt-text">${slug}</span>
       </label>`
    );
  });

  // Count helper
  const updateCount = () => {
    const n = $boxes.find("input.local-opt:checked").length;
    $countEl.text(n ? `${n} selected` : "");
    $trigger.attr("aria-expanded", String(!$panel.prop("hidden")));
  };

  // Open/close
  function openPanel() {
    $panel.prop("hidden", false);
    updateCount();
    // focus search next tick
    setTimeout(() => $search.trigger("focus"), 0);
    $(document).on("pointerdown.ms", (e) => {
      if (!$.contains($panel[0], e.target) && e.target !== $trigger[0]) closePanel();
    });
    $(document).on("keydown.ms", (e) => { if (e.key === "Escape") closePanel(); });
  }
  function closePanel() {
    $panel.prop("hidden", true);
    updateCount();
    $trigger.trigger("focus");
    $(document).off("pointerdown.ms keydown.ms");
  }

  $trigger.off("click.ms").on("click.ms", () => {
    $panel.prop("hidden") ? openPanel() : closePanel();
  });

  // Live filter (case/diacritics insensitive)
  const normalize = (s) =>
    (s || "").toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  $search.off("input.ms").on("input.ms", function () {
    const f = normalize(this.value);
    if (!f) {
      $boxes.find(".local-opt-row").show();
    } else {
      $boxes.find(".local-opt-row").each(function () {
        const txt = normalize($(this).find(".local-opt-text").text());
        $(this).toggle(txt.includes(f));
      });
    }
  });

  // Select all / Clear (respects current filter)
  $btnAll.off("click.ms").on("click.ms", () => {
    $boxes.find(".local-opt-row:visible input.local-opt").prop("checked", true);
    updateCount();
  });
  $btnClear.off("click.ms").on("click.ms", () => {
    $boxes.find("input.local-opt").prop("checked", false);
    updateCount();
  });

  // Row toggles update count
  $boxes.off("change.ms").on("change.ms", "input.local-opt", updateCount);

  // Apply = persist basic selection UI state + close; Cancel = revert visual changes
  // (We keep it simple: Cancel just closes. If you want hard revert, ping me and I’ll wire a saved snapshot.)
  $btnApply.off("click.ms").on("click.ms", () => {
    updateCount();
    closePanel();
  });
  $btnCancel.off("click.ms").on("click.ms", () => {
    closePanel();
  });

  // Prefill single URL fields with first location
  if (normalizedLocals.length) {
    const firstLocal = normalizedLocals[0];
    const baseProd = activeBrand.prod.replace(/\/$/, "");
    const baseStaging = activeBrand.staging?.replace(/\/$/, "") || "";
    $("#form #prod-local-url").val(`${baseProd}${firstLocal}`);
    $("#form #staging-local-url").val(`${baseStaging}${firstLocal}`);
  }

  // Initial count
  updateCount();
}


    //add event listener for adding a variation btn (+)
    $("button.btn.add-var").on("click", function () {
      addVariationInput();
    });

    //make variation labels editable
    $("section#url-generator #variation-group-container .variation-group").each((i, eL) => {
      labelEditor($(eL).find("label"));
    });

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
            <label contendeditable="true" for="variation-${varCount - 1}">V${varCount - 1}:</label>
            <input type="text" id="variation-${varCount - 1}" name="variation-live-qa[]" placeholder="Enter Preview Link">
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
      if (e.type === "keydown" && e.keyCode !== 13) return;

      e.preventDefault();
      let text = $(this).val();
      if (text === "") text = OgText;

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
    // non-neighborly path generation would go here (left as-is)
  };

  /**
   * Neighborly link generation (Variation-first; includes National, Local, Lead Flow, Service Pages)
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
      { key: "service-pages", pathKey: "service_pages", label: "Service Pages" }, // NEW
    ];

    const selectedAreas = siteAreas.filter((area) => $(`#${area.key}`).is(":checked"));

    if (selectedAreas.length === 0) {
      $(".nbly-form .checkbox-outer .error-msg")?.addClass("show");
      return;
    }
    $(".nbly-form .checkbox-outer .error-msg")?.removeClass("show");

    // hide local selection error if Local isn't in play
    if (!$("#local-pages").is(":checked")) {
      $("#local-select-error").hide();
    }

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
      variationInputs = allLinks.split(/[\n\t\s]/).filter((x) => x.includes("http"));
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

    // === New: variation-first containers ===
    let previewByVariation = "";
    let qaByVariation = "";

    // helper to emit a small block (title + prod/staging lines)
    const block = (title, prod, staging) => {
      return `<h4>${title}</h4><p><strong>Prod:</strong> <a href="${prod}" target="_blank">${prod}</a></p>${
        staging ? `<p><strong>Staging:</strong> <a href="${staging}" target="_blank">${staging}</a></p>` : ""
      }`;
    };

    /**
     * Process variation inputs and generate both Preview and QA in variation-first order
     */
    variationInputs.forEach((value, index) => {
      const variationLink = value;
      const variationNumber = index == 0 ? "Control" : `V${index}`;

      let variationName = "";
      if (index > 0) {
        variationName = $(`#variation-name-${index}`)?.val().trim();
        variationName.length ? (variationName = ` (${variationName})`) : "";
      }

      if (!variationLink) return;

      const params = extractConvertParams(variationLink);
      if (!params) return;

      const { eParam, vParam } = params;

      //set up live QA query
      let liveQaQuery = `?_conv_eforce=${eParam}.${vParam}`;
      if (qaParam) {
        liveQaQuery = `?utm_medium=${qaParam}&_conv_eforce=${eParam}.${vParam}`;
      }

      // gather all area-path pairs in the desired order per variation:
      // National → Local (checked) → Lead Flow → Service Pages
      const areaOrder = ["National", "Local", "Lead Flow", "Service Pages"];
      let rows = []; // each row: {title, previewProd, previewStaging, qaProd, qaStaging}

      areaOrder.forEach((label) => {
        const area = selectedAreas.find((a) => a.label === label);
        if (!area) return;

        let paths = [];
        if (label === "Local") {
          // read checked boxes from the sibling container
          paths = Array.from($('#local-paths-boxes input.local-opt:checked')).map((el) => normSlug(el.value));
          if (!paths.length) {
            $("#local-select-error").show();
            return;
          }
          $("#local-select-error").hide();
        } else if (label === "National") {
          paths = [""];
        } else {
          // Lead Flow or Service Pages; from config (string or array)
          paths = toArray(brand[area.pathKey]);
          if (!paths.length) return;
        }

        const baseProd = brand.prod;
        const baseStaging = brand.staging || "";

        paths.forEach((p) => {
          const prodBase = joinUrl(baseProd, p);
          const stagingBase = baseStaging ? joinUrl(baseStaging, p) : "";

          const previewProdUrl = `${prodBase}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}`;
          const previewStagingUrl = stagingBase
            ? `${stagingBase}?convert_action=convert_vpreview&convert_e=${eParam}&convert_v=${vParam}`
            : "";

          const qaProdUrl = `${prodBase}${liveQaQuery}`;
          const qaStagingUrl = stagingBase ? `${stagingBase}${liveQaQuery}` : "";

          const slugSuffix =
            label === "Local" || label === "Lead Flow" || label === "Service Pages"
              ? ` – ${stripSlashes(p || "/")}`
              : "";

          const rowTitle = `${label}${slugSuffix}`;
          rows.push({
            title: rowTitle,
            previewProd: previewProdUrl,
            previewStaging: previewStagingUrl,
            qaProd: qaProdUrl,
            qaStaging: qaStagingUrl,
          });
        });
      });

      // Emit this variation’s section for Preview and QA
      if (rows.length) {
        // Variation header
        previewByVariation += `<span>\n</span><h3>${variationNumber}${variationName}</h3>`;
        qaByVariation += `<span>\n</span><h3>${variationNumber}${variationName}</h3>`;

        // Rows in order: National, then selected Local(s), then Lead Flow, then Service Pages
        rows.forEach((r) => {
          previewByVariation += block(r.title, r.previewProd, r.previewStaging);
          qaByVariation += block(r.title, r.qaProd, r.qaStaging);
        });
      }
    });

    // ==== Render output (two sections: Preview Links, Live QA Links) ====
    const outputDiv = $("#output");
    outputDiv.html(""); // clear current

    if (previewByVariation) {
      outputDiv.append(`<div id="variant-preview"><div class="link-container"></div></div>`);
      $("#variant-preview .link-container").html(`<h2>Preview Links</h2>${previewByVariation}`);
    }

    if (qaByVariation) {
      outputDiv.append(`<div id="variant-qa"><div class="link-container"></div></div>`);
      $("#variant-qa .link-container").html(`<h2>Live QA Links</h2>${qaByVariation}`);
    }

    // If no URLs were generated, show a message
    if (!previewByVariation && !qaByVariation) {
      outputDiv.removeClass("urls-generated").html("<p>No URLs were generated. Please check your inputs.</p>");
    } else {
      outputDiv.addClass("urls-generated");
    }

    // copy button
    outputDiv.append(`<div class="copy-container">
                    <button class="copy"> Copy
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>
                    </button>
                </div>`);

    $("button.copy").on("click", (e) => {
      copyText(e.target);
    });
  };

  document.addEventListener("DOMContentLoaded", addSteps);
})();
