import { BookCard } from "./BookCard";

export function BookGrid({ books }) {
  return (
    <div className="results-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
