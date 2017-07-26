import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import classNames from 'classnames';

const collect = (monitor) => {
  const item = monitor.getItem();
  return {
    currentOffset: monitor.getSourceClientOffset(),
    item,
    draggableProps: item ? item.draggableProps : null,
    draggableNode: item ? item.draggableNode : null,
    isDragging: monitor.isDragging()
  };
};

class CustomDragLayer extends React.Component {
  static propTypes = {
    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Children elements
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node.isRequired,

    /**
     * The dom node being dragged.
     *
     * @property draggableNode
     * @type {Node|Object}
     */
    draggableNode: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node
    ]),

    /**
     * The properties of the item being dragged.
     *
     * @property draggableProps
     * @type {Object}
     */
    draggableProps: PropTypes.object,

    /**
     * Determine if the component is being dragged or not.
     *
     * @property isDragging
     * @type {Boolean}
     */
    isDragging: PropTypes.bool.isRequired
  }

  getItemStyles(props) {
    const { currentOffset } = props;
    if (!currentOffset) { return { display: 'none' }; }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
      width: props.draggableNode ? props.draggableNode.getBoundingClientRect().width : null
    };
  }

  get classes() {
    return (
      classNames('custom-drag-layer', this.props.className)
    );
  }

  render() {
    if (!this.props.isDragging) { return null; }
    return (
      <div className={ this.classes }>
        <div className='custom-drag-layer__container' style={ this.getItemStyles(this.props) }>
          {
            React.cloneElement(
              this.props.children,
              {
                ...this.props.draggableProps,
                draggableNode: this.props.draggableNode,
                customDragLayer: true
              }
            )
          }
        </div>
      </div>
    );
  }
}

const UndecoratedCustomDragLayer = CustomDragLayer;
export { UndecoratedCustomDragLayer, collect };
export default DragLayer(collect)(CustomDragLayer);
