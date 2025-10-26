import { useEffect, useState } from "react";
import Book from "./Book";
import BtnPlus from "./BtnPlus";
import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal";
import "./App.css";
import data from "./data.json";

export default function App() {
    const [books, setBooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [bookToEdit, setBookToEdit] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState({
        publisher: "",
        language: "",
    });

    useEffect(() => {
        // Load books from localStorage or initialize with default data
        const savedBooks = localStorage.getItem("bookCatalog");
        if (savedBooks) {
            setBooks(JSON.parse(savedBooks));
        } else {
            // Transform data to include selected property and use title as author
            const transformedData = data.map((book) => ({
                ...book,
                author: book.subtitle || "Unknown Author",
                publisher: "Unknown Publisher",
                publicationYear: "Unknown",
                language: "English",
                pages: "Unknown",
                selected: false,
                isUserAdded: false, // Mark as default books
            }));
            setBooks(transformedData);
        }
    }, []);

    // Save books to localStorage whenever books change
    useEffect(() => {
        if (books.length > 0) {
            localStorage.setItem("bookCatalog", JSON.stringify(books));
        }
    }, [books]);

    const handleAddBook = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleBookSelect = (bookId) => {
        setBooks((prev) =>
            prev.map((book) => ({
                ...book,
                selected: book.isbn13 === bookId ? !book.selected : false,
            }))
        );
    };

    const handleDeleteSelected = () => {
        setBooks((prev) => prev.filter((book) => !book.selected));
    };

    const handleUpdateSelected = () => {
        const selectedBook = books.find((book) => book.selected);
        if (selectedBook) {
            setBookToEdit(selectedBook);
            setIsEditModalOpen(true);
        }
    };

    const handleEditBook = (bookId, updatedData) => {
        setBooks((prev) =>
            prev.map((book) =>
                book.isbn13 === bookId
                    ? {
                          ...book,
                          title: updatedData.title,
                          author: updatedData.author,
                          publisher:
                              updatedData.publisher || "Unknown Publisher",
                          publicationYear:
                              updatedData.publicationYear || "Unknown",
                          language: updatedData.language || "Unknown",
                          pages: updatedData.pages || "Unknown",
                          image: updatedData.imageUrl || book.image,
                          selected: false,
                      }
                    : book
            )
        );
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setBookToEdit(null);
    };

    const handleAddNewBook = (newBookData) => {
        const newBook = {
            isbn13: Date.now().toString(), // Generate unique ID
            title: newBookData.title,
            author: newBookData.author,
            subtitle: newBookData.author, // Keep subtitle for compatibility
            publisher: newBookData.publisher || "Unknown Publisher",
            publicationYear: newBookData.publicationYear || "Unknown",
            language: newBookData.language || "Unknown",
            pages: newBookData.pages || "Unknown",
            image:
                newBookData.imageUrl ||
                "https://via.placeholder.com/200x300?text=No+Image",
            url: "#", // Default URL since it's not in the form
            price: "N/A", // Default price since it's not in the form
            selected: false,
            isUserAdded: true, // Mark as user-added book
        };
        setBooks((prev) => [...prev, newBook]);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterCriteria((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const clearFilters = () => {
        setFilterCriteria({
            publisher: "",
            language: "",
        });
    };

    // Filter books based on criteria
    const filteredBooks = books.filter((book) => {
        const matchesPublisher =
            !filterCriteria.publisher ||
            book.publisher
                .toLowerCase()
                .includes(filterCriteria.publisher.toLowerCase());
        const matchesLanguage =
            !filterCriteria.language ||
            book.language
                .toLowerCase()
                .includes(filterCriteria.language.toLowerCase());
        return matchesPublisher && matchesLanguage;
    });

    return (
        <div className='app'>
            <header className='app-header'>
                <h1>Book Catalog</h1>
            </header>

            <div className='content'>
                <div className='main-layout'>
                    <div className='btn-plus-container'>
                        <BtnPlus onClick={handleAddBook} />
                        <div className='action-buttons'>
                            <button
                                className='btn-update'
                                onClick={handleUpdateSelected}
                                title='Edit selected book'>
                                Edit
                            </button>
                            <button
                                className='btn-delete'
                                onClick={handleDeleteSelected}
                                title='Delete selected book'>
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Filter Controls */}
                    <div className='filter-controls'>
                        <h3>Filter Books</h3>
                        <div className='filter-row'>
                            <div className='filter-group'>
                                <label htmlFor='publisher-filter'>
                                    Publisher:
                                </label>
                                <input
                                    type='text'
                                    id='publisher-filter'
                                    name='publisher'
                                    value={filterCriteria.publisher}
                                    onChange={handleFilterChange}
                                    placeholder='Filter by publisher...'
                                />
                            </div>
                            <div className='filter-group'>
                                <label htmlFor='language-filter'>
                                    Language:
                                </label>
                                <input
                                    type='text'
                                    id='language-filter'
                                    name='language'
                                    value={filterCriteria.language}
                                    onChange={handleFilterChange}
                                    placeholder='Filter by language...'
                                />
                            </div>
                            <button
                                className='btn-clear-filters'
                                onClick={clearFilters}
                                title='Clear all filters'>
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    <div className='books-grid'>
                        {filteredBooks.map((b) => (
                            <Book
                                key={b.isbn13}
                                image={b.image}
                                title={b.title}
                                authors={b.author}
                                url={b.url}
                                price={b.price}
                                isSelected={b.selected}
                                onSelect={() => handleBookSelect(b.isbn13)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <footer className='footer'>
                <p>Primcharlin Kiattipoompun Set G</p>
            </footer>

            <AddBookModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAddBook={handleAddNewBook}
            />
            <EditBookModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                onEditBook={handleEditBook}
                bookToEdit={bookToEdit}
            />
        </div>
    );
}
