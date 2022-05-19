console.log('Usando async/await');

const API = 'https://api.thecatapi.com/v1/images/search';

const fetchFunction = async (url_api) => {
    try{
        const res = await fetch(url_api);
        const data = await res.json();
        const img = document.querySelector('img');
        img.src = data[0].url;
        console.log('Se realizo la peticion exitosamente');

    } catch (error) {
        console.log(error);
    }
}

const myButton = document.querySelector("button");
myButton.onclick = fetchFunction;

console.log('Before');
fetchFunction(API);
console.log('After');