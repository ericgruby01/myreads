import { useParams } from "react-router";
import { useBooks } from "../../contexts/BooksContext";
import { useEffect, useState } from "react";
import { Icon } from "../../components/Icon";
import { Rate } from "../../components/Rate";
import { DataNotFound } from "../../components/Illustrations/DataNotFound";
import { BookAttribute } from "../../components/BookAttribute";
import { LoadingPage } from "../../components/LoadingPage";
import { MoveToShelfButton } from "../../components/MoveToShelfButton";
import { DisplayWithImage } from "../../components/DisplayWithImage";
import { Cover } from "../../components/Cover";

export function Book() {
  const [book, setBook] = useState({});
  const [notFound, setNotFound] = useState(false);

  const { id } = useParams();

  const { get, getState, putBookOnShelf, updateState, isThisBookOnAShelf } = useBooks();

  const onMove = (shelf) => {
    putBookOnShelf(book, shelf);
  };

  useEffect(() => {
    if (id) {
      setNotFound(false);
      get(id)
        .then(setBook)
        .catch(() => setNotFound(true));
    }
  }, [id]);

  if (notFound) {
    return (
      <DisplayWithImage ImageComponent={DataNotFound}>
        The book you're searching doesn't exist. Try using the search.
      </DisplayWithImage>
    );
  }

  if (getState.isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="xl:w-3/4 mx-auto max-lg:w-full grid md:grid-cols-[auto_1fr]">
      <div className="pr-8 w-auto lg:w-64 text-center max-md:mb-8 max-md-p-0">
        <div className="flex justify-center mb-8">
          <Cover src={book.imageLinks?.thumbnail} alt={book.title} />
        </div>
        <MoveToShelfButton
          selectedShelf={isThisBookOnAShelf(book.id) || book.shelf}
          onMove={onMove}
          loading={updateState.isLoading}
        />
      </div>
      <div className="border-l pl-8 border-slate-200 dark:border-slate-950 max-md:p-4 max-md:border-none">
        <h1 className="text-4xl mb-2">{book.title}</h1>
        {book.subtitle && <h2 className="text-2xl mb-4">{book.subtitle}</h2>}
        {book.authors && (
          <h3 className="text-lg text-slate-500 mb-4">
            {book.authors.length === 1 ? "Author: " : "Authors: "}
            {book.authors.join(", ")}
          </h3>
        )}
        {book.averageRating && (
          <p className="mb-8 text-xl">
            <Rate rate={book.averageRating} />
          </p>
        )}
        {book.description && <p className="mb-8">{book.description}</p>}
        {book.previewLink && (
          <p>
            <a className="link" href={book.previewLink} target="_blank">
              <strong>Read a Preview </strong>
              <Icon icon="external-link-alt" />
            </a>
          </p>
        )}
        <div className="mt-8 grid grid-cols-2 grid-rows-2">
          <div className="mb-4">
            <strong className="block">Publisher</strong>
            <BookAttribute attribute={book.publisher} />
          </div>
          <div className="mb-4">
            <strong className="block">Pages</strong>
            <BookAttribute attribute={book.pageCount} />
          </div>
          <div className="mb-4">
            <strong className="block">Published On</strong>
            <BookAttribute
              attribute={book.publishedDate}
              render={(attribute) => new Date(attribute).toLocaleDateString()}
            />
          </div>
          <div className="mb-4">
            <strong className="block">Categories</strong>
            <BookAttribute
              attribute={book.categories}
              condition={(attribute) => attribute.length > 0}
              render={(attribute) =>
                attribute.map((cat) => (
                  <span
                    key={`cat_${cat}`}
                    className="inline-block mr-3 bg-slate-200 dark:bg-slate-800 text-xs py-1 px-2  font-bold uppercase"
                  >
                    {cat}
                  </span>
                ))
              }
              emptyText="No categories"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
