import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Global Set to store viewed items when triggerOnlyOnce is true
const viewedItemsSet = new Set();

class VisibilityObserver extends Component {
  constructor(props) {
    super(props);
    this.observer = null;
    this.elementRef = null;
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.props.threshold,
    });

    if (this.elementRef) {
      this.observer.observe(this.elementRef);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemId !== this.props.itemId && this.elementRef) {
      this.observer.observe(this.elementRef);
    }
  }

  componentWillUnmount() {
    this.cleanupObserver();
  }

  handleIntersection = (entries) => {
    const { onVisible, triggerOnlyOnce } = this.props;
    const observer = this.observer;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const itemId = entry.target.getAttribute('data-item-id');  // Retrieve the unique itemId

        if (triggerOnlyOnce) {
          // Check if the item has already been viewed
          if (!viewedItemsSet.has(itemId)) {
            // Add the item to the Set and trigger onVisible
            viewedItemsSet.add(itemId);  // Persist across component re-renders
            onVisible(entry);  // Trigger the "item viewed" event
            console.log(`Item viewed and added to global Set: ${itemId}`);
          }
          observer.unobserve(entry.target);  // Unobserve after first trigger if triggerOnlyOnce is true
        } else {
          // Trigger onVisible multiple times when triggerOnlyOnce is false
          onVisible(entry);
          console.log(`Item viewed (multiple times allowed): ${itemId}`);
        }
      }
    });
  };

  cleanupObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  setElementRef = (element) => {
    this.elementRef = element;
  };

  render() {
    return (
      <div
        style={this.props.style}
        className={this.props.className}
        ref={this.setElementRef}
        data-item-id={this.props.itemId}  // Ensure each item has a unique ID
      >
        {this.props.children}
      </div>
    );
  }
}

VisibilityObserver.propTypes = {
  onVisible: PropTypes.func.isRequired,
  threshold: PropTypes.number,
  children: PropTypes.node.isRequired,
  triggerOnlyOnce: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  itemId: PropTypes.string.isRequired,
};

VisibilityObserver.defaultProps = {
  threshold: 0.1,
  triggerOnlyOnce: false,
};

export default VisibilityObserver;