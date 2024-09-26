import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VisibilityObserver extends Component {
  constructor(props) {
    super(props);
    this.observer = null;
    this.elementRef = null;
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(this.handleIntersection,{
        threshold: this.props.threshold
    });

    if (this.elementRef) {
      this.observer.observe(this.elementRef);
    }
  }

  componentWillUnmount() {
      this.cleanupObserver();
  }

  handleIntersection = (entries) => {
    const _props = this.props
    entries.forEach(function(entry){
        if (entry.isIntersecting) {
            if (entry.intersectionRatio <= 1) {
              _props.onVisible(entry);
            }
        }
   });
  }

  cleanupObserver() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
  }

  setElementRef = (element) => {
    this.elementRef = element;
  }

  render() {
    return (
      <div ref={this.setElementRef}>
        {this.props.children}
      </div>
    );
  }
}

VisibilityObserver.propTypes = {
  onVisible: PropTypes.func.isRequired,
  threshold: PropTypes.number,
  children: PropTypes.node.isRequired,
};

VisibilityObserver.defaultProps = {
  threshold: 0.1,
};

export default VisibilityObserver;