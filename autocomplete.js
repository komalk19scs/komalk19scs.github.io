fetch("resources/countries.json")
    .then(response => response.json())
    .then(data => {
        countriesData = data;

        // Extract country names and convert them to lowercase for case-insensitive matching
        const countryNames = countriesData.map(country => country.Country.toLowerCase());

        const countryInput = document.getElementById('countryInput');
        const suggestionsList = document.getElementById('suggestions');

        countryInput.addEventListener('input', handleInput);

        function handleInput() {
            const inputValue = countryInput.value.toLowerCase();

            if (inputValue.trim() === '') {
                displaySuggestions([]);
            } else {
                const matchingCountries = countryNames.filter(country => country.includes(inputValue));
                displaySuggestions(matchingCountries, inputValue);
            }
        }

        function displaySuggestions(suggestions, inputValue) {
            suggestionsList.innerHTML = '';

            suggestions.forEach(suggestion => {
                const matchingCountry = countriesData.find(country => country.Country.toLowerCase() === suggestion);
                if (matchingCountry) {
                    const li = document.createElement('li');
                    li.innerHTML = highlightMatchedText(`${matchingCountry.Country} - ${matchingCountry.Capital}`, inputValue);
                    li.classList.add('list-group-item');
                    suggestionsList.appendChild(li);
                }
            });
        }

        function highlightMatchedText(text, highlight) {
            const highlightedText = text.replace(new RegExp(`(${highlight})`, 'gi'), '<mark>$1</mark>');
            return highlightedText;
        }
    })
    .catch(error => {
        console.error("Error fetching JSON:", error);
    });
