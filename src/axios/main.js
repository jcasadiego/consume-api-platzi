console.log('Usando async/await con axios en favoritos');

const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});

api.defaults.headers.common['X-API-KEY'] = 'e00fbbe7-8faa-4df8-8c8a-bfcef481fefb';

const spanError = document.getElementById('error')

async function loadRandomMichis(){

    const {data, status} = await api.get('/images/search?limit=2');

    try{
        if(status !== 200){
            spanError.innerHTML = "Hubo un error: " + status;
        } else {
            const img1 = document.getElementById('img1');
            const btn1 = document.getElementById('btn1');
            const img2 = document.getElementById('img2');
            const btn2 = document.getElementById('btn2');

            img1.src = data[0].url;
            img2.src = data[1].url;

            btn1.onclick = () => saveFavouriteMichi(data[0].id);
            btn2.onclick = () => saveFavouriteMichi(data[1].id);
            console.log('Se realizo la peticion exitosamente cargando gatos aleatorios');
        }
    } catch(error){
        spanError.innerHTML = "Hubo un error: " + status;
        console.error(error)
    }
}

async function loadFavouriteMichis(){

    const {data, status} = await api.get('/favourites');

    try{
        if(status !== 200){
            spanError.innerHTML = "Hubo un error: " + status + data.message;
        } else {
            const section = document.getElementById('favoriteMichis');
            section.innerHTML = "";
            const h2 = document.createElement('h2');
            const h2Text = document.createTextNode('Gatito Favoritos')
            h2.appendChild(h2Text);
            section.appendChild(h2);
            data.forEach(michi => {
                const article = document.createElement('article');
                const img = document.createElement('img');
                const btn = document.createElement('button');
                const btnText = document.createTextNode('Sacar al michi de favorito');

                btn.appendChild(btnText);
                btn.onclick = () => deleteFavouriteMichi(michi.id);
                img.src = michi.image.url;
                img.width = 150;
                article.appendChild(img);
                article.appendChild(btn);
                section.appendChild(article);
            });
        }
    } catch(error) {
        spanError.innerHTML = "Hubo un error: " + status;
        console.error(error);
    }
}

async function saveFavouriteMichi(id){
    const {data, status} = await api.post('/favourites', {
        image_id: id,
    });

    if(status !== 200){
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
        console.log('Se realizo la peticion exitosamente guardando gato favorito');
        loadFavouriteMichis();
    }
}

async function deleteFavouriteMichi(id){

    const {data, status} = await api.delete(`/favourites/${id}`);

    if(status !== 200){
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
        console.log('Se realizo la peticion exitosamente eliminando el gato de favorito');
        loadFavouriteMichis();
    }
}

async function uploadMichiPhoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const {data, status} = await api.post('/images/upload', {
        data: {
            body: formData,
        },
    });

    if (status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: ${status} ${data.message}`
    }
    else {
        console.log("Foto de michi cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavouriteMichi(data.id) //para agregar el michi cargado a favoritos.
    }
}

loadRandomMichis();
loadFavouriteMichis();