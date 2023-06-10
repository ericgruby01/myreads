import { Link } from "react-router-dom";
import { MoveToShelfButton } from "./MoveToShelfButton";
import { useBooks } from "../contexts/BooksContext";
import { Icon } from "./Icon";
import { Rate } from "./Rate";
import { Cover } from "./Cover";

export function BookCard({ book, showShelfTag }) {
  const { putBookOnShelf, isThisBookOnAShelf, updateState } = useBooks();

  const onMove = (shelf) => {
    putBookOnShelf(book, shelf);
  };

  return (
    <div className="book-card">
      <div className="pt-4 pl-4 pr-4 w-full">
        <MoveToShelfButton
          showShelfTag={showShelfTag}
          loading={updateState.isLoading}
          onMove={onMove}
          selectedShelf={isThisBookOnAShelf(book.id)}
        />
      </div>
      <div>
        <div className="book-card-image-holder">
          <Link to={`/book/${book.id}`} className="block w-auto max-h-44 m-auto drop-shadow-2xl">
            <Cover
              className="w-auto max-h-44"
              src={book?.imageLinks?.thumbnail}
              alt={book.title}
              title={book.title}
            />
          </Link>
        </div>
        <div className="p-4 flex flex-col justify-between">
          <Link to={`/book/${book.id}`}>
            <h4 className="book-card-title">
              {book.title}
            </h4>
            {book.authors && (
              <p className="book-card-authors">
                {book.authors.length > 0 && (
                  <span className="text-l">{book.authors.join(", ")}</span>
                )}
              </p>
            )}
            {book.averageRating && (
              <Rate rate={book.averageRating}/>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
