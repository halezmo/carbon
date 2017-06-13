import DropdownFilter from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';
import DropdownDefinition from './../dropdown/definition';
import { assign } from 'lodash';

let definition = new Definition('dropdown-filter', DropdownFilter, {
  description: `Selects one option from a very long list, with the ability to filter and create new items.`,
  designerNotes: `
* The user can select an item using the mouse or keyboard, and also enter a search term to filter the list items presented - this is particularly helpful for very long lists (e.g. a list of customers or suppliers).
* Useful to show more than about 5 options.
* The Create configuration allows the user to add a term they enter to the list.
* The Suggest configuration removes the menu handle, and only shows options to the user once they enter 3 characters of a search term. For example, if users need to select from a very long list of business classification terms (e.g. SIC codes), showing a menu on field focus may mean users tend to choose from the top of the list, rather than filter and select the best option. This configuration makes the component behave more like a search field.
* Use placeholder content like ‘Please select…’ to make it clear to the user that the Dropdown is unset.
* Consider a ‘smart default’ selection, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.
  `,
  relatedComponentsNotes: `
* Dropdown filter with Ajax? [Try Dropdown Filter Ajax](/components/dropdown-ajax).
* Don’t need to filter or add new items? [Try Dropdown](/components/dropdown).
* Choosing one option from a shorter list? [Try Radio Button](/components/radio-button).
* Choosing more than one option? [Try Checkbox](/components/checkbox).
* Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle).
 `,
  hiddenProps: DropdownDefinition.hiddenProps,
  toggleFunctions: ['create'],
  js: DropdownDefinition.js,
  propTypes: assign({}, DropdownDefinition.propTypes, {
    create: "Function",
    freetext: "Boolean",
    suggest: "Boolean"
  }),
  propValues: {
    options: `getOptions()`
  },
  propDescriptions: assign({}, DropdownDefinition.propDescriptions, {
    create: "When defined will show a create button, which on click will trigger this callback with currently typed value.",
    freetext: "When enabled will allow the user to type freely into the field, without their filter having to match a result.",
    suggest: "When enabled will enforce that the user needs to type something before they will see any results."
  })
});

definition.isAnInput();

export default definition;
