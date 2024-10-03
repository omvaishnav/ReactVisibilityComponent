
# VisibilityObserver Component

`VisibilityObserver` is a React component that uses the Intersection Observer API to detect when an element becomes visible within the viewport. It can be configured to trigger an event once per item or multiple times based on a prop (`triggerOnlyOnce`).

## Features

- Trigger an event when an element is viewed.
- Support for triggering the event only once for each item.
- Support for infinite scrolling and windowing functionality.
- Customize the threshold for the intersection event.

## Installation

This component doesn't rely on any external dependencies other than React and PropTypes. You can install those dependencies if you don't already have them:

```bash
npm install react prop-types
```

## Usage

```javascript
import VisibilityObserver from './VisibilityObserver';

function ProductListing({ products }) {
  const handleItemVisible = (entry) => {
    const itemId = entry.target.getAttribute('data-item-id');
    console.log(`Item viewed: ${itemId}`);
    // Custom logic when an item is viewed
  };

  return (
    <div>
      {products.map(product => (
        <VisibilityObserver
          key={product.id}
          itemId={product.id}
          onVisible={handleItemVisible}
          triggerOnlyOnce={true}  // Set to false if you want multiple triggers
          threshold={0.1}
        >
          <ProductCard product={product} />
        </VisibilityObserver>
      ))}
    </div>
  );
}
```

### Props

| Prop             | Type       | Required | Default Value | Description                                                                                                                                                      |
|------------------|------------|----------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `onVisible`      | `function` | Yes      | `undefined`   | A callback function triggered when the observed element becomes visible. The `entry` object from the Intersection Observer API is passed to this function.       |
| `threshold`      | `number`   | No       | `0.1`         | A threshold value between 0 and 1 to trigger the `onVisible` event based on the percentage of the element that is visible.                                         |
| `children`       | `node`     | Yes      | `undefined`   | The content to observe (usually an item component).                                                                                                               |
| `triggerOnlyOnce`| `boolean`  | No       | `false`       | Determines whether the event should trigger only once per item. If set to `true`, the event will fire only once for each item. If `false`, it can trigger multiple times. |
| `style`          | `object`   | No       | `{}`          | Custom CSS styles for the observer container.                                                                                                                     |
| `className`      | `string`   | No       | `''`          | Custom CSS class names for the observer container.                                                                                                                |
| `itemId`         | `string`   | Yes      | `undefined`   | A unique identifier for each observed item. This is crucial for tracking which items have already been viewed when `triggerOnlyOnce` is true.                      |

### Example: Infinite Scroll Use Case

If you're using this component in an infinite scroll scenario, the global `Set` used inside the component will ensure that events are fired only once for items that come back into view when `triggerOnlyOnce` is `true`.

```javascript
<VisibilityObserver
  itemId={item.id}
  onVisible={handleItemVisible}
  triggerOnlyOnce={true}
  threshold={0.2}
>
  <ProductItem product={item} />
</VisibilityObserver>
```

### Global Set for Viewed Items

To ensure the event triggers only once when `triggerOnlyOnce` is `true`, the component uses a global `Set` (`viewedItemsSet`) to track which items have already been viewed. This global `Set` persists across component re-renders, making it suitable for infinite scrolling.

### Handling Multiple Triggers

When `triggerOnlyOnce` is `false`, the component does not rely on the `Set`, and the `onVisible` callback will be fired every time the item becomes visible.

## Development

To develop and test this component:

1. Clone the repository.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```

## License

This component is open-source and free to use under the MIT License.
