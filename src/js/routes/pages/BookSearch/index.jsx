import { useBooks } from "../../../contexts/BooksContext";
import { BookResults } from "./SearchResults";
import { Suggestions } from "./Suggestions";
import { PageTitle } from "../../../components/PageTitle";

export function BookSearch() {
  const { searchTerm, setSearchTerm } = useBooks();

  return (
    <div className=" mb-8 w-full">
      <PageTitle icon="search" title="Find New Books" />
      <input
        type="text"
        className="search-input"
        placeholder="Type here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="w-full">
        <Suggestions />
      </div>

      <BookResults />
    </div>
  );
}
