const APIkey="live_TOj5ku2Wzlv0MHky4Uf8G286NAJLiuv47MWPmP5tHQ2Hsri92r39iiKFLgPif5dg"
//  https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}
const inform = 'https://api.thecatapi.com/v1/images/';
const urlBreeds="https://api.thecatapi.com/v1/breeds";
const html={
  loader:document.querySelector('.loader'),
  error:document.querySelector('.error'),
  catInfo:document.querySelector('.cat-info'),
  breed:document.querySelector(".breed-select")
}

let informBreed = {};
export const fetchCatByBreed = function(breedId) {
    const uri = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    return fetch(uri, {
      headers: {
        'x-api-key': APIkey
      }
    })
    .then((response) => {
      return response.json();
    }).catch(function(error) {
      // html.error.style.visibility='visible';
      html.loader.style.display='none';
html.error.style.display='block';
  });
    
    
}
export function fetchBreed(){
  html.breed.style.display='none';
  console.log('no breed')
  fetch(urlBreeds,{headers: {
    'x-api-key': APIkey
  }})
.then((response) => {
   return response.json();
  })
  .then((data) => {
      
      //filter to only include those with an `image` object
      // data = data.filter(img=> img.image?.url!=null)
      let option = document.createElement('option');
      option.value =0;//i
      option.innerHTML = `Select a cat breed`;
      document.querySelector('.breed-select').appendChild(option);
      storedBreeds = data;
      
      html.breed.style.display='block';
      console.log('breed.on')
      for (let i = 0; i < storedBreeds.length; i++) {
          const breed = storedBreeds[i];
          let option = document.createElement('option');
          
          //skip any breeds that don't have an image
          // if(!breed.image)continue
          
          //use the current array index
  option.value = breed.id;//i
  option.innerHTML = `${breed.name}`;
  document.querySelector('.breed-select').appendChild(option);
  
}
// html.breed.style.display='block';
html.loader.style.display='none';
})
.catch(function(error) {
  // html.breed.style.display='none';
  html.loader.style.display='none';
  html.error.style.display='block';

});




}
