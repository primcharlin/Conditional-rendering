import React from "react";
import "./App.css";

export default function BookFilter({
    filterCriteria,
    onFilterChange,
    onClearFilters,
    authors,
}) {
    return (
        <div className='filter-controls'>
            <h3>Filter Books</h3>
            <div className='filter-row'>
                <div className='filter-group'>
                    <label htmlFor='author-filter'>Author:</label>
                    <select
                        id='author-filter'
                        name='author'
                        value={filterCriteria.author}
                        onChange={onFilterChange}
                        className='author-dropdown'>
                        <option value=''>All Authors</option>
                        {authors.map((author, index) => (
                            <option
                                key={index}
                                value={author}>
                                {author}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className='btn-clear-filters'
                    onClick={onClearFilters}
                    title='Clear all filters'>
                    Clear Filters
                </button>
            </div>
        </div>
    );
}
