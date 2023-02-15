import React from "react";
import Button from "react-bootstrap/Button";

function SearchBar({ handleButtonClick, searchEmployee, errorMsg, handleSearchInput }) {
  return (
    <form className="search--form" onSubmit={searchEmployee}>
      <div className="col-sm-12 d-flex justify-content-center">
        <input
          className="search--input"
          type="text"
          name="search"
          placeholder="search by name, email, or job title..."
          autoComplete="off"
          required
          onChange={handleSearchInput}
        />
      </div>
      <div className="error-msg col-sm-12 d-flex justify-content-center">
        {errorMsg}
      </div>
      <div className="search--buttons col-sm-12 d-flex justify-content-center">
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
