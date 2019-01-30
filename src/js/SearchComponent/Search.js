import React, { Component } from 'react';

// Component
import Book from '../ShelfComponent/Book';
import Breadcrumbs from '../Breadcrumbs';
import EmptyState from '../EmptyState';

class Search extends Component {
  /**
   * @property {object} input
   * @description Create a reference for the input
   */
  input = React.createRef();

  /**
   * @method componentDidMount Lifecycle method
   */
  componentDidMount() {
    this.input.current.focus();
  }

  render() {
    const {searchError, searchQuery, searchResult, onHandleQuery, putBookOnShelf, newSearch} = this.props;
    return (
      <div>
  
        <Breadcrumbs crumbs={[
            {text: 'Home', link: ''},
            {text: 'Search Books', active: true}
          ]}></Breadcrumbs>
  
        <div id="search">
          <label htmlFor="searchInput" className="flaticon-magnifying-glass"></label>
          <input ref={this.input} id="searchInput" type="text" placeholder="Type here..." value={searchQuery} onChange={e => onHandleQuery(e.target.value)}/>
          <button onClick={() => newSearch()}>&times;</button>
        </div>
  
        {searchError ? (
          <EmptyState text="Sorry, we couldn't found what you're looking for."></EmptyState>
        ) : (
        <div className="books wrap">
          {searchResult.map(result => <Book key={result.id} book={result} putBookOnShelf={(book, shelf) => putBookOnShelf(book, shelf)}/>)}
        </div>
        )}
      </div>
    )
  }
}

export default Search;