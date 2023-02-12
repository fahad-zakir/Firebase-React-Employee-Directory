import React from "react";
import Button from "react-bootstrap/Button";

function SearchBar({ handleButtonClick, searchEmployee, error }) {
  return (
    <form className="search--form" onSubmit={searchEmployee}>
      <input
        className="search--input"
        type="text"
        name="search"
        placeholder="search by name, email, or job title..."
        autoComplete="off"
      />
      <div className="search--buttons">
        <button className="btn btn-info search--button">Search Employee</button>
        <Button
          onClick={handleButtonClick}
          type="button"
          className="btn btn-success add--button"
        >
          Add
        </Button>
      </div>
    </form>
  );
}

export default SearchBar;