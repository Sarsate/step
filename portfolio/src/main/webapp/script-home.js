// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adjusts the SlideShow forward by one.
 * @type {number}
 */
const ADJUST_FORWARD = 1;

/**
 * Adjusts the SlideShow back one.
 * @type {number}
 */
const ADJUST_BACK = -1;

/*
 * This waits until the webpage loads and then it calls the anonymous function, which calls main.
 */
window.onload = function() { main(); }

/* 
 * function main() initializes the slideshows and the interactive elements on the website.
 */
function main() {
    const /** ?HTMLCollection */ slideShowGallery =
        new SlideShow(document.getElementsByClassName('gallery-slides'));
    const /** ?HTMLCollection */ slideShowBlog  =
        new SlideShow(document.getElementsByClassName('blog-slides'));

    slideShowBlog.setToAutomaticallyChangeSlides();

    document.getElementById('switch-slides-left').onclick =
        function adjustBackOne() {
          slideShowGallery.adjustSlideManual(ADJUST_BACK); 
    }
    document.getElementById('switch-slides-right').onclick =
        function adjustForwardOne() {
          slideShowGallery.adjustSlideManual(ADJUST_FORWARD); 
    }
    
    fetch('/data').then(response => response.json()).then((comments) => {
      const /** ?HTMLCollection */commentContainer =
          document.getElementById('comments-container');

      for(i in comments){
        let /** string */ stringOfName;
        if(comments[i].name==null || comments[i].name==''){
            stringOfName = 'Anonymous';
        }else{
            stringOfName = comments[i];
        }

        const /** ?HTMLCollection */ nameOfCommenter = document.createElement("h3");
        nameOfCommenter.appendChild(document.createTextNode(stringOfName));
        const /** ?HTMLCollection */ dateOfComment = document.createElement("h4");
        dateOfComment.appendChild(document.createTextNode(comments[i].timeOfComment.toString()));
        const /** ?HTMLCollection */ actualComment = document.createElement("p");
        actualComment.appendChild(document.createTextNode(comments[i].comment));

        actualComment.style.cssText='padding-top:10px;';
        
        const /** ?HTMLCollection */ divOfComment = document.createElement("div");
        divOfComment.appendChild(nameOfCommenter);
        divOfComment.appendChild(dateOfComment);
        divOfComment.appendChild(actualComment);

        divOfComment.style.cssText='border: 3px solid #b31b1b;padding:10px 0 10px;'

        commentContainer.appendChild(divOfComment);
      }
    });
}

/*
 * @return the <li> element containing text passed in.
 * @param {string} text is what is put into the <li>
 */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
