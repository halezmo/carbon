'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../textbox/definition');

var _definition2 = _interopRequireDefault(_definition);

var _definition3 = require('./../decimal/definition');

var _definition4 = _interopRequireDefault(_definition3);

var _definition5 = require('./../dropdown-filter-ajax/definition');

var _definition6 = _interopRequireDefault(_definition5);

var _definition7 = require('./../../../demo/utils/definition');

var _definition8 = _interopRequireDefault(_definition7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition8.default('inline-inputs', _2.default, {
  description: 'Edits a set of closely related inputs that are grouped together.',
  propTypes: {
    label: 'String',
    children: 'Node',
    className: 'String',
    htmlFor: 'String'
  },
  propValues: {
    label: 'Inline Inputs'
  },
  hiddenProps: ['className', 'htmlFor'],
  propDescriptions: {
    label: 'Label applied to set of inputs',
    htmlFor: 'label for property',
    className: 'Classes applied to the inline inputs component',
    children: 'Supports all inputs as children'
  }
});

var inputProps = {
  fieldHelp: null,
  label: null,
  labelHelp: null
};

definition.addChildByDefinition(_definition2.default, inputProps);
definition.addChildByDefinition(_definition4.default, inputProps);
definition.addChildByDefinition(_definition6.default, inputProps);

exports.default = definition;