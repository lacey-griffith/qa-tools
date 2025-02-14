const testBtnHandler = (activeBrand) => {
    document.querySelector('#test-btn').addEventListener('click', () => {
        if (activeBrand.neighborly) {
            fillInTestValues();
        }
    });
}

const fillInTestValues = () => {
    document.querySelector('button[data-handle="molly-maid"]').click();
    document.querySelector('input#qa-param').value = 'QA_MLY_20';
    const previewLinks = document.querySelectorAll('#variation-group-container > .variation-group input');
    previewLinks[0].value = 'https://www.mollymaid.com/?convert_action=convert_vpreview&convert_e=100475365&convert_v=1004183328';
    previewLinks[1].value = 'https://www.mollymaid.com/?convert_action=convert_vpreview&convert_e=100475365&convert_v=1004183329';
}

export { testBtnHandler };