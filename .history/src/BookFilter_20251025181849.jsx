import React from "react";
import "./App.css";

export default function BookFilter({
    filterCriteria,
    onFilterChange,
    authors,
}) {
    return (
        <div className='filter-controls'>
            <h3>Filter Books by Author</h3>
            <div className='filter-row'>
                <div className='filter-group'>
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
            </div>
        </div>
    );
}
