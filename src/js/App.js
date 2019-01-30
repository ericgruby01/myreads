import React from 'react';
import { Link, Route } from 'react-router-dom';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import * as BooksAPI from './BooksAPI';

// Shelves array
import shelvesArray from './ShelvesArray';

// Components
import Shelf from './ShelfComponent/Shelf';
import Search from './SearchComponent/Search';
import SingleBook from './SingleBookComponent/SingleBook';
import Loading from './Loading';
import Credits from './Credits';

/**
 * @class BooksApp
 */
class BooksApp extends React.Component {
  /**
   * @property {Object} state BooksApp state
   */
  state = {
    myBooks: [],
    searchQuery: '',
    searchResult: [],
    loading: true,
    searchError: false
  }

  /**
   * @property {setTimeout} debounce for query input
   */
  debounce = setTimeout(() => false, 0);

  /**
   * @method componentDidMount Lifecycle method
   */
  componentDidMount() {
    // Executes getAll method from the API and updates the myBooks state
    BooksAPI.getAll().then(response => {
      this.setState({
        myBooks: response,
        loading: false
      });
    });
  }

  /**
   * @method filterBooksByShelf
   * @description Filter the books by a given shelf
   * @param {string} shelf
   * @return {array}
   */
  filterBooksByShelf = shelf => {
    return this.state.myBooks.filter(book => book.shelf === shelf);
  }

  /**
   * @method handleQuery
   * @description Handle the user input on the search route
   * @param {string} query Whatever the user inputs
   */
  handleQuery = query => {
    // Update state
    this.setState({searchQuery: query});
    // Init debounce
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      this.searchBooks(this.state.searchQuery);
      clearTimeout(this.debounce);
    }, 500);
  }

  /**
   * @method searchBooks
   * @description Search books
   * @param {string} searchQuery
   */
  searchBooks = searchQuery => {
    // If the search query is empty, reset the state of the search page
    if (searchQuery === '') {
      return this.setState({
        searchResult: [],
        loading: false,
        searchError: false
      });
    }
    // Turn loading on and turn searchError off
    this.setState({
      loading: true,
      searchError: false
    });
    // Executes search method from the API and updates the searchResult state
    BooksAPI.search(searchQuery).then(response => {
      // Handle if error exists on the response, turn loading off and turn searchError on
      if (response.error) {
        return this.setState({
          searchResult: [],
          loading: false,
          searchError: true
        });
      }
      // Set the response to searchResult and turn loading off
      this.setState({
        searchResult: response.map(book => {
          book.shelf = this.isThisBookOnAShelf(book.id).shelf;          
          return book;
        }),
        loading: false
      });
    });
  }

  /**
   * @method isThisBookOnAShelf
   * @description Check if a book is already in on a shelf
   * @param {object} bookID book id
   * @return {object} {result: boolean, shelf: string}
   */
  isThisBookOnAShelf = bookID => {
    let result = {result: false, shelf: 'none'};
    const bookFound = this.state.myBooks.find(book => book.id === bookID);
    if (bookFound) {
      result.result = true;
      result.shelf = bookFound.shelf;
    }
    return result;
  }

  /**
   * @method putBookOnShelf
   * @description Put the book on a given shelf
   * @param {object} theBook book object
   * @param {string} shelf shelf name
   */
  putBookOnShelf = (theBook, shelf) => {    
    // Set the new shelf
    theBook.shelf = shelf;

    // Update myBooks state
    this.setState(prevState => ({
      myBooks: this.isThisBookOnAShelf(theBook.id).result ? // Ternary operation: If book is on a shelf...
        prevState.myBooks.map(book => {
          if (book.id === theBook.id) {
            book.shelf = shelf;
          }
          return book;
        }) : // ... else: add it to a shelf
        [...prevState.myBooks, theBook]
    }));
    
    // Call update method from API
    BooksAPI.update(theBook, shelf);
  }

  /**
   * @method newSearch
   * @description Clear the input and the results for a new search
   */
  newSearch = () => {
    this.setState({
      searchResult: [],
      searchQuery: '',
      searchError: false
    });
  }

  /**
   * @method scrollWithOffset
   */
  scrollWithOffset = (el, offset) => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: "smooth"
    });
  }

  /**
   * @method render Lifecycle method
   */
  render() {
    const {loading, searchQuery, searchResult, searchError} = this.state;
    return (
      <div id="myReads">
        {/* Header */}
        <div id="header">
          <div className="container">
            <div className="left"><Link to='/'><img src="images/my-reads.svg" className="logo" alt="My Reads APP" /></Link></div>
            <div className="right">
              <NavLink scroll={el => this.scrollWithOffset(el, 127)} to="/#currentlyReading" className="hide-mobile" activeClassName="selected">Currently Reading</NavLink>
              <NavLink scroll={el => this.scrollWithOffset(el, 127)} to="/#wantToRead" className="hide-mobile" activeClassName="selected">Want to Read</NavLink>
              <NavLink scroll={el => this.scrollWithOffset(el, 127)} to="/#read" className="hide-mobile" activeClassName="selected">Read</NavLink>
              <Link className="searchLink" to="/search"><i className="flaticon-magnifying-glass"></i><span className="hide-mobile"> Search</span></Link>
            </div>
          </div>
        </div>

        {/* Main Container */}
        <div className="container">
        	  {/* Loading State */}
            {loading && (
              <Loading text="Loading..."></Loading>
            )}
            {/* Route: Home */}
            <Route exact path="/" render={() => {
              return (
                <div>{shelvesArray.map(shelf => (
                  <Shelf
                    key={shelf.value}
                    loading={loading}
                    shelf={shelf}
                    books={this.filterBooksByShelf(shelf.value)}
                    putBookOnShelf={this.putBookOnShelf}
                  />
                ))}</div>
              )
            }}/>

            {/* Route: Search */}
            <Route path="/search" render={() => (
              <Search
                searchError={searchError}
                newSearch={this.newSearch}
                loading={loading}
                searchQuery={searchQuery}
                onHandleQuery={this.handleQuery}
                searchResult={searchResult}
                putBookOnShelf={this.putBookOnShelf}
              />
            )}/>

            {/* Route: Book */}
            <Route path="/book/:book" render={(book) => (
              <SingleBook
                book={book}
                loading={loading}
                toggleLoading={bool => this.setState({loading: bool})}
                putBookOnShelf={this.putBookOnShelf}
              />
            )}/>

            {/* Route: Credits */}
            <Route path="/credits" component={Credits}></Route>
        </div>
        
        {/* Footer */}
        <div id="footer">MyReads &bull; {new Date().getFullYear()} &bull; <Link to="/credits">Credits</Link></div>
      </div>
    )
  }
}

export default BooksApp
