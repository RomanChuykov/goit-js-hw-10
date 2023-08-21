
// import './css/styles.css';
import { fetchCatByBreed,fetchBreed} from "./cat-api";

const urlBreeds="https://api.thecatapi.com/v1/breeds";

let breedData;

const api_key = "live_TOj5ku2Wzlv0MHky4Uf8G286NAJLiuv47MWPmP5tHQ2Hsri92r39iiKFLgPif5dg"
let storedBreeds = [];
 const html={
    loader:document.querySelector('.loader'),
    error:document.querySelector('.error'),
    catInfo:document.querySelector('.cat-info'),
    breed:document.querySelector("breed-select")
 }
//  html.breed.style.display='none';
html.loader.style.display='block';
html.error.style.display='none';

 fetch(urlBreeds,{headers: {
      'x-api-key': api_key
    }})
 .then((response) => {
     return response.json();
    })
    .then((data) => {
        
        //filter to only include those with an `image` object
        data = data.filter(img=> img.image?.url!=null)
        
        storedBreeds = data;
       
        for (let i = 0; i < storedBreeds.length; i++) {
            const breed = storedBreeds[i];
            let option = document.createElement('option');
            
            //skip any breeds that don't have an image
            if(!breed.image)continue
            
            //use the current array index
    option.value = i;
    option.innerHTML = `${breed.name}`;
    document.querySelector('.breed-select').appendChild(option);
    
}
// html.breed.style.display='block';
html.loader.style.display='none';
})
.catch(function(error) {
    html.error.style.display='block';
});


const selectElement = document.querySelector('.breed-select');
selectElement.addEventListener('change', function(event) {
    html.catInfo.innerHTML='';
    // html.breed.style.display='none';
    html.loader.style.display='block';
    const selectedValue = event.target.value;
    
    
    fetchCatByBreed(storedBreeds[selectedValue].id)
        .then((data) =>{
               
            addData(data)
        })
        .catch (error=>{
            html.loader.style.display='none';
            html.error.style.display='block';
        })
    });
    
    function addData(data) {
        const dataBreed={
            jpgURL: '',
            temperament:'',
            description:'',
            nameBreed:''
        }
        
         dataBreed.jpgURL= data[0].url;
         dataBreed.temperament=data[0].breeds[0].temperament;
         dataBreed.description=data[0].breeds[0].description;
         dataBreed.nameBreed=data[0].breeds[0].name;
         
         
        
         const insert=`
         <img class="cat-img" src="${dataBreed.jpgURL}" alt="The cat">
         <div class="info">
         <h2 class="nameBreed">${dataBreed.nameBreed}</h2>
         <p class="description">${dataBreed.description}</p>
         <p class="temperament">Temperament: ${dataBreed.temperament}</p>
         </div>
         `
         html.catInfo.innerHTML=insert;
         html.loader.style.display='none';
}
