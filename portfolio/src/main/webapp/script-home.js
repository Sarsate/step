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
 * Adjusts the Slideshow forward by one.
 * @type {number}
 */
const ADJUST_FORWARD = 1;

/**
 * Adjusts the Slideshow back one.
 * @type {number}
 */
const ADJUST_BACK = -1;

let queryString;

/** 
 * This waits until the webpage loads and then it calls the anonymous function, which calls main.
 */
window.onload = function() { main(); }

/**
 * function main() initializes the slideshows, maintains the interactive elements on the website,
 * and populates the comment board from a servlet. 
 */
function main() {
  initializeSlideshows();
  updateMaxDisplayComments();
  populateComments();
}

/** 
 * function initializeSlideshows() initializes the blog slideshow and the gallery slideshow.
 */
function initializeSlideshows() {
  const /** ?HTMLCollection */ slideshowGallery =
      new Slideshow(document.getElementsByClassName('gallery-slides'));
  const /** ?HTMLCollection */ slideshowBlog  =
      new Slideshow(document.getElementsByClassName('blog-slides'));
  slideshowBlog.setToAutomaticallyChangeSlides();

  document.getElementById('switch-slides-left').onclick =
        function adjustBackOne() {
          slideshowGallery.adjustSlideManual(ADJUST_BACK); 
    }
  document.getElementById('switch-slides-right').onclick =
        function adjustForwardOne() {
          slideshowGallery.adjustSlideManual(ADJUST_FORWARD); 
    }  
}
/** 
 * function populateComments() populates the comment board on the webpage.
 */
function populateComments() {
  fetch(queryString).then(response => response.json()).then(
        (comments) => {
          const /** ?HTMLCollection */commentContainer =
              document.getElementById('comments-container');
          commentContainer.innerHTML = "";

          for(i in comments) {
            let /** string */ stringOfName;
            if (comments[i].name==null || comments[i].name=='') {
              stringOfName = 'Anonymous';
            } else {
              stringOfName = comments[i].name;
            }
            //Creates two headers and paragraph for the name, date, and comment.
            const /** ?HTMLCollection */ nameOfCommenter =
                document.createElement('h3');
            nameOfCommenter.innerHTML = stringOfName;
            const /** ?HTMLCollection */ dateOfComment =
                document.createElement('h4');
            dateOfComment.innerHTML =
                "Date Posted: " + comments[i].timeOfComment;
            const /** ?HTMLCollection */ actualComment =
                document.createElement('p');
            actualComment.innerHTML = comments[i].comment;

            //Adds the individual elements to a single div
            const /** ?HTMLCollection */ divOfComment =
                document.createElement('div');
            divOfComment.appendChild(nameOfCommenter);
            divOfComment.appendChild(dateOfComment);
            divOfComment.appendChild(actualComment);

            //Styles the div
            divOfComment.style.border='3px solid #b31b1b';
            divOfComment.style.margin='15px 0 15px';
            divOfComment.style.padding='10px';

            commentContainer.appendChild(divOfComment);
        }
    });
}
/**
 * Updates the comments based on the maximum amount that
 * should be displayed and also sorts the comments based on the value of the
 * sort-comments select.
 */
function updateComments() {
    const maxNumberDropdown =
        document.getElementById('max-numbers').value;
    // Each select value is stored as a JSON, to allow for more than one value
    // to be used, the code below just parses the sort-comments select value and gets
    // the two values of the JSON
    const entityProperty = 
        JSON.parse(document.getElementById('sort-comments'
            ).value)["entityProperty"];
    const sortDirection = 
        JSON.parse(document.getElementById('sort-comments'
            ).value)["sortDirection"];
    queryString = '/data?max-numbers='+maxNumberDropdown+'?sort-direction='+
        sortDirection+'?entity-property='+entityProperty;
    // Fetches comments again
    populateComments();
}

/**
 * Deletes all the comments from the servlet.
 */
function deleteComments() {
  const deleteInit = { method: 'POST' };
  const deleteRequest = new Request('/delete-data', deleteInit);
  fetch(deleteRequest).then(populateComments());
}
