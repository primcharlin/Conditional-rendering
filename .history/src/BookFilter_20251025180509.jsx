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
                    <label htmlFor='publisher-filter'>Publisher:</label>
                    <input
                        type='text'
                        id='publisher-filter'
                        name='publisher'
                        value={filterCriteria.publisher}
                        onChange={onFilterChange}
                        placeholder='Filter by publisher...'
                    />
                </div>
                <div className='filter-group'>
                    <label htmlFor='language-filter'>Language:</label>
                    <input
                        type='text'
                        id='language-filter'
                        name='language'
                        value={filterCriteria.language}
                        onChange={onFilterChange}
                        placeholder='Filter by language...'
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
