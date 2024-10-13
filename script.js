import { imgFiles, imgCaptions} from './data.js';

window.addEventListener('error', (event) => {
    event.preventDefault()
    console.log(`Error in ${event.filename} at line ${event.lineno}:${event.colno} message => ${event.message}`);
    return true
})






const createLightBox = function (){
   try {
        const lightBox = document.querySelector('.lightbox-container')



        const mainH1 = document.createElement('h1')
        mainH1.innerHTML ="My Western Vacation"
        lightBox.appendChild(mainH1)

        const galleryContainer = document.createElement('div')
        galleryContainer.classList.add('gallery')

        const counterBox = document.createElement('div')
        counterBox.classList.add('counter-box')

        const currentSlideSpan = document.createElement('span');
        currentSlideSpan.id = 'current-slide';
        let curruntImg = 1
        currentSlideSpan.innerHTML = `${curruntImg}`;

        const totalSlidesSpan = document.createElement('span');
        totalSlidesSpan.id = 'total-slides';
        const totalImg = imgFiles.length
        totalSlidesSpan.innerHTML = `${totalImg}`;

        counterBox.appendChild(currentSlideSpan);
        counterBox.appendChild(document.createTextNode('/'));
        counterBox.appendChild(totalSlidesSpan);

        galleryContainer.appendChild(counterBox)

        const previousBtn = document.createElement('button')
        previousBtn.id = "prev-btn"
        previousBtn.classList.add("nav-btn")
        previousBtn.innerHTML = "&#9664"

        galleryContainer.appendChild(previousBtn)

        const imgContainer = document.createElement('div')
        imgContainer.classList.add('image-container')

        galleryContainer.appendChild(imgContainer)
        
        const nextBtn = document.createElement('button')
        nextBtn.id = "next-btn"
        nextBtn.classList.add("nav-btn")
        nextBtn.innerHTML = "&#9654"
        
        
        galleryContainer.appendChild(nextBtn)

        


        lightBox.appendChild(galleryContainer)


        

        const controlsContainer = document.createElement('div')
        controlsContainer.classList.add('controls')

        const play = document.createElement('button')
        play.id = "play-pause-btn"
        play.classList.add('control-btn')
        play.innerHTML = 'Play'

        controlsContainer.appendChild(play)

        lightBox.appendChild(controlsContainer)



        imgFiles.forEach((img, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = img;
            imgElement.alt = imgCaptions[index];
            imgContainer.appendChild(imgElement);
        })


        nextBtn.onclick = showNext





        function showNext(){
            console.log('imgContainer:', imgContainer);
        
            if (imgContainer && imgContainer.children.length > 0) {
                const firstChild = imgContainer.firstElementChild;
                imgContainer.appendChild(firstChild);
                
                // Update the current image counter
                (curruntImg < totalImg) ? curruntImg++ : curruntImg = 1;
                currentSlideSpan.textContent = `${curruntImg}`;
            } else {
                console.error('imgContainer is empty or not found');
            }
        }


        // nextBtn.addEventListener("click", () => {
        //     const imageWidth = imgContainer.firstElementChild.offsetWidth;
        //     imgContainer.scrollLeft += imageWidth;
        //     // console.dir(imgContainer);
        //     if (imgContainer.scrollLeft + imgContainer.clientWidth >= imgContainer.scrollWidth) {
        //         imgContainer.scrollLeft = 0;
        //     }
        //     curruntImg = Math.floor(imgContainer.scrollLeft / imageWidth) + 1;
        //     if (curruntImg > totalImg) curruntImg = 1;
        //     currentSlideSpan.innerHTML = `${curruntImg}`;
        // })


        previousBtn.onclick = showPrev


        function showPrev() {
            // console.log('imgContainer:', imgContainer);
            try {
                console.log('showPrev - imgContainer:', imgContainer);
                console.log('showPrev - imgContainer type:', typeof imgContainer);
                
                if (imgContainer === null || imgContainer === undefined) {
                    throw new Error('imgContainer is null or undefined');
                }
                
                if (typeof imgContainer !== 'object') {
                    throw new Error(`imgContainer is not an object, it's a ${typeof imgContainer}`);
                }
                
                console.log('showPrev - imgContainer prototype:', Object.getPrototypeOf(imgContainer));
                
                if (!imgContainer.children || typeof imgContainer.children.length !== 'number') {
                    throw new Error('imgContainer does not have a valid children property');
                }
                
                if (imgContainer.children.length > 0) {
                    if (typeof imgContainer.insertBefore !== 'function') {
                        throw new Error('insertBefore is not a function on imgContainer');
                    }
                    
                    const lastChild = imgContainer.lastElementChild;
                    imgContainer.insertBefore(lastChild, imgContainer.firstElementChild);
                    
                    (curruntImg > 1) ? curruntImg-- : curruntImg = totalImg;
                    currentSlideSpan.textContent = `${curruntImg}`;
                } else {
                    console.warn('imgContainer is empty');
                }
            } catch (error) {
                console.error('Error in showPrev:', error.message);
                // Optionally, log the full error object
                console.error('Full error:', error);
            }
        }


        // previousBtn.addEventListener("click", () => {
        //     const imageWidth = imgContainer.lastElementChild.offsetWidth;
        //     const currentScroll = imgContainer.scrollLeft;
        //     let newScroll;
        
        //     if (currentScroll > 0) {
        //         newScroll = Math.max(0, currentScroll - imageWidth);
        //     } else {
        //         newScroll = imgContainer.scrollWidth - imgContainer.clientWidth;
        //     }
        
        //     imgContainer.scrollLeft = newScroll;
            
        //     // Calculate the current image index (add 1 because indices start at 1)
        //     let currentImg = Math.floor(newScroll / imageWidth) + 1;
            
        //     // Ensure currentImg is within bounds
        //     if (currentImg < 1) currentImg = totalImg;
        //     if (currentImg > totalImg) currentImg = 1;
        
        //     currentSlideSpan.textContent = `${currentImg}`;
        // });
   } catch (error) {
        console.error(error)
   }
}





window.addEventListener("load", createLightBox)

