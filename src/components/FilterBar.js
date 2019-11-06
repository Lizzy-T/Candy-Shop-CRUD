import React from 'react'
import './FilterBar.css'

export default function FilterBar (props) {
    const { searchTerms, handleSearch} = props
    return (
        <form className="filter-bar">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerms}
                onChange={handleSearch}
            />
        </form>
    )
}