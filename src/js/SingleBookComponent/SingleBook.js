import React,  { Component } from 'react';
import * as BooksAPI from '../BooksAPI';

// Components
import Breadcrumbs from '../Breadcrumbs';
import EmptyState from '../EmptyState';
import SelectShelf from  '../ShelfComponent/SelectShelf';
import RatingStars from '../RatingStars';
import BookCover from '../BookCover';

/**
 * @class SingleBook
 */
class SingleBook extends Component {
    /**
     * @property {object} state
     */
    state = {
        book: {},
        error: false
    }

    /**
     * @property {string} bookID
     */
    bookID = this.props.book.match.params.book;

    /**
     * @method componentDidMount Lifecycle method
     */
    componentDidMount() {
        const {toggleLoading} = this.props;
        window.scrollTo(0, 0);
        // Set the initial state
        toggleLoading(true);
        this.setState({
            book: {},
            error: false
        });
        // Get an specific book
        BooksAPI.get(this.bookID)
        .then(response => {
            this.setState({
                book: response,
                error: false
            });
            toggleLoading(false);
        }).catch(error => {
            this.setState({
                error: true
            });
            toggleLoading(false);
        })
    }

    /**
     * @method render Lifecycle method
     */
    render() {
        const {book, error} = this.state;
        return (
            <div>
                {/* breadcrumbs */}
                {(!this.props.loading && Object.keys(book).length > 0) ? (
                    <Breadcrumbs crumbs={[
                        {text: 'Back', link: 'back'},
                        {text: book.title, active: true}
                    ]}></Breadcrumbs>
                ) : (
                    <Breadcrumbs crumbs={[
                        {text: 'Back', link: 'back'},
                        {text: 'Book not found', active: true}
                    ]}></Breadcrumbs>
                )}

                {!this.props.loading && error ? (
                    <EmptyState text="Book not found!" link="search" linkText="Go search some books →"></EmptyState>
                ) : (
                    // single book
                    <div id="single-book">
                        {/* cover */}
                        <div className="cover-area">
                            <BookCover cover={book.imageLinks} title={book.title}></BookCover>
                            <SelectShelf selected={book.shelf} update={(shelf) => this.props.putBookOnShelf(book, shelf)} id={book.id}/>
                            <RatingStars stars={book.averageRating || 0} />
                        </div>
                        <div className="infos">
                            {/* title */}
                            <div className="title">
                                <h1>{book.title}</h1>
                                {book.subtitle && <h2>{book.subtitle}</h2>}
                                {book.authors && <h4>Author(s): {book.authors.join(', ')}</h4>}
                            </div>
                            {/* description */}
                            {book.description ? (
                                <div className="description">
                                    {book.description}
                                    <p><a href={book.previewLink} target="_blank" >Read a preview &rarr;</a></p>
                                </div>
                            ) : (
                                <div className="description empty">No description provided...<br/><a href={book.previewLink}>Get a preview &rarr;</a></div>
                            )}
                            {/* contents */}
                            <div className="contents-column">
                                <p>
                                    <strong>Publisher</strong><br/>
                                    {book.publisher || 'Unknown'}
                                </p>
                                <p>
                                    <strong>Published on</strong><br/>
                                    {book.publishedDate ? new Date(book.publishedDate + ' ').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}
                                </p>
                                <p>
                                    <strong>Pages</strong><br/>
                                    {book.pageCount || 'Unknown'}
                                </p>
                                <p>
                                    <strong>Categories</strong><br/>
                                    {book.categories ? book.categories.join(', ') : 'Unknown'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default SingleBook;
