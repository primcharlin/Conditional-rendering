import React, { useState, useEffect } from "react";
import "./App.css";

export default function EditBookModal({ isOpen, onClose, onUpdateBook, book }) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        publisher: "",
        publicationYear: "",
        language: "",
        pages: "",
        imageUrl: "",
    });

    // Populate form when book changes
    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || "",
                author: book.author || "",
                publisher: book.publisher || "",
                publicationYear: book.publicationYear || "",
                language: book.language || "",
                pages: book.pages || "",
                imageUrl: book.image || "",
            });
        }
    }, [book]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the book
        onUpdateBook(formData);
        // Reset form
        setFormData({
            title: "",
            author: "",
            publisher: "",
            publicationYear: "",
            language: "",
            pages: "",
            imageUrl: "",
        });
    };

    const handleClose = () => {
        onClose();
        // Reset form when closing
        setFormData({
            title: "",
            author: "",
            publisher: "",
            publicationYear: "",
            language: "",
            pages: "",
            imageUrl: "",
        });
    };

    if (!isOpen || !book) return null;

    return (
        <div
            className='modal-overlay'
            onClick={handleClose}>
            <div
                className='modal-content'
                onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <h2>Edit Book</h2>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='book-form'>
                    <div className='form-row'>
                        <label htmlFor='title'>Title</label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder='book title...'
                            required
                        />
                    </div>

                    <div className='form-row'>
                        <label htmlFor='author'>Author</label>
                        <input
                            type='text'
                            id='author'
                            name='author'
                            value={formData.author}
                            onChange={handleInputChange}
                            placeholder='Author'
                            required
                        />
                    </div>

                    <div className='form-row'>
                        <label htmlFor='publisher'>Publisher</label>
                        <input
                            type='text'
                            id='publisher'
                            name='publisher'
                            value={formData.publisher}
                            onChange={handleInputChange}
                            placeholder='Publisher'
                        />
                    </div>

                    <div className='form-row'>
                        <label htmlFor='publicationYear'>
                            Publication Year
                        </label>
                        <input
                            type='number'
                            id='publicationYear'
                            name='publicationYear'
                            value={formData.publicationYear}
                            onChange={handleInputChange}
                            min='1000'
                            max='2025'
                            placeholder='2024'
                        />
                    </div>

                    <div className='form-row'>
                        <label htmlFor='language'>Language</label>
                        <input
                            type='text'
                            id='language'
                            name='language'
                            value={formData.language}
                            onChange={handleInputChange}
                            placeholder='Language'
                        />
                    </div>

                    <div className='form-row'>
                        <label htmlFor='pages'>Pages</label>
                        <input
                            type='number'
                            id='pages'
                            name='pages'
                            value={formData.pages}
                            onChange={handleInputChange}
                            min='1'
                            placeholder='300'
                        />
                    </div>

                    <div className='form-row'>
                        <label htmlFor='imageUrl'>Book Cover URL</label>
                        <input
                            type='url'
                            id='imageUrl'
                            name='imageUrl'
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            placeholder='https://example.com/book-cover.jpg'
                        />
                    </div>

                    <div className='form-actions'>
                        <button
                            type='submit'
                            className='btn-save'>
                            UPDATE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
