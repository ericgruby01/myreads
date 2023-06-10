import { BookCard } from "../../../components/BookCard";
import { DisplayWithImage } from "../../../components/DisplayWithImage";
import { DataNotFound } from "../../../components/Illustrations/DataNotFound";
import { SearchIllustration } from "../../../components/Illustrations/Search";
import { LoadingPage } from "../../../components/LoadingPage";
import { useBooks } from "../../../contexts/BooksContext";

export function BookResults() {
  const { searchResults, searchState, prevSearchTerm } = useBooks();

  if (searchResults?.error && !searchState.isLoading) {
    return (
      <DisplayWithImage ImageComponent={DataNotFound}>
          No books found for "<strong className="text-primary">{prevSearchTerm}</strong>".
      </DisplayWithImage>
      
    );
  }

  if (searchState.isLoading) {
    return <LoadingPage />;
  }

  if (searchResults.length === 0) {
    return (
      <DisplayWithImage ImageComponent={SearchIllustration} imageClassName='!max-w-[200px]'>
        Use the input above to search for new books.
      </DisplayWithImage>
    );
  }

  return (
    <>
      <h2 className="text-2xl my-8">
        {searchResults.length} Results for "
        <strong className="text-primary">{prevSearchTerm}</strong>"
      </h2>
      <div className="results-grid">
        {searchResults.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
