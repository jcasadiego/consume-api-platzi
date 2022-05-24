console.log('Usando async/await en favoritos');

const API_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=e00fbbe7-8faa-4df8-8c8a-bfcef481fefb';

const API_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=3&api_key=e00fbbe7-8faa-4df8-8c8a-bfcef481fefb';

const spanError = document.getElementById('error')

async function loadRandomMichis(){
    try{
        const res = await fetch(API_RANDOM);
        const data = await res.json();

        if(res.status !== 200){
            spanError.innerHTML = "Hubo un error: " + res.status;
        } else {
            const img1 = document.getElementById('img1');
            const img2 = document.getElementById('img2');

            img1.src = data[0].url;
            img2.src = data[1].url;
            console.log('Se realizo la peticion exitosamente cargando gatos aleatorios');
        }
    } catch(error){
        spanError.innerHTML = "Hubo un error: " + res.status;
        console.error(error)
    }
}

async function loadFavoritesMichis(){
    try{
        const res = await fetch(API_FAVORITES);
        const data = await res.json();

        if(res.status !== 200){
            spanError.innerHTML = "Hubo un error: " + res.status + data.message;
        } else {
            console.log(data);
            console.log('Se realizo la peticion exitosamente cargando gato favorito');
        }
    } catch(error) {
        spanError.innerHTML = "Hubo un error: " + res.status;
        console.error(error);
    }
}

console.log('Before');
loadRandomMichis();
console.log('After');

console.log('Before1');
loadFavoritesMichis();
console.log('After1');
