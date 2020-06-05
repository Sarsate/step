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
    initializeSlideshows();
    populateComments();
}

/** 
 * function initializeSlideshows() initializes the blog slideshow and the gallery slideshow.
 */
function initializeSlideshows() {
  const /** ?HTMLCollection */ slideshowGallery =
      new SlideShow(document.getElementsByClassName('gallery-slides'));
  const /** ?HTMLCollection */ slideshowBlog  =
      new SlideShow(document.getElementsByClassName('blog-slides'));
  slideshowBlog.setToAutomaticallyChangeSlides();

  document.getElementById('switch-slides-left').onclick =
        function adjustBackOne() {
          slideShowGallery.adjustSlideManual(ADJUST_BACK); 
        };
  document.getElementById('switch-slides-right').onclick =
        function adjustForwardOne() {
          slideShowGallery.adjustSlideManual(ADJUST_FORWARD); 
        };
}

/** 
 * function populateComments() populates the comment board on the webpage.
 */
function populateComments() {
  fetch('/comments').then(response => response.json()).then(
        (comments) => {
          const /** ?HTMLCollection */commentContainer =
              document.getElementById('comments-container');

          comments.forEach(function(comment) {
            let /** string */ stringOfName;
            if (comment.name==null || comment.name=='') {
              stringOfName = 'Anonymous';
            } else {
              stringOfName = comment.name;
            }
            const /** ?HTMLCollection */ nameOfCommenter =
                document.createElement('h3');
            nameOfCommenter.innerHTML = stringOfName;
            const /** ?HTMLCollection */ dateOfComment =
                document.createElement('h4');
            dateOfComment.innerHTML =
                "Date Posted: " + comment.timeOfComment;
            const /** ?HTMLCollection */ commentString =
                document.createElement('p');
            commentString.innerHTML = comment.commentString;

            //Adds the individual elements to a single div
            const /** ?HTMLCollection */ divOfComment =
                document.createElement('div');
            divOfComment.appendChild(nameOfCommenter);
            divOfComment.appendChild(dateOfComment);
            divOfComment.appendChild(commentString);

            divOfComment.style.border='3px solid #b31b1b';
            divOfComment.style.margin='15px 0 15px';
            divOfComment.style.padding='10px';

            commentContainer.appendChild(divOfComment);
          });
        });
}
