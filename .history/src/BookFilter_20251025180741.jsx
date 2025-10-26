import React from "react";
import "./App.css";

export default function BookFilter({
    filterCriteria,
    onFilterChange,
    onClearFilters,
}) {
    return (
        <div className='filter-controls'>
            <h3>Filter Books</h3>
            <div className='filter-row'>
                <div className='filter-group'>
                    <label htmlFor='author-filter'>Author:</label>
                    <input
                        type='text'
                        id='author-filter'
                        name='author'
                        value={filterCriteria.author}
                        onChange={onFilterChange}
                        placeholder='Filter by author...'
                    />
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
