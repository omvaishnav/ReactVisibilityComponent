import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  componentWillUnmount() {
    this.cleanupObserver();
  }

  handleIntersection = (entries) => {
    const _props = this.props;
    const obserer = this.observer;
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (entry.intersectionRatio <= 1) {
          _props.onVisible(entry);
        }
        if (_props.triggerOnlyOnce) {
          obserer.unobserve(entry.target);
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
};

VisibilityObserver.defaultProps = {
  threshold: 0.1,
  triggerOnlyOnce: false,
};

export default VisibilityObserver;
