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
            </div>
        `;
    }
    document.getElementById("countries").innerHTML = tab;
}

//searchInput
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', filterCountries);

function filterCountries(){
    const filterValue = searchInput.value.toLowerCase();
    const countryCategories = document.getElementsByClassName('country-category');

    for(const category of countryCategories){
        const countryName = category.querySelector('h3').innerText.toLowerCase();
        if(countryName.includes(filterValue)){
            category.style.display = 'grid';
            // category.style.grid-template-columns = 'auto auto auto auto';
        } else{
            category.style.display ='none';
        }
    }
}