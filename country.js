const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const countryCode = urlParams.get("code");

const restapi_url = `https://restcountries.com/v2/alpha/${countryCode}`;

async function getCountryDetails() {
  try {
    const response = await fetch(restapi_url);
    const data = await response.json();
    // Display the country details
    showCountryDetails(data);
  } catch (error) {
    console.error("Error fetching country details:", error);
  }
}

function showCountryDetails(data) {
  const countryContainer = document.getElementById("country-container");

  if (data.status && data.status === 404) {
    // Handle the case when the country data is not found
    countryContainer.innerHTML = `<p>Country not found.</p>`;
  } else {
    // Display the country details
    const flagUrl = data.flags.png;

    const official = data.name?.common;
    console.log(official);
    const nativeName = data.nativeName?.eng;
    console.log(nativeName)

    const {
      population,
      region,
      subregion,
      capital,
      tld,
      currencies,
      languages,
      borders,
    } = data;

    const languageNames = Object.values(languages);

    countryContainer.innerHTML = `
      <div class="flag-section">
        <img src="${flagUrl}" width="450" height="350"/>
      </div>
      <div class="flag-summary">
        <div class="flag-segment">
          <h1>${official}</h1>
          <div class="flags">
            <div class="flag-name">
               <p><b>Native Name: </b> ${nativeName}</p>
              <p><b>Population: </b> ${population}</p>
              <p><b>Region: </b> ${region}</p>
              <p><b>Sub Region: </b> ${subregion}</p>
              <p><b>Capital: </b> ${capital}</p>
            </div>
            <div class="flag-level">
            <p><b>Top Level Domain: </b> ${tld ? tld.join(", ") : "N/A"}</p>
              <p><b>Currencies: </b> ${
                currencies
                  ? Object.values(currencies)
                      .map((curr) => curr.name)
                      .join(", ")
                  : "N/A"
              }</p>
              <p><b>Languages: </b> ${
                languageNames.length > 0 ? languageNames.join(", ") : "N/A"
              }</p>
            </div>
          </div>
          <p><b>Border Countries</b>:</p>
          ${
            Array.isArray(borders) && borders.length > 0
              ? borders.map((border) => `<button>${border}</button>`).join(" ")
              : "<p>No border countries found.</p>"
          }
        </div>
      </div>
    `;
  }
}

// Fetch the country details when the separate page loads
getCountryDetails();
