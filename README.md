# @t7/image

The `<Image>` component displays an image when it is visible or nearly visible.

```
npm install @t7/image --save-dev
```

For complete browser support, please include a `window.IntersectionObserver` polyfill:

```
npm install intersection-observer --save
```

---

View on NPM:

[https://www.npmjs.com/package/@t7/image](https://www.npmjs.com/package/@t7/image)

---

Demo page:

[https://t7-components.github.io/image/build/](https://t7-components.github.io/image/build/)

---

Test coverage:

[https://t7-components.github.io/image/coverage/lcov-report/](https://t7-components.github.io/image/coverage/lcov-report/)

---

## Image Props

`<Image>` uses `width` and `height` props to force an immediate layout, as if the image source had already been loaded. This prevents unnecessary recalculations by the browser and allows the image to be resized via CSS with proportional aspect ratios.

It causes an encoded, inline SVG to be generated, which allows for a solid color to be displayed while the image is still processing. This prevents unintended rendering of `alt` text or the display of a browser's default "broken image" icon.

Passing these props yields the following markup output.

```jsx
<Image
  width="800"
  height="450"
  style={{
    background: '#393',
    width: '50%',
    height: 'auto'
  }}
/>
```

```html
<img
  width="800"
  height="450"
  style="
    background: #393;
    width: 50%;
    height: auto;
  "
  src="data:image/svg+xml,%3Csvg
    xmlns='http://www.w3.org/2000/svg'
    width='800'
    height='450'
  %3E%3C/svg%3E"
/>
```

`<Image>` uses the `rootMargin` and `thresholds` props along with the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to load its source only as it comes into view.

For instance, if you wanted the image to be loaded only after it passed the `50%` mark, you could set the `thresholds` prop to `0.5`.

Once visible, `<Image>` loads the `placeholder` and `src` images simultaneously. If the `placeholder` image is loaded before the `src`, then the placeholder is made visible as a background image. Once the `src` is loaded, then it is immediately displayed and the `placeholder` background image is removed. If the `src` cannot be loaded, then the `fallback` image is displayed instead.

```jsx
<Image
  // For accessibility.
  alt="Test image: 400x225."

  // Sources.
  src="https://placehold.it/400x225/393/fff?text=TEST+IMAGE"
  placeholder="https://placehold.it/400x225/393/fff?text=LOADING"
  fallback="https://placehold.it/400x225/f60/fff?text=FALLBACK"

  // Dimensions.
  width="800"
  height="450"

  // Intersection observer.
  rootMargin="50px 0px"
  thresholds="0.01"
/>
```

See the [Intersection Observer options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) for best usage of `rootMargin` and `thresholds`.

---

## Image Events

The `<Image>` component allows you to hook into various events during the loading process.

```jsx
<Image
  alt="A test image: 400x225."
  src="https://placehold.it/400x225"

  // Events.
  onIntersection={(event) => {
    console.log('Interseciton detected. Image loading started.')
  }}

  onLoad={(event) => {
    console.log('Image loading complete.')
  }}

  onFallback={(event) => {
    console.log('Fallback loading complete.')
  }}
/>
```

### `onIntersection`

The `onIntersection` listener is dispatched when all/part of the image is visible for the first time.

### `onLoad`

The `onLoad` listener is dispatched when the `src` file has loaded.

### `onFallback`

The `onFallback` listener is dispatched when the `fallback` file has loaded.

---

## More Examples

The following examples use the [Sloow.me](https://sloow.me/) proxy site to purposefully delay image loading.

An image that takes at least 5 seconds to load:

```jsx
<Image
  alt="Test image: 400x225."
  src="https://sloow.me/5000/placehold.it/400x225/393/fff?text=TEST+IMAGE"
  placeholder="https://placehold.it/400x225?text=PLACEHOLDER"
  fallback="https://placehold.it/400x225/f60/fff?text=FALLBACK"
  width="400"
  height="225"
/>
```

An image that fails to load after at least 3 seconds:

```jsx
<Image
  alt="Test image: 400x225."
  src="https://sloow.me/3000+404/placehold.it/400x225/393/fff?text=TEST+IMAGE"
  placeholder="https://placehold.it/400x225/393/fff?text=PLACEHOLDER"
  fallback="https://placehold.it/400x225/f60/fff?text=FALLBACK"
  width="400"
  height="225"
/>
```
