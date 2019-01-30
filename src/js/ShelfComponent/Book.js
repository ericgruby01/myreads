import React, { Component } from 'react';
import  { Link } from 'react-router-dom';

// https://micku7zu.github.io/vanilla-tilt.js/
import VanillaTilt from 'vanilla-tilt';

// Components
import SelectShelf from './SelectShelf';
import RatingStars from '../RatingStars';
import BookCover from '../BookCover';

/**
 * @class Book
 */
class Book extends Component {
  /**
   * @property {object} element
   */
  element = React.createRef();

  /**
   * @method componentDidMount Lifecycle method
   */
  componentDidMount() {
    // Start the tilt effect on covers
    VanillaTilt.init(this.element.current, {
      reverse: true,
      max: 25,
      speed: 1000,
    });
  }

  /**
   * @method componentWillUnmount Lifecycle method
   */
  componentWillUnmount() {
    // Destroy the VanillaTilt instance
    this.element.current.vanillaTilt.destroy();
  }

  render() {
    const {book, putBookOnShelf, blockClick} = this.props;
    return (
      <div className="book" data-clickable>
        <div className="inner">
          {blockClick && <div className="block-click"></div>}
          <Link draggable={false} to={'book/' + book.id}>
            <div ref={this.element} className="book-image">
              <div className="labels">
                <div className="label details">Details</div>
              </div>
              <BookCover cover={book.imageLinks} title={book.title}></BookCover>
              <div className="pages"></div>
            </div>
          </Link>
          <h3 className="title"><Link draggable={false} to={'book/' + book.id}>{book.title}</Link></h3>
          {book.authors && (
            <div className="authors">
              {book.authors[0]}
            </div>
          )}
          <RatingStars stars={book.averageRating || 0} />
          <SelectShelf selected={book.shelf} update={(shelf) => putBookOnShelf(book, shelf)} id={book.id}/>
        </div>	
      </div>
    )
  }
}

export default Book