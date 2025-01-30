import { refs, renderGallery} from './js/render-functions';
import getQuery from "./js/pixabay-api"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";



function submitForm() {
    refs.form.addEventListener('submit', (event) => {
        event.preventDefault();

        const query = refs.input.value.trim();

        if (!query) {
            console.log("Please enter a search query.");
            refs.gallery.innerHTML = '';
            return;
        }

        getQuery(query)
            .then((response) => {
                refs.loader.classList.toggle("hidden"); // Переключение видимости
                const hits = response.hits; 
                console.log(response);

                if (!hits || hits.length === 0) {
                    iziToast.error({
                        title: 'Error',
                        message: 'Sorry, there are no images matching your search query. Please try again.',
                        position: 'topRight',
                        timeout: 3000
                    });
                    refs.gallery.innerHTML = '';
                    return;
                }

                renderGallery(hits); 
                lightBoxGallery.refresh();
                refs.loader.classList.toggle("hidden"); // Переключение видимости
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            })
            .finally(() =>{
                refs.loader.classList.add("hidden");
            });
    });
}





const lightBoxGallery = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250, 
    animationSpeed: 300, 
    enableKeyboard: true, 
  });
  

submitForm();
