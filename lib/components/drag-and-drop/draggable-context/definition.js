'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _component = require('./../../../../demo/actions/component');

var _component2 = _interopRequireDefault(_component);

var _definition = require('./../../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _definition3 = require('./../with-drag/definition');

var _definition4 = _interopRequireDefault(_definition3);

var _definition5 = require('./../with-drop/definition');

var _definition6 = _interopRequireDefault(_definition5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('draggable-context', _2.default, {
  associatedDefinitions: [_definition6.default, _definition4.default],

  hiddenProps: ['children', 'onDrag'],

  topLevelComponent: 'Table',

  props: ['onDrag'],

  propTypes: {
    onDrag: 'Function'
  },

  requiredProps: ['onDrag'],

  dataVariable: 'dndData',

  propValues: {
    tbody: false,
    children: '<thead>\n    <TableRow as="header">\n      <TableHeader />\n      <TableHeader>Country</TableHeader>\n    </TableRow>\n  </thead>\n  <DraggableContext onDrag={ updateDndData }>\n    <tbody>\n      { buildRows() }\n    </tbody>\n  </DraggableContext>'
  },

  js: 'function buildRows() {\n  let rows = [];\n\n  dndData.forEach((row, index) => {\n    rows.push(\n      <TableRow key={ row.get(\'id\') } uniqueID={ row.get(\'id\') } index={ index }>\n        <TableCell>{ row.get(\'name\') }</TableCell>\n      </TableRow>\n    );\n  });\n\n  return rows;\n}',

  propDescriptions: {
    onDrag: 'Callback function for when a draggable item is moved'
  },

  relatedComponentsNotes: '\nAlthough the `Table` component has drag and drop enabled already, any combination of components can be made draggable through the use of the `WithDrag` and `WithDrop` components:\n\n```\n<DraggableContext onDrag={ onItemMoved }>\n  <ol>\n    {\n      items.map((item, index) => {\n        return (\n          <WithDrop index={ index }>\n            <li>\n              <WithDrag><span>{ item.content }</span></WithDrag>\n            </li>\n          </WithDrop>\n        );\n      })\n    }\n  </ol>\n</DraggableContext>\n```\n'

}); // definition.js
exports.default = definition;