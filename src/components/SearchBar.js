import React from 'react';
import Button from "react-bootstrap/Button";

function SearchBar () {
    return (
      <div>
        <form className="search--form">
          <input
            className="search--input"
            type="text"
            name="search"
            placeholder="search by name, email, or job title..."
          />
        </form>
        <div className="search--buttons">
          <Button type="button" className="btn btn-info search--button">
            Search Employee
          </Button>
          <Button type="button" className="btn btn-danger add--button">
            Add
          </Button>
        </div>
      </div>
    );
}

export default SearchBar
