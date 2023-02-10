import React from 'react';

function SearchBar () {
    return (
        <div>
        <form className="search--form" >
            <input className="search--input" type="text" name="search" placeholder="search by name, email, or job title..."/>
        </form>
        <div className="search--buttons">
            <button className="search--button">Search Employee</button>
            <button className="add--button">Add</button>
        </div>
        </div>
  );
}

export default SearchBar
