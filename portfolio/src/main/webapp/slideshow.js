/**
 * Types of SlideShow modes.
 * @enum {string}
 */
const Mode = {
  /** Mode where slides must be adjusted manually */
  MANUAL: 'manual',
  /** Mode where slides are adjusted automatically */
  AUTOMATIC: 'automatic',
};

/** The SlideShow class maintains the slideshows on the website. By 
  * default, the SlideShow must be manually adjusted.
  */
class SlideShow {
  /**
   * Operates on an instance of SlideShow.
   * @param {?HTMLCollection} collectionOfSlides Holds a collection of slides
   *     from the webpage, defined by a class tag.
   */
  constructor(collectionOfSlides) {
    /** @private {?HTMLCollection} */
    this.slides_ = collectionOfSlides;

    /** @private {number} represents the index of the current slide. */
    this.slideIndex_ = 0;

    /** @private @const {number} 4 seconds in miliseconds. */
    this.TIME_BEFORE_SWITCH_ = 4000;

    /** @private @const {number} represents one increment of a slide. */
    this.SINGLE_INCREMENT_ = 1;

    /** @private {string} represents the current mode of SlideShow. */
    this.mode_ = Mode.MANUAL;

    this.displayInitialSlide_();
  }

  /** 
   * Displays the first slide and
   * hides all the other slides on the page.
   * @private
   */
  displayInitialSlide_() {
    let /** number */ currentIndex;
    this.slides_[this.slideIndex_].style.display = 'block';
    for (currentIndex = 1; currentIndex < this.slides_.length; currentIndex++) {
      this.slides_[currentIndex].style.display = 'none';  
    }
  }

  /**
   * Changes the slide displayed on the website to be adjustIndex
   * ahead/behind current slide. Only works for SlideShows that 
   * can only be adjusted manually. The slide previously
   * displayed has it's display changed to none, hiding it,
   * and the slide to be shown as it's display changed to 'block'
   * @param {number} adjustIndex How much the SlideShow should be
   *     adjusted.
   */
  adjustSlideManual(adjustIndex) {
    // This if is to prevent someone from both manually
    // trying to adjust the slides with it already being
    // automatic. 
    if(this.mode_ == Mode.MANUAL) {
      this.slides_[this.slideIndex_].style.display = 'none';
      this.slideIndex_ += adjustIndex;
      // [((a%b) + b) % b] guarantees a 
      // is always [0, b) even when a < 0.
      this.slideIndex_ = ((this.slideIndex_ % this.slides_.length) +
          this.slides_.length) % this.slides_.length;
      this.slides_[this.slideIndex_].style.display = 'block';
    }
  }

  /** 
   * This method automatically adjusts the slides by one by 
   * cadence seconds.
   * @param {number} cadence dictates how many seconds before
   *     slide automatically adjusts.
   * @private
   */
  adjustSlidesAuto_(cadence) {
    this.slides_[this.slideIndex_].style.display = 'none';
    this.slideIndex_ += this.SINGLE_INCREMENT_;
    this.slideIndex_ %= this.slides_.length;
    this.slides_[this.slideIndex_].style.display = 'block';
    setTimeout(() => {
      // If the mode changes while this timeout is inflight,
      // the method terminates and is not recalled.
      if (this.mode_ != Mode.AUTOMATIC) return;
      this.adjustSlidesAuto_(cadence);
    }, cadence);
  }

  /**
   * This method changes the mode of the SlideShow.
   * @param {string} mode which mode to change to.
   * @private
   */
  setMode_(mode) {
    const /** string */ old_mode = this.mode_;
    this.mode_ = mode;
    // This if condition prevents adjustSlidesAuto from being called
    // multiple times. If a slideshow is set to automatic when it
    // previously already was, adjustSlidesAuto isn't recalled.
    if (this.mode_ != old_mode && this.mode_ == Mode.AUTOMATIC) {
      this.adjustSlidesAuto_(this.TIME_BEFORE_SWITCH_);
    }
  }

  /**
   * Changes the slides to be adjusted automatically.
   */
  setToAutomaticallyChangeSlides() {
    this.setMode_(Mode.AUTOMATIC);
  }

  /**
   * Changes the slides to be adjusted manually.
   */
  setToManuallyChangeSlides() {
    this.setMode_(Mode.MANUAL);
  }

}
