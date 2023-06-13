import { createContext, useContext, useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";
import { API_get, API_getAll, API_search, API_update } from "../utils/api";
import { useDebounce } from "../hooks/useDebounce";

const BooksContext = createContext();

export default function ({ children }) {
  const [myBooks, setMyBooks] = useState([]);
  const [shelves, setShelves] = useState({ currentlyReading: [], wantToRead: [], read: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [prevSearchTerm, setPrevSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [searchResults, setSearchResults] = useState([]);

  const [get, getState] = useAPI(API_get);
  const [getAll, getAllState] = useAPI(API_getAll);
  const [update, updateState] = useAPI(API_update);
  const [search, searchState] = useAPI(API_search);

  const isThisBookOnAShelf = (id) => {
    return Object.keys(shelves).reduce((acc, key) => {
      if (shelves[key].includes(id)) {
        acc = key;
        return acc;
      }
      return acc;
    }, false);
  };

  const isThisBookInState = (id) => {
    const isInMyBooks = myBooks.find((book) => book.id === id);
    if (isInMyBooks) {
      return isInMyBooks;
    }

    const isInSearchResults = searchResults.find((book) => book.id === id);
    if (isInSearchResults) {
      return isInSearchResults;
    }

    return false;
  };

  const putBookOnShelf = (book, shelf) => {
    update(book, shelf).then(setShelves);
    setMyBooks((books) =>
      shelf === "none"
        ? books.filter((b) => b.id !== book.id)
        : [...books.filter((b) => b.id !== book.id), book]
    );
  };

  const providerValue = {
    myBooks,
    get,
    getState,
    getAllState,
    searchState,
    searchTerm,
    prevSearchTerm,
    shelves,
    setSearchTerm,
    putBookOnShelf,
    updateState,
    isThisBookOnAShelf,
    isThisBookInState,
    searchResults,
  };

  useEffect(() => {
    getAll().then((resp) => {
      setMyBooks(resp);
      setShelves(
        resp.reduce(
          (acc, book) => {
            if (book.shelf === "currentlyReading") {
              acc.currentlyReading.push(book.id);
            }
            if (book.shelf === "wantToRead") {
              acc.wantToRead.push(book.id);
            }
            if (book.shelf === "read") {
              acc.read.push(book.id);
            }
            return acc;
          },
          { currentlyReading: [], wantToRead: [], read: [] }
        )
      );
    });
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm && !searchState.isLoading) {
      setPrevSearchTerm(debouncedSearchTerm);
      search(debouncedSearchTerm).then(setSearchResults);
    }
  }, [debouncedSearchTerm]);

  return <BooksContext.Provider value={providerValue}>{children}</BooksContext.Provider>;
}

export function useBooks() {
  return useContext(BooksContext);
}
