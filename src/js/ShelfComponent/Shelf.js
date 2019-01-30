import React, { Component } from 'react';

import { styler, inertia, listen, pointer, value } from 'popmotion'

// Components
import Book from './Book';
import EmptyState from '../EmptyState';

/**
 * @class Shelf
 */
class Shelf extends Component {
  /**
   * Component State
   */
  state = {
    panning: false
  }

  /**
   * @property {object} shelf
   * @description Create a reference for the shelf element, so Hammer.js can manipulate it
   */
  shelf = React.createRef();

  /**
   * @properties
   */
  mounted = false;
  mouseDownListener = {};
  mouseUpListener = {};
  lastX = 0

  /**
   * @method componentDidMount Lifecycle method
   */
  componentDidMount() {
    this.mounted = true

    const shelfStyler = styler(this.shelf.current);
    const shelfScrollLeft = value(0, v => shelfStyler.set('scrollLeft', v));

    // Add the listener to mousedown/touchstart event
    this.mouseDownListener = listen(this.shelf.current, 'mousedown touchstart').start(() => {
      // A pointer will get the current scrollLeft as X
      pointer({ x: -this.shelf.current.scrollLeft })
      .pipe(({ x }) => {
        // Check for intentional dragging event
        if (Math.abs(-x-this.lastX) > 10) {
          this.shelf.current.classList.add('cursor-grabbing');
          this.setState({panning: true})
        }
        return -x
      })
      .start(shelfScrollLeft);
    });

    this.mouseUpListener = listen(document, 'mouseup touchend').start(() => {
      this.shelf.current.classList.remove('cursor-grabbing');
      this.lastX = this.shelf.current.scrollLeft
      if (this.mounted) this.setState({panning: false})
      inertia({
        min: 0,
        max: this.shelf.current.scrollWidth,
        from: shelfScrollLeft.get(),
        velocity: shelfScrollLeft.getVelocity(),
        power: 0.6,
        bounceStiffness: 0,
        bounceDamping: 0
      })
      .start(shelfScrollLeft);
    });

  }
  
  /**
   * @method componentWillUnmount Lifecycle method
   */
  componentWillUnmount() {
    this.mounted = false
    this.lastX = 0
    this.mouseDownListener.stop()
    this.mouseUpListener.stop()
  }

  /**
   * @method render Licecycle method
   */
  render () {
    const {shelf, books, putBookOnShelf} = this.props;
    return (
        <div id={shelf.value} className="shelf">
          <h1>{books.length > 3 && (<i className="flaticon-swipe"></i>)} <i className={shelf.iconClass}></i> {shelf.option}</h1>
          <div ref={this.shelf} className={(books.length > 3 && 'cursor-grab') + ' books flex'}>
            {books.length > 0 ? (
              books.map(book => <Book blockClick={this.state.panning} key={book.id} book={book} putBookOnShelf={(book, shelf) => putBookOnShelf(book, shelf)}/>)
            ) : (
              <EmptyState text="Oh, no! This shelf is empty." link="search" linkText="Let's search some books →"></EmptyState>
            )}
          </div>
        </div>
    );
  }
}

export default Shelf;
