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

        <div
          style={{
            background: '#ccc',
            height: '9999px',
            marginBottom: '20px'
          }}
        />

        <hr />

        <p>
          The following image will load approximately 5 seconds after scrolling into view.
        </p>

        <p>
          <Image
            width='800'
            height='200'

            src='https://sloow.me/5000/placehold.it/800x200/69c/fff?text=LOADED+IMAGE'

            style={{
              background: '#69c'
            }}

            onLoad={(e) => {
              if (window.console) {
                window.console.log('loaded')
              }
            }}
          />
        </p>

        <hr />

        <p>
          The following image will load approximately 5 seconds after scrolling into view.
        </p>

        <p>
          <Image
            width='800'
            height='200'

            src='https://sloow.me/5000/placehold.it/800x200/393/fff?text=LOADED+IMAGE'

            style={{
              background: '#393'
            }}

            onLoad={(e) => {
              if (window.console) {
                window.console.log('loaded')
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
