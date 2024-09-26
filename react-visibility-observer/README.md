
# react-visibility-component

A lightweight React component that detects when an element enters or leaves the viewport, using the Intersection Observer API. Perfect for lazy-loading images, triggering animations, or performing any action when an element becomes visible on the screen.

## Installation

To install the package, use npm or yarn:

```
npm install react-visibility-component
```

or

```
yarn add react-visibility-component
```

## Usage

### Basic Example

```javascript
import React from 'react';
import VisibilityObserver from 'react-visibility-component';

const handleVisible = (entry) => {
  console.log('Element is visible:', entry.target);
  // Additional logic when the element becomes visible
};

const App = () => {
  return (
    <VisibilityObserver 
      onVisible={handleVisible}
      threshold= {0.1} // Trigger when 10% of the element is visible
    >
      <div style={{ height: '200px', backgroundColor: 'lightblue' }}>
        This content will trigger the onVisible callback when it enters the viewport.
      </div>
    </VisibilityObserver>
  );
};

export default App;
```

### Props

- **`onVisible`**: *(function)* - A callback function that gets called when the element enters the viewport. The function receives the `IntersectionObserverEntry` as an argument.

- **`threshold`**: *(number or array of numbers)* - A single number or an array of numbers indicating at what percentage of the target's visibility the observer's callback should be executed. A value of `0.1` means the callback will be triggered when 10% of the target is visible.


## License

This project is licensed under the MIT License.

