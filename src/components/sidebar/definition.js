import { Sidebar } from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';
import podDefinition from '../pod/definition';

let definition = {
  component: Sidebar,
  key: 'sidebar',
  text: {
    bemClass: 'carbon-sidebar',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Sidebar',
    type: 'modal'
  },
  defaultProps: Sidebar.defaultProps,
  props: Sidebar.propTypes,
  propOptions: {
    position: OptionsHelper.alignBinary(),
    size: OptionsHelper.sizesRestricted()
  }
};

podDefinition.demoProps.onEdit = false;
definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: DemoHelper.elemArray(podDefinition, 7, 'title'),
  enableBackgroundUI: true,
  size: 'small'
});

export default definition;
