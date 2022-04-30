/* API MEALDB */
function onJson(json){
    console.log('Json ricevuto');
    const library = document.querySelector('#meal-view');
    library.innerHTML = '';

    const meal = document.createElement('div');
    meal.classList.add('meal');
    const caption = document.createElement('span');
    const caption2 = document.createElement('span');
    const caption3 = document.createElement('span');
    const img = document.createElement('img');
    const caption4 = document.createElement('p');
    caption.textContent = "NOME: " + json.meals[0].strMeal;
    caption2.textContent = "TIPO: " +json.meals[0].strCategory;
    caption3.textContent = "ORIGINE: " +json.meals[0].strArea;
    img.src = json.meals[0].strMealThumb;
    caption4.textContent = "PREPARZIONE: " + json.meals[0].strInstructions;

    meal.appendChild(caption);
    meal.appendChild(caption2);
    meal.appendChild(caption3);
    meal.appendChild(img);
    meal.appendChild(caption4);
    library.append(meal);
}
function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }

function search(event){
    event.preventDefault();

    const meal_input = document.querySelector('#meal');
    const meal_value = encodeURIComponent(meal_input.value);
    console.log('eseguo ricerca:' + meal_value);

    rest_url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + meal_value;
    console.log('URL: ' + rest_url);
    fetch(rest_url).then(onResponse).then(onJson);
}

const form = document.querySelector('form');
form.addEventListener('submit',search);
/* API SPOTIFY */
const client_id = '37370320f01c4828bcac931fa9490aaa';
const client_secret = '83e4c955d5174a4ca90ea50af5cfd2d1';
let token;

function onJson_spotify(json){ 
    console.log('Json ricevuto');
    const library_spotify = document.querySelector('#song-view');
    library_spotify.innerHTML = '';

    const results = json.albums.items;
    let num_results = results.length;
    if(num_results > 8) num_results = 8;
    for(let i=0; i<num_results; i++){
        const element_list = results[i];
        const title = element_list.name;
        const selected_image = element_list.images[0].url;
        const songs = document.createElement('div');
        const album_img = document.createElement('img');
        const name = document.createElement('p');
        const link= document.createElement('a');
        songs.classList.add('song');
        album_img.src = selected_image;
        link.setAttribute('href', element_list.external_urls.spotify);
        link.textContent = title;
       
        songs.appendChild(album_img);
        songs.appendChild(name);
        songs.appendChild(link);
        library_spotify.appendChild(songs);
    }
}

function onResponse_spotify(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function spotify_Search(event){
    event.preventDefault();
    const tracks = document.querySelector('#song');
    const tracks_value = encodeURIComponent(tracks.value);
    fetch('https://api.spotify.com/v1/search?type=album&q=' + tracks_value,
      {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse_spotify).then(onJson_spotify);
  }

function onTokenJson_spotify(json){
    token = json.access_token;
  }
  
  function onTokenResponse_spotify(response){
    return response.json();
  }

fetch("https://accounts.spotify.com/api/token",
    {
        method: "post",
        body: 'grant_type=client_credentials',
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        }
}).then(onTokenResponse_spotify).then(onTokenJson_spotify);

const form2 = document.querySelector('#form2');
form2.addEventListener('submit',spotify_Search);
