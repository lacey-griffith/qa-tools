function getZips() {
    const city = $('#city').val().trim();

    // Reset previous result and errors
    $('#result').text('');
    $('#error').text('');

    // If no city is entered, show an error message
    if (city === "") {
        $('#error').text('Please enter a city name.');
        return;
    }

    const state = 'CA'; // Default state set to CA (you can modify this to be dynamic if needed)

    // Zippopotam.us API URL
    const apiUrl = `https://api.zippopotam.us/us/${state}/${city}`;

    // Perform AJAX request to Zippopotam.us API
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(data) {
            const zipCodes = data.places.map(place => place['post code']);
            $('#zip-result').html(`<strong>Zip Codes for ${city}, ${state}:</strong> ${zipCodes.join(', ')}`);
        },
        error: function() {
            $('#error').text('No zip codes found. Please check the city name.');
        }
    });
}