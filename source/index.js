// Dependencies.
import React from 'react'
import PropTypes from 'prop-types'

// Utility methods.
import { bind } from '@t7/utils'

/**
 * The **Image** component displays an
 * image when it is nearly/fully visible.
 *
 * @typedef {Object} Image
 */
class Image extends React.Component {
  constructor (props) {
    // Pass `props` into scope.
    super(props)

    // Bind context.
    bind(this)

    /**
     * Object to hold intersection observers.
     *
     * @member {Image} intersectionObservers
    */
    this.intersectionObservers = {}

    /**
     * The primary image.
     *
     * @member {Image} image
    */
    this.image = null

    /**
     * The preloader image.
     *
     * @member {Image} preloader.
    */
    this.preloader = document.createElement('img')

    /**
     * Styles temporarily overridden on the image.
     *
     * @member {Object} preservedStyle
    */
    this.preservedStyle = {}
  }

  // Fired after mount.
  componentDidMount () {
    // Class.
    const {
      image,

      // Events.
      addEventListeners,
      getIntersectionObserver,

      // Props.
      props: {
        rootMargin,
        thresholds
      }
    } = this

    // Prepare the intersection observer listener for this instance.
    const intersectionObserver =
      getIntersectionObserver(rootMargin, thresholds)

    // Add observer.
    intersectionObserver.observe(image)

    // Add listeners for this instance.
    addEventListeners()
  }

  // Fired as component is removed.
  componentWillUnmount () {
    // Class.
    const {
      image,

      // Events.
      getIntersectionObserver,
      removeEventListeners,

      // Props.
      props: {
        rootMargin,
        thresholds
      }
    } = this

    // Remove the intersection observer listener for this instance.
    const intersectionObserver =
      getIntersectionObserver(rootMargin, thresholds)

    // Remove observer.
    intersectionObserver.unobserve(image)

    // Remove listeners from this instance.
    removeEventListeners()
  }

  // Fired after component updates.
  componentDidUpdate (prevProps = {}) {
    // Previous props.
    const {
      rootMargin: prevRootMargin,
      src: prevSrc,
      thresholds: prevThresholds
    } = prevProps

    // Class.
    const {
      image,
      preloader,

      // Events.
      addEventListeners,
      getIntersectionObserver,
      removeEventListeners,

      // Props.
      props: {
        rootMargin,
        src,
        thresholds
      }
    } = this

    // Conditionally update the event listeners.
    if (src !== prevSrc) {
      removeEventListeners()

      // Set preloader source.
      preloader.src = src

      addEventListeners()
    }

    // Conditionally update the intersection observers.
    if (
      rootMargin !== prevRootMargin ||
      thresholds !== prevThresholds
    ) {
      const prevIntersectionObserver =
        getIntersectionObserver(prevRootMargin, prevThresholds)

      const intersectionObserver =
        getIntersectionObserver(rootMargin, thresholds)

      prevIntersectionObserver.unobserve(image)
      intersectionObserver.observe(image)
    }
  }

  /**
   * Adds listeners to preloader.
   */
  addEventListeners () {
    // Class.
    const {
      preloader,

      // Events.
      onPreloaderLoad,
      onPreloaderError
    } = this

    preloader.addEventListener('load', onPreloaderLoad)
    preloader.addEventListener('error', onPreloaderError)
  }

  /**
   * Removes listeners from image and preloader.
   */
  removeEventListeners () {
    // Class.
    const {
      image,
      preloader,

      // Events.
      onImageLoad,
      onPreloaderLoad,
      onPreloaderError
    } = this

    image.removeEventListener('load', onImageLoad)
    preloader.removeEventListener('load', onPreloaderLoad)
    preloader.removeEventListener('error', onPreloaderError)
  }

  /**
   * Runs when the preloader image is loaded.
   */
  onPreloaderLoad () {
    // Class.
    const {
      image,
      preloader,

      // Events.
      onImageLoad
    } = this

    // Add the load listener on the image.
    image.addEventListener('load', onImageLoad)

    // Update source.
    image.src = preloader.src
  }

  /**
   * Runs when the preloader image cannot load.
   */
  onPreloaderError () {
    // Class.
    const {
      image,

      // Props.
      props: { fallback }
    } = this

    if (fallback) {
      image.src = fallback
    }
  }

  /**
   * Runs when image is loaded.
   */
  onImageLoad (event = {}) {
    // Class.
    const {
      fallback,
      image,
      preservedStyle,

      // Props.
      props: {
        onFallback,
        onLoad,
        src
      }
    } = this

    // Remove placeholder styles.
    image.style.backgroundImage =
      preservedStyle.backgroundImage

    // Conditionally run load event.
    if (image.src === src) {
      onLoad(event)
    }

    // Conditionally run fallback event.
    if (image.src === fallback) {
      onFallback({
        type: 'fallback',
        target: image
      })
    }
  }

  /**
   * Runs when image intersects viewable area.
   */
  onIntersection () {
    // Class.
    const {
      image,
      preloader,
      preservedStyle: p,

      // Props.
      props: {
        onIntersection,
        placeholder,
        src
      }
    } = this

    // Conditionally update placeholder styles.
    p.backgroundImage =
      image.style.backgroundImage

    if (placeholder) {
      image.style.backgroundImage = (
        p.backgroundImage
          ? `url(${placeholder}),${p.backgroundImage}`
          : `url(${placeholder})`
      )
    }

    // Conditionally update preloader image source.
    if (src) {
      preloader.src = src
    }

    // Run intersection event.
    onIntersection({
      type: 'intersection',
      target: image
    })
  }

  /**
   * Return an inline SVG with a set width and height as a data source.
   *
   * The width of the image.
   * @param {Number|String} width
   *
   * The height of the image.
   * @param {Number|String} height
   *
   * The inline SVG as a data source.
   * @return {String}
   */
  getPreloaderSrc (width, height) {
    const w = Number(width) || 0
    const h = Number(height) || 0

    // Expose SVG.
    return (
      `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"%3E%3C/svg%3E`
    )
  }

  /**
   * Return a cached intersection observer.
   *
   * The rootMargin being used.
   * @param {Number|String} rootMargin
   *
   * The thresholds being used.
   * @param {Array|Number|String} thresholds
   *
   * The intersection observer.
   * @return {String}
   *
   * See {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API Intersection Observer API}
   */
  getIntersectionObserver (rootMargin, thresholds) {
    // Get cache.
    const {
      onIntersection,
      intersectionObservers: o
    } = this

    // To string.
    const strRoot =
      String(rootMargin)

    // Set in conditional.
    let list

    // Array?
    if (thresholds instanceof Array) {
      list = thresholds

      // Assume number/string.
    } else {
      list = (
        String(thresholds)
          .trim()
          .split(/\s+/)
      )
    }

    // Convert to numeric array.
    const normalizedThresholds =
      list.map((item) => {
        return Number(item) || 0
      })

    // Convert thresholds array into string.
    const strThresholds =
      normalizedThresholds.join(' ')

    if (!(strRoot in o)) {
      o[strRoot] = {}
    }

    // Does observer exist?
    if (!o[strRoot][strThresholds]) {
      // Callback.
      const f = (entries = []) => {
        // Loop through.
        entries.forEach((entry = {}) => {
          // Peel apart.
          const {
            intersectionRatio,
            target
          } = entry

          // Valid number?
          if (intersectionRatio > 0) {
            // Remove observer.
            o[strRoot][strThresholds].unobserve(target)

            // Fire event.
            onIntersection()
          }
        })
      }

      // Options.
      const options = {
        rootMargin: strRoot,
        thresholds: normalizedThresholds
      }

      // Create observer.
      const observer =
        new window.IntersectionObserver(f, options)

      // Assign.
      o[strRoot][strThresholds] = observer
    }

    // Expose observer.
    return (
      o[strRoot][strThresholds]
    )
  }

  /**
   * Renders image, placeholder, and fallback.
   *
   * @return {Image} - The image element.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img Image}.
   */
  render () {
    // Class.
    const {
      // Events.
      getPreloaderSrc,

      // Props.
      props: {
        alt,
        height,
        style,
        width
      }
    } = this

    const src =
      getPreloaderSrc(width, height)

    // Props for image.
    const propsForImage = {
      alt,
      src,
      style,

      // Assign ref.
      ref: (el) => {
        this.image = el
      }
    }

    // Expose UI.
    return (
      <img
        {...propsForImage}
      />
    )
  }
}

// Validation.
Image.propTypes = {
  /**
   * The image URL.
   */
  src: PropTypes.string,

  /**
   * The alternative text describing the image.
   */
  alt: PropTypes.string,

  /**
   * The placeholder image URL.
   */
  placeholder: PropTypes.string,

  /**
   * The fallback image URL.
   */
  fallback: PropTypes.string,

  /**
   * The intrinsic width of the image in pixels.
   */
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /**
   * The intrinsic height of the image in pixels.
   */
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /**
   * The amount to grow or shrink each side of
   * the document when computing intersections.
   */
  rootMargin: PropTypes.string,

  /**
   * Inline style object, to force initial
   * dimensions and proportions for image.
   */
  style: PropTypes.object,

  /**
   * A single number or array of numbers, indicating
   * at what percentage of an image's visibility its
   * observer's callback should be executed.
   */
  thresholds: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    ),
    PropTypes.string,
    PropTypes.number
  ]),

  /**
   * Function that runs when image
   * intersects with viewable area.
   */
  onIntersection: PropTypes.func,

  /**
   * Function that runs
   * when image is loaded.
   */
  onLoad: PropTypes.func,

  /**
   * Function that runs when
   * fallback image is loaded.
   */
  onFallback: PropTypes.func
}

// Defaults.
Image.defaultProps = {
  alt: '',
  width: 0,
  height: 0,
  rootMargin: '0px 0px 0px 0px',
  thresholds: 0.01,

  // Events.
  onFallback: () => {},
  onIntersection: () => {},
  onLoad: () => {}
}

// Export.
export default Image
