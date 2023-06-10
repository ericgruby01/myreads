import { useMemo, useState } from "react";
import { useBooks } from "../../contexts/BooksContext";
import { BookGrid } from "../../components/BookGrid";
import { PageTitle } from "../../components/PageTitle";
import { shelvesConfig } from "../../utils/shelvesConfig";

import { LoadingPage } from "../../components/LoadingPage";
import { ShelfNav } from "../../components/ShelfNav";

export function Home() {
  const { getAllState, myBooks, shelves } = useBooks();

  const [activeTab, setActiveTab] = useState("currentlyReading");

  const orderedBoks = useMemo(
    () => ({
      currentlyReading: myBooks.filter((book) => {
        if (shelves.currentlyReading.includes(book.id)) return book;
      }),
      wantToRead: myBooks.filter((book) => {
        if (shelves.wantToRead.includes(book.id)) return book;
      }),
      read: myBooks.filter((book) => {
        if (shelves.read.includes(book.id)) return book;
      }),
    }),
    [shelves]
  );

  return (
    <>
      <PageTitle icon="home" title="Home" />
      {getAllState.isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <ShelfNav activeTab={activeTab} onChange={setActiveTab} />
          {Object.values(shelvesConfig).map(
            ({ shelf }) =>
              activeTab === shelf && (
                <BookGrid key={`bookshelf_${shelf}`} books={orderedBoks[shelf]} />
              )
          )}
        </>
      )}
    </>
  );
}
