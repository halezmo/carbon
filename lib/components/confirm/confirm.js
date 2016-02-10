'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dialog = require('../dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _i18nJs = require("i18n-js");

var _i18nJs2 = _interopRequireDefault(_i18nJs);

/**
 * A Confirm widget.
 *
 * == How to use a Confirm in a component:
 *
 * In your file
 *
 *   import Confirm from 'carbon/lib/components/confirm';
 *
 * To render a Confirm:
 *
 *   <Confirm
 *      title='Are you sure?"
 *      confirmHandler={ customConfirmHandler }
 *      cancelHandler={ customCancelHandler }
 *      open={ false }
 *    This is the content message
 *   </Confirm>
 *
 * The component rendering the Confirm must pass down a prop of 'open={ true }' to open the confirm dialog.
 *
 * You need to provide a custom cancel event handler to handle a close event via the 'no' button
 *
 * You need to provide a custom confirm event handler to handle a close event via the 'yes' button
 *
 * @class Confirm
 * @constructor
 */

var Confirm = (function (_Dialog) {
  _inherits(Confirm, _Dialog);

  _createClass(Confirm, null, [{
    key: 'propTypes',
    value: {

      /**
       * A custom event handler when a confirmation takes place
       *
       * @property confirmHandler
       * @type {Function}
       */
      confirmHandler: _react2['default'].PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  function Confirm() {
    _classCallCheck(this, Confirm);

    _get(Object.getPrototypeOf(Confirm.prototype), 'constructor', this).call(this);
  }

  /**
   * Returns main classes for the component combined with
   * dialog main classes.
   *
   * @method mainClasses
   * @return {String} Main className
   */

  _createClass(Confirm, [{
    key: 'mainClasses',
    get: function get() {
      var classes = _get(Object.getPrototypeOf(Confirm.prototype), 'mainClasses', this);
      classes += ' ui-confirm';
      return classes;
    }

    /**
     * Returns classes title for the confirm, combines with dialog class names.
     *
     * @method dialogTitleClasses
     */
  }, {
    key: 'dialogTitleClasses',
    get: function get() {
      var classes = _get(Object.getPrototypeOf(Confirm.prototype), 'dialogTitleClasses', this);
      classes += ' ui-confirm__title';
      return classes;
    }

    /**
     * Returns classes for the confirm, combines with dialog class names.
     *
     * @method dialogClasses
     */
  }, {
    key: 'dialogClasses',
    get: function get() {
      var classes = _get(Object.getPrototypeOf(Confirm.prototype), 'dialogClasses', this);
      classes += ' ui-confirm__confirm';
      return classes;
    }

    /**
     * Get the yes and no buttons for the confirm dialog
     *
     * @method confirmButtons
     * @return {Object} JSX yes and no buttons
     */
  }, {
    key: 'confirmButtons',
    get: function get() {
      return _react2['default'].createElement(
        'div',
        { className: 'ui-confirm__buttons' },
        _react2['default'].createElement(
          'div',
          { className: 'ui-confirm__button ui-confirm__no' },
          _react2['default'].createElement(
            _button2['default'],
            { as: 'secondary', onClick: this.props.cancelHandler },
            cancelText()
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ui-confirm__button ui-confirm__yes' },
          _react2['default'].createElement(
            _button2['default'],
            { as: 'primary', onClick: this.props.confirmHandler },
            confirmText()
          )
        )
      );
    }

    /**
     * Returns HTML and text for the confirm body. Appends the two
     * confirm buttons to super dialogHTML
     *
     * @method dialogTitle
     */
  }, {
    key: 'dialogHTML',
    get: function get() {
      var dialog = _get(Object.getPrototypeOf(Confirm.prototype), 'dialogHTML', this);
      dialog.props.children.push(this.confirmButtons);
      return dialog;
    }
  }]);

  return Confirm;
})(_dialog2['default']);

function confirmText() {
  return _i18nJs2['default'].t('confirm.yes', { defaultValue: 'Yes' });
}

function cancelText() {
  return _i18nJs2['default'].t('confirm.no', { defaultValue: 'No' });
}

exports['default'] = Confirm;
module.exports = exports['default'];