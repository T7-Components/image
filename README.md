# @t7/image

```
npm install @t7/image --save-dev
```

The **Image** component display an image when it is visible or nearly visible.

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

`<Image>` uses the `width` and `height` properties to immediate receive layout,
as if the image source had been loaded. This prevents unnecessary layout
recalculations by the browser and allows the image to be resized in CSS with
proportional aspect ratios.

The following examples are equivalent:

```jsx
<Image
  width="800"
  height="450"
  style={{width:'50%',height:'auto',background:'#393'}}
/>
```

```html
<img
  width="800"
  height="450"
  style="width:50%;height:auto;background:#393"
  src="data:image/svg+xml,%3Csvg
    xmlns='http://www.w3.org/2000/svg'
    width='800'
    height='450'
  %3E%3C/svg%3E"
/>
```

`<Image>` uses the `rootMargin` and `thresholds` properties along with the
[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
to load its source only as it comes into view.

For instance, if you wanted the image to be loaded only after it passed the 50%
mark, you could set the `thresholds` property to `0.5`.

Once visible or near to being visible, `<Image>` loads the `placeholder` and
`src` images simultaneously. If the `placeholder` image is loaded before the
`src`, then the placeholder is made visible as a background image. Once the
`src` is loaded, then it is immediately displayed and the `placeholder`
background image is removed. If the `src` cannot be loaded, then the `fallback`
image is displayed instead.

```jsx
<Image
  alt="a test image: 400x225"
  src="https://placehold.it/400x225/393/fff?text=TEST+IMAGE"
  placeholder="https://placehold.it/400x225?text=LOADING"
  fallback="https://placehold.it/400x225/f60/fff?text=FALLBACK"
  width="800"
  height="450"
  rootMargin="50px 0px"
  thresholds="0.01"
/>
```

See the
[Intersection Observer options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)
for best usage of `root`, `rootMargin`,
and `thresholds`.

---

### Image Events

The **Image** component allows you to hook into various events during the
loading process.

```jsx
<Image
  alt="a test image: 400x225"
  src="https://placehold.it/400x225"
  onIntersection={event => console.log('image is intersected, src is loading')}
  onLoad={event => console.log('src is loaded')}
  onFallback={event => console.log('fallback is loaded')}
/>
```

#### onIntersection

The **onIntersection** listener is dispatched when the `<Image>` is visible or
is near to being visible for the first time.

#### onLoad

The **onLoad** listener is dispatched when the `src` image has loaded.

#### onFallback

The **onFallback** listener is dispatched when the `fallback` image has loaded.

---

For complete browser support, please include an intersection-observer polyfill:

```sh
npm install intersection-observer
```

---

### More Examples

An image that takes at least 5 seconds to load:

```jsx
<Image
  alt="a test image: 400x225"
  src="https://sloow.me/5000/placehold.it/400x225/393/fff?text=loaded+image"
  placeholder="https://placehold.it/400x225?text=placeholder+image"
  fallback="https://placehold.it/400x225/f60/fff?text=fallback+image"
  width="400"
  height="225"
/>
```

An image that fails to load after at least 3 seconds:

```jsx
<Image
  alt="a test image: 400x225"
  src="https://sloow.me/3000+404/placehold.it/400x225/393/fff?text=loaded+image"
  placeholder="https://placehold.it/400x225?text=placeholder+image"
  fallback="https://placehold.it/400x225/f60/fff?text=fallback+image"
  width="400"
  height="225"
/>
```
