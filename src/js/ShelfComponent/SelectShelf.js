import React, { Component } from 'react';

// Shelves array
import shelvesArray from '../ShelvesArray';

/**
 * @class SelectShelf
 */
class SelectShelf extends Component {

  /**
   * @property {object} check
   * @description Create a ref for the label element
   */
  check = React.createRef();
  
  /**
   * @method selected
   * @description Check if the default selected value
   */
  selected = value => this.props.selected === value;

  /**
   * @method change
   * @description Update the value and close the select window
   */
  change = value => {
    this.props.update(value);
    this.check.current.click();
  }

  /**
   * @method render Licecycle method
   */
  render() {
    return (
      <div className="selectShelf">
        <input className="checkSelect" type="checkbox" id={this.props.id} />
        <label ref={this.check} htmlFor={this.props.id}></label>
        <ul>
          <li className="disabled"><span>Move to:</span></li>
          {shelvesArray.map(shelf => (
           <li key={shelf.value} data-value={shelf.value}>
            <a className={this.selected(shelf.value) ? 'active' : ''} href={shelf.value} onClick={e => {e.preventDefault(); this.change(shelf.value)}}>
              <i className={this.selected(shelf.value) ? 'flaticon-check' : shelf.iconClass}></i> {shelf.option}
            </a>
          </li>
         ))}
          <li><a className={this.selected('none') ? 'active' : ''} href="none" onClick={e => {e.preventDefault(); this.change('none')}}><i className="flaticon-bookmark-1"></i> None</a></li>
        </ul>
      </div>
    )
  }
}

export default SelectShelf