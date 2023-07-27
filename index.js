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
                width="310" height="250"/>   
                </div>
                <div class="country-data">
                    <h4>${r.name.official}</h4>
                    <p>${r.population}</p>
                    <p>${r.region}</p>
                    <p>${r.capital}</p>
                </div>
            </div>
        `;
    }
    document.getElementById("countries").innerHTML = tab;
}