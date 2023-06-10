import { HashRouter, Route, Routes } from "react-router-dom";

// Contexts
import ThemeContext from "../contexts/ThemeContext";
import BooksContext from "../contexts/BooksContext";

// Default Layout
import { DefaultLayout } from "./layouts/DefaultLayout";

// Pages
import { Home } from "./pages/Home";
import { BookSearch } from "./pages/BookSearch";
import { Book } from "./pages/Book";
import { PageNotFound } from "./pages/PageNotFound";
import { Credits } from "./pages/Credits";

export function AppRoutes() {
  return (
    <ThemeContext>
      <BooksContext>
        <HashRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<BookSearch />} />
              <Route path="/book/:id" element={<Book />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="*" element={<PageNotFound/>} />
            </Route>
          </Routes>
        </HashRouter>
      </BooksContext>
    </ThemeContext>
  );
}
