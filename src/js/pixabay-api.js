import { refs } from './render-functions';

const API_KEY = '47870617-7ec65d65554e9e3e1b4aa2202';

export default function getQuery(query) {
  refs.loader.classList.remove("hidden")
  return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
}
