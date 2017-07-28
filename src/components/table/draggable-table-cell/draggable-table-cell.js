import React from 'react';
import PropTypes from 'prop-types';
import WithDrag from './../../drag-and-drop/with-drag';
import Icon from './../../icon';
import TableCell from './../table-cell';

const iconHTML = (
  <div>
    <Icon
      className='draggable-table-cell__icon'
      type='drag_vertical'
    />
  </div>
);

/**
 * Creates a draggable table cell using WithDrag.
 *
 * @constructor
 */
const DraggableTableCell = (props) => {
  let icon;

  if (props.customDragLayer) {
    icon = iconHTML;
  } else {
    icon = (
      <WithDrag
        identifier={ props.identifier }
        draggableProps={ props.rowProps }
        draggableNode={ props.row }
      >
        { iconHTML }
      </WithDrag>
    );
  }

  return (
    <TableCell className='draggable-table-cell'>
      { icon }
    </TableCell>
  );
};

DraggableTableCell.propTypes = {
  identifier: PropTypes.string // used to associate WithDrags and WithDrops
};

export default DraggableTableCell;
