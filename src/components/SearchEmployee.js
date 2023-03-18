import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";

function SearchEmployee({
  handleButtonClick,
  searchEmployee,
  errorMsg,
  handleSearchInput,
  employeeListDb
}) {
  const isSmallScreen = useMediaQuery("(min-width:600px)");
  const [showSheet, setShowSheet] = useState(false);
  return (
    <form
      className="search--form"
      onSubmit={searchEmployee}
      onMouseLeave={() => setShowSheet(false)}
    >
      <div className="col-sm-12">
          <p
            className="employees-list-hover"
            onMouseEnter={() => setShowSheet(true)}
          >
            Hover here for employee list that you can use to search by either
            name, job title or email address.
          </p>
          {showSheet && (
            <Sheet
              style={{
                color: "white",
                position: "absolute",
                zIndex: 1,
                width: isSmallScreen ? "35%" : "70%",
                marginLeft: "6px",
              }}
              className="custom-sheet"
              variant="plain"
              color="neutral"
              sx={{
                "--TableCell-height": "40px",
                // the number is the amount of the header rows.
                "--TableHeader-height": "calc(1 * var(--TableCell-height))",
                height: 300,
                overflow: "auto",
                pt: 1,
                borderRadius: "sm",
                transition: "0.3s",
                background: (theme) =>
                  `linear-gradient(45deg, #373a3a, #545252)`,
                "& tr:last-child": {
                  "& td:first-child": {
                    borderBottomLeftRadius: "8px",
                  },
                  "& td:last-child": {
                    borderBottomRightRadius: "8px",
                  },
                },
              }}
            >
              <Table size={isSmallScreen ? "sm" : "sm"}>
                <thead>
                  <tr>
                    <th
                      style={
                        isSmallScreen ? { width: "13%" } : { width: "10%" }
                      }
                    >
                      Name
                    </th>
                    <th
                      style={
                        isSmallScreen ? { width: "13%" } : { width: "10%" }
                      }
                    >
                      Title
                    </th>
                    <th
                      style={
                        isSmallScreen ? { width: "15%" } : { width: "16%" }
                      }
                    >
                      Email Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employeeListDb.map((employee, index) => (
                    <tr key={index}>
                      <td>{employee.fullName}</td>
                      <td>{employee.jobTitle}</td>
                      <td>{employee.emailAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          )}
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
