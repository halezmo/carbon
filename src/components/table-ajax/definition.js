import { TableAjax } from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import trDefinition from '../table/table-row/definition';

let definition = {
  component: TableAjax,
  key: 'table-ajax',
  text: {
    bemClass: 'carbon-table-ajax',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'TableAjax',
    type: 'grid'
  },
  defaultProps: TableAjax.defaultProps,
  props: TableAjax.propTypes,
  propOptions: {
    pageSize: OptionsHelper.pageSizes()
  }
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: DemoHelper.elemArray(trDefinition, 28, 'uniqueID'),
  currentPage: 1,
  filter: {},
  highlightable: true,
  paginate: true,
  selectable: true,
  showPageSizeSelection: false,
  shrink: false
});

export default definition;
