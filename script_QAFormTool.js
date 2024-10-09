/* * * * * * * * * * * */
/* QA FORM GENERATOR */
/* * * * * * * * * * */

// Generic function to generate checkboxes
function generateCheckboxes(options, containerId, name) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content

    options.forEach(option => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = option.replace(/\s+/g, '-').toLowerCase(); // Create a unique ID
        checkbox.name = name; // Use the correct name for grouping
        checkbox.classList.add('category-checkbox'); // Add a class for easy selection

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = option;

        container.appendChild(checkbox);
        container.appendChild(label);
        container.appendChild(document.createElement('br'));

        // Add event listener to remove error message when this checkbox is checked
        checkbox.addEventListener('change', function() {
            const existingError = container.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        });
    });
}

// Function to generate Neighborly brand checkboxes with additional logic
function generateBrandCheckboxes() {
    const brandCheckboxesDiv = document.getElementById('brandCheckboxes');

    brands.forEach(brand => {
        if (brand.neighborly) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = brand.brand_handle;
            checkbox.name = 'neighborlyBrand';
            checkbox.value = brand.brand;
            checkbox.classList.add('category-checkbox');

            checkbox.addEventListener('change', function() {
                const errorMessage = brandCheckboxesDiv.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });

            const label = document.createElement('label');
            label.htmlFor = brand.brand_handle;
            label.textContent = brand.brand;

            brandCheckboxesDiv.appendChild(checkbox);
            brandCheckboxesDiv.appendChild(label);
            brandCheckboxesDiv.appendChild(document.createElement('br'));
        }
    });
}

function generatePDF() {
    const { jsPDF } = window.jspdf; // Accessing jsPDF
    const doc = new jsPDF();

    // Select all categories with checkboxes
    const categories = [
        { name: 'neighborlyBrand', label: 'Neighborly Brand', containerId: 'brandCheckboxes' },
        { name: 'impactArea', label: 'Impacted Areas', containerId: 'impactAreasCheckboxes' },
        { name: 'platformTested', label: 'Platforms Tested', containerId: 'platformsTestedCheckboxes' },
        { name: 'elements-reviewed', label: 'Elements Reviewed', containerId: 'elementsReviewedCheckboxes' },
        { name: 'devices', label: 'Devices Tested', containerId: 'devicesCheckboxes' },
        { name: 'browsers', label: 'Browsers Used', containerId: 'browserCheckboxes' },
        { name: 'environment', label: 'Environments Tested', containerId: 'environmentCheckboxes' }
    ];

    let valid = true; // Track overall form validity
    let pdfContent = []; // Collect content for PDF

    categories.forEach(category => {
        const checkboxes = document.querySelectorAll(`input[name="${category.name}"]`);
        const checkedValues = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.nextSibling.textContent); // Get label text

        // If no checkbox is checked, mark as invalid
        if (checkedValues.length === 0) {
            valid = false;
            const container = document.getElementById(category.containerId);
            const errorMessage = document.createElement('p');
            errorMessage.className = 'error-message';
            errorMessage.textContent = `Please select at least one ${category.label.toLowerCase()}.`;
            container.appendChild(errorMessage);
        } else {
            // Append checked values to pdfContent
            pdfContent.push(`${category.label}: ${checkedValues.join(', ')}`);
        }
    });

    // If the form is not valid, stop the PDF generation
    if (!valid) {
        return; // Stop execution if any category is invalid
    }

    // Proceed with PDF generation if valid
    doc.text("QA Form", 10, 10);

    // Add gathered content to the PDF
    pdfContent.forEach((content, index) => {
        doc.text(content, 10, 20 + (index * 10)); // Adjust vertical spacing
    });

    // Get values from other inputs (name, title, test-id)
    const reviewerName = document.getElementById('name').value;
    const testTitle = document.getElementById('title').value;
    const testId = document.getElementById('test-id').value;

    // Add additional info to PDF
    doc.text(`Reviewer Name: ${reviewerName}`, 10, 20 + (pdfContent.length * 10));
    doc.text(`Test Title: ${testTitle}`, 10, 30 + (pdfContent.length * 10));
    doc.text(`Test ID: ${testId}`, 10, 40 + (pdfContent.length * 10));

    // Add notes section
    const notes = document.getElementById('additional-notes').value;
    doc.text("Additional Notes: ", 10, 50 + (pdfContent.length * 10));
    doc.text(notes, 10, 60 + (pdfContent.length * 10));

    // Save the generated PDF
    doc.save("QA_Form.pdf");
}


// Initialize checkbox generation
generateBrandCheckboxes();
generateCheckboxes(['Sitewide', 'Local Homepages', 'Lead Form', 'National Homepage', 'Service Pages', 'Blog Pages'], 'impactAreasCheckboxes', 'impactArea');
generateCheckboxes(['Desktop', 'Mobile', 'Tablet'], 'platformsTestedCheckboxes', 'platformTested');
generateCheckboxes(['Responsive Design', 'Dynamic Localization','Error States','Functionality', 'Copy Accuracy & Variability'], 'elementsReviewedCheckboxes', 'elements-reviewed');
generateCheckboxes(['Mac', 'PC', 'iPhone', 'Android'], 'devicesCheckboxes', 'devices');
generateCheckboxes(['Safari', 'Chrome', 'Firefox','Opera','Edge'], 'browserCheckboxes', 'browsers');
generateCheckboxes(['Staging', 'Production'], 'environmentCheckboxes', 'environment');
