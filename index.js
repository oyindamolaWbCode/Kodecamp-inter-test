const country = document.getElementsByClassName('countries')

const restapi_url = 'https://restcountries.com/v3.1/all';

async function getapi(url){
     const response = await fetch(url);

     let data = await response.json() 
     console.log(data);
     if(response){
        hideloader()
     }
     show(data);
}

getapi(restapi_url)

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

function show(data){

    let tab = '';
    for(const r of data){
            
        tab += `
        <div class="country-category">
        <a href="country.html" class="country-link" data-code="${r.cca2}">
                <div class="country-image">
                <img src=${r.flags.png}
                width="330" height="230"/>   
                </div>
                <div class="country-data">
                    <h3>${r.name.official}</h3>
                    <p><b>Population</b>: ${r.population}</p>
                    <p><b>Region</b>: ${r.region}</p>
                    <p><b>Capital</b>: ${r.capital}</p>
                </div>
                </a>
            </div>
        `;
  

}
    document.getElementById("countries").innerHTML = tab;
    // Add event listeners to country links
  const countryLinks = document.getElementsByClassName("country-link");
  for (const link of countryLinks) {
    link.addEventListener("click", handleCountryLinkClick);
  }
}


function handleCountryLinkClick(event) {
    event.preventDefault();
    const countryCode = event.currentTarget.dataset.code;
    // Redirect to the country.html page with the selected country code as a query parameter
    window.location.href = `country.html?code=${countryCode}`;
  }

//searchInput
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', filterCountries);

//Region 
const regionFilter = document.getElementById('search');
regionFilter.addEventListener('change', filterCountries);

function filterCountries(){

    const filterValue = searchInput.value.toLowerCase();
    const countryCategories = document.getElementsByClassName('country-category');

    for(const category of countryCategories){
        const countryName = category.querySelector('h3').innerText.toLowerCase();

        const countryRegion = category.querySelector('p:nth-child(3)').innerText
        .replace('Region:', '').trim().toLowerCase();

        if(countryName.includes(filterValue)){
            category.style.display = 'grid';
            // category.style.grid-template-columns = 'auto auto auto auto';
        } else{
            category.style.display ='none';
        }

    }
}

