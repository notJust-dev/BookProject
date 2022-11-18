type Book = {
  image: string;
  title: string;
  authors: string[];
  isbn: string;
};

type BookProvider = "googleBooksSearch" | "openLibrarySearch"