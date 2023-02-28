import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";

function SearchEmployee({
  handleButtonClick,
  searchEmployee,
  errorMsg,
  handleSearchInput,
}) {
  const isSmallScreen = useMediaQuery("(min-width:600px)");
  const [showSheet, setShowSheet] = useState(false);
  function createData(fullName, jobTitle, emailAddress) {
    return { fullName, jobTitle, emailAddress };
  }
  const rows = [
    createData(
      "Fahad Zakir",
      "Programmer",
      "fahadzakir11@gmail.com"
    ),
    createData("John Wick", "Actor", "johnfox@aol.com"),
    createData(
      "Ashley Thompson",
      "Director",
      "ashley25@gmail.com"
    ),
    createData("Mike Miller", "Doctor", "drmike@gmail.com"),
    createData("Fred Taylor", "Athlete", "fred@gmail.com"),
    createData("Tom Hanks", "Actor", "	tomhanks@gmail.com"),
    createData(
      "David Robinson",
      "Pro Basketball Player",
      "davidrobinson@gmail.com"
    ),
    createData(
      "Russel Westbrook",
      "Pro Basketball Player",
      "russ@gmail.com"
    ),
    createData("Liam Neeson", "Actor", "	lisamneeson@aol.com"),
    createData("Dawud Zakir", "Doctor", "drdawud@gmail.com"),
  ];
  return (
    <form className="search--form" onSubmit={searchEmployee}>
      <div className="col-sm-12">
        <Typography
          mt={5}
          ml={isSmallScreen ? 5 : 6}
          className="custom-info"
          variant="body2"
        >
          <p
            className="employees-list-hover"
            onMouseEnter={() => setShowSheet(true)}
            onMouseLeave={() => setShowSheet(false)}
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
                width: isSmallScreen ? "35%" : "75%",
                marginLeft: "2px",
              }}
              variant="plain"
              color="neutral"
              sx={{
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
                  {rows.map((row) => (
                    <tr key={row.fullName}>
                      <td>{row.fullName}</td>
                      <td>{row.jobTitle}</td>
                      <td>{row.emailAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          )}
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
