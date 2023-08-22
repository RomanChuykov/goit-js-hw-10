const APIkey="live_TOj5ku2Wzlv0MHky4Uf8G286NAJLiuv47MWPmP5tHQ2Hsri92r39iiKFLgPif5dg"
//  https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}
const inform = 'https://api.thecatapi.com/v1/images/';
const html={
  loader:document.querySelector('.loader'),
  error:document.querySelector('.error')
  
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

