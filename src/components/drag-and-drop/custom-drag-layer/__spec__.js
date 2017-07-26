import React from 'react';
import { UndecoratedCustomDragLayer, collect } from './custom-drag-layer';
import { mount } from 'enzyme';
import DraggableContext from './../draggable-context';

describe('CustomDragLayer', () => {
  let wrapper, instance, child;

  let draggableNode = {
    getBoundingClientRect: () => ( {width: 10} )
  }

  const DummyComponent = () => {
    return (
      <div>Test</div>
    )
  }

  describe('when the component is being dragged and there is a currentOffset and draggable node', () => {
    beforeEach(() => {
      wrapper = mount(
        <DraggableContext onDrag={() => {}}>
          <UndecoratedCustomDragLayer
            className='custom-class-name'
            currentOffset={{x: 1, y: 2}}
            draggableProps={{foo: 'bar'}}
            draggableNode={draggableNode}
            isDragging={true}
          >
            <DummyComponent />
          </UndecoratedCustomDragLayer>
        </DraggableContext>
      );
      instance = wrapper.find(UndecoratedCustomDragLayer);
      child = instance.find(DummyComponent)
    });

    it('renders a clone of the child with the props passed through', () => {
      const childProps = child.props();
      expect(childProps.customDragLayer).toBeTruthy();
      expect(childProps.foo).toEqual('bar');
      expect(childProps.draggableNode).toEqual(draggableNode);
    });

    it('renders the custom classname', () => {
      expect(instance.find('.custom-class-name').length).toEqual(1);
      expect(instance.find('.custom-drag-layer').length).toEqual(1);
    });

    it('transforms the component position by the currentOffset', () => {
      const container = instance.find('.custom-drag-layer__container');
      expect(container.length).toEqual(1);
      const style = container.get(0).style
      expect(style.webkitTransform).toEqual('translate(1px, 2px)');
      expect(style.width).toEqual('10px');
    })
  });

  describe('when the component is being dragged but there is no currentOffset', () => {
    beforeEach(() => {
      wrapper = mount(
        <DraggableContext onDrag={() => {}}>
          <UndecoratedCustomDragLayer
            className='custom-class-name'
            draggableProps={{foo: 'bar'}}
            draggableNode={draggableNode}
            isDragging={true}
          >
            <DummyComponent />
          </UndecoratedCustomDragLayer>
        </DraggableContext>
      );
      instance = wrapper.find(UndecoratedCustomDragLayer);
    });

    it('sets container to display: none', () => {
      const container = instance.find('.custom-drag-layer__container');
      expect(container.length).toEqual(1);
      const style = container.get(0).style;
      expect(style.display).toEqual('none');
    });
  });

  describe('when the component is being dragged but there is no draggableNode', () => {
    beforeEach(() => {
      wrapper = mount(
        <DraggableContext onDrag={() => {}}>
          <UndecoratedCustomDragLayer
            className='custom-class-name'
            currentOffset={{x: 1, y: 2}}
            draggableProps={{foo: 'bar'}}
            isDragging={true}
          >
            <DummyComponent />
          </UndecoratedCustomDragLayer>
        </DraggableContext>
      );
      instance = wrapper.find(UndecoratedCustomDragLayer);
    });

    it('does not set the width style', () => {
      const container = instance.find('.custom-drag-layer__container');
      expect(container.length).toEqual(1);
      const style = container.get(0).style;
      expect(style.webkitTransform).toEqual('translate(1px, 2px)');
      expect(style.width).toEqual('');
    });
  });

  describe('when the component is not being dragged', () => {
    beforeEach(() => {
      wrapper = mount(
        <DraggableContext onDrag={() => {}}>
          <UndecoratedCustomDragLayer
            className='custom-class-name'
            draggableProps={{foo: 'bar'}}
            draggableNode={draggableNode}
            isDragging={false}
          >
            <DummyComponent />
          </UndecoratedCustomDragLayer>
        </DraggableContext>
      );
      instance = wrapper.find(UndecoratedCustomDragLayer);
      child = instance.find(DummyComponent);
    });

    it('does not render the child component', () => {
      expect(child.length).toEqual(0);
    });
  });

  describe('collect', () => {
    let monitor, item;

    describe('when there is an item', () => {
      beforeEach(() => {
        item = {
          draggableProps: 'draggableProps',
          draggableNode: 'draggableNode'
        }

        monitor = {
          getItem: () => item,
          getSourceClientOffset: () => 'currentOffset',
          isDragging: () => true
        }
      });

      it('returns the draggableProps and draggableNode', () => {
        expect(collect(monitor)).toEqual(
          {
            currentOffset: 'currentOffset',
            item,
            draggableProps: 'draggableProps',
            draggableNode: 'draggableNode',
            isDragging: true
          }
        )
      });
    });

    describe('when there is not an item', () => {
      beforeEach(() => {
        monitor = {
          getItem: () => null,
          getSourceClientOffset: () => 'currentOffset',
          isDragging: () => true
        }
      })
      it('returns an object without the draggableProps and draggableNode defined', () => {
        expect(collect(monitor)).toEqual(
          {
            currentOffset: 'currentOffset',
            item: null,
            draggableProps: null,
            draggableNode: null,
            isDragging: true
          }
        )
      })
    })
  });
});
