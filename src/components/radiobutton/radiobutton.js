import React from 'react';

/*****
 * A radiobutton widget.
 *
 * == How to use a radiobutton in a component:
 *
 * In your file:
 *
 *   import radiobutton from 'carbon/lib/components/radiobutton';
 *
 * To render the radiobutton:
 *
 *  <radiobutton name='frequency' value='weekly'>Weekly</radiobutton>
 *  <radiobutton name='frequency' value='2weekly'>2 Weekly</radiobutton>
 *  <radiobutton name='frequency' value='weekly'>4 Weekly</radiobutton>
 *  <radiobutton name='frequency' value='monthly'>Monthly</radiobutton>
 * 
 * For additional properties specific to this component, see propTypes.
 *
 * @class Link
 * @constructor
 */

class Radiobutton extends React.Component {

     static propTypes = {

     /**
      * The name property
      *
      * @property name
      * @type {String}
      */
        name: React.PropTypes.string.isRequired,
        
      /**
      * The name property
      *
      * @property value
      * @type {String}
      */
        value: React.PropTypes.string, 

       /**
       * Sets the radiobutton default checked state.
       *
       * @property defaultChecked
       * @type {boolean}
       * @default false
       */
        defaultChecked: React.PropTypes.bool
    }
    
    static defaultProps = {
        defaultChecked: false
    }
    
    /**
    * Getter for componet properties.
    *
    * @method componentProps
    * @return {Object} props
    */
   get componentProps() {
     let { ...props } = this.props;
     
     props.name = this.props.name;
     props.value = this.props.value;
     props.defaultChecked = this.props.defaultChecked;           
    
     return props;
   }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <input type='radio' { ...this.componentProps } >
        { this.props.children } </input>
    );
  }

}

export default Radiobutton;
