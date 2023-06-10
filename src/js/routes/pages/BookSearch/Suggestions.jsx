import { useMemo } from "react";
import { useBooks } from "../../../contexts/BooksContext";
import search_terms from "../../../utils/search_terms";
import { Icon } from "../../../components/Icon";
import { getRandom } from "../../../utils/helpers";

export function Suggestions() {
  const { setSearchTerm, searchState } = useBooks();

  const suggestions = useMemo(() => getRandom(search_terms, 4), []);

  const handleSearch = (term) => {
    if (searchState.isLoading) {
      return false;
    }
    setSearchTerm(term);
  };

  return (
    <p className="py-2 mb-4 text-slate-400 dark:text-slate-500">
      <strong>
        <Icon icon="lightbulb-alt" /> Don't know what to look for?
      </strong>{" "}
      Try:{" "}
      {suggestions.map((term) => (
        <span
          key={term}
          className="inline-block whitespace-nowrap cursor-pointer underline underline-offset-4 mx-2"
          onClick={() => handleSearch(term)}
        >
          {term}
        </span>
      ))}
    </p>
  );
}
