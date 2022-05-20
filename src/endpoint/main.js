console.log('Usando async/await con endpoint');

const API = 'https://api.thecatapi.com/v1/images/search?limit=3';

async function reload(){
    try{
        const res = await fetch(API);
        const data = await res.json();

        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        console.log('Se realizo la peticion exitosamente con un button');
    } catch(error){
        console.error(error)
    }
}


console.log('Before');
reload();
console.log('After');