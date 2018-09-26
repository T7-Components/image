// Dependencies.
import React from 'react'
import ReactDOM from 'react-dom'

// CSS.
import './sanitize.css'
import './demo.css'

// UI components.
// import Image from './'
import Image from './'

// Define class.
class Demo extends React.Component {
  // Render method.
  render () {
    // Expose UI.
    return (
      <React.Fragment>

        <h1>
          @t7/image
        </h1>

        <p>
          Scroll waaay down…
        </p>

        <hr />

        <div className='keep-scrolling'>
          Keep scrolling down…
        </div>

        <hr />

        <p>
          The following image will load approximately 5 seconds after scrolling 50% into view.
        </p>

        <p>
          <Image
            alt='IMAGE 1'
            width='800'
            height='200'

            // Source.
            src='https://sloow.me/5000/placehold.it/800x200/69c/fff?text=IMAGE+1'

            // Fallback source.
            fallback='https://placehold.it/800x200/69c/fff?text=IMAGE+1+FALLBACK'

            style={{
              background: '#69c'
            }}

            // Intersection.
            rootMargin='0px 0px 0px 0px'

            // 50% viewable.
            thresholds='0.5'

            // Intersection event.
            onIntersection={(event) => {
              if (window.console) {
                window.console.log('IMAGE 1 INTERSECTION')
              }
            }}

            // Load event.
            onLoad={(event) => {
              if (window.console) {
                window.console.log('IMAGE 1 LOADED')
              }
            }}

            // Fallback load event.
            onFallback={(event) => {
              if (window.console) {
                window.console.log('IMAGE 1 FALLBACK LOADED')
              }
            }}
          />
        </p>

        <hr />

        <p>
          The following image will fail approximately 5 seconds after scrolling 50% into view.
        </p>

        <p>
          There may then be a slight delay, as the fallback image is fetched form the server.
        </p>

        <p>
          <Image
            alt='IMAGE 2'
            width='800'
            height='200'

            src='https://sloow.me/5000+404/placehold.it/800x200/393/fff?text=IMAGE+2'

            // Fallback source.
            fallback='https://placehold.it/800x200/393/fff?text=IMAGE+2+FALLBACK'

            style={{
              background: '#393'
            }}

            // Intersection.
            rootMargin='0px 0px 0px 0px'

            // 50% viewable.
            thresholds='0.5'

            // Intersection event.
            onIntersection={(event) => {
              if (window.console) {
                window.console.log('IMAGE 2 INTERSECTION')
              }
            }}

            // Load event.
            onLoad={(event) => {
              if (window.console) {
                window.console.log('IMAGE 2 LOADED')
              }
            }}

            // Fallback load event.
            onFallback={(event) => {
              if (window.console) {
                window.console.log('IMAGE 2 FALLBACK LOADED')
              }
            }}
          />
        </p>

      </React.Fragment>
    )
  }
}

// Get root.
const root = document.getElementById('root')

// Render.
ReactDOM.render(<Demo />, root)
