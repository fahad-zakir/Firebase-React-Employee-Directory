import React from "react";
import Button from "react-bootstrap/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

function SearchEmployee({
  handleButtonClick,
  searchEmployee,
  errorMsg,
  handleSearchInput,
}) {
  const isSmallScreen = useMediaQuery("(min-width:600px)");
  return (
    <form className="search--form" onSubmit={searchEmployee}>
      <div className="col-sm-4">
        <Typography
          mt={5}
          ml={5}
          className="custom-info"
          variant="body2"
          style={{
            display: isSmallScreen ? "none" : "block",
          }}
        >
          Search for an employee by either entering a full name, job title or an
          email address.
        </Typography>
      </div>
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
          Add Employee
        </Button>
      </div>
    </form>
  );
}

export default SearchEmployee;
