console.log('Usando async/await');

const API = 'https://api.thecatapi.com/v1/images/search?limit=3';

const fetchFunction = async (url_api) => {
    try{
        const res = await fetch(url_api);
        const data = await res.json();
        const img = document.querySelector('img');
        img.src = data[0].url;
        console.log('Se realizo la peticion exitosamente');

    } catch (error) {
        console.error(error);
    }
}

async function reload(){
    try{
        const res = await fetch(API);
        const data = await res.json();

        const img = document.querySelector('img');
        img.src = data[0].url;
        console.log('Se realizo la peticion exitosamente con un button');
    } catch(error){
        console.error(error)
    }
}


console.log('Before');
fetchFunction(API);
console.log('After');