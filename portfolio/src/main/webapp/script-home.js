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
}

/* 
 * A function for a button click, changes the button to header, Who Am I, 
 * by gathering data from servlet.
 */
function fetchIntro() {
  fetch('/data').then((response) => response.text()).then((introHeading) => {
      document.getElementById('intro-heading').innerText = introHeading;
      document.getElementById('heading-button').style.display = 'none';
  });
}
