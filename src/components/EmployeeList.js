import React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import useMediaQuery from "@mui/material/useMediaQuery";

function EmployeeList({ localList, handleEdit, handleUpdate, toggleComponent,}) {
  const isSmallScreen = useMediaQuery("(min-width:600px)");

  return toggleComponent ? (
    <form
      className="col-sm-12 d-flex flex-column align-items-center"
      onSubmit={handleUpdate}
    >
      <Sheet
        style={{ width: 
            isSmallScreen ? (
              "80%"
            ) : (
              "100%"
            )
          , marginTop: "5%", marginLeft: "2px" }}
        variant="solid"
        color="primary"
        invertedColors
        sx={{
          pt: 1,
          borderRadius: "sm",
          transition: "0.3s",
          background: (theme) => `linear-gradient(45deg, #ecf1f0, #cccccc)`,
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
        <Table
          size={
            isSmallScreen ? (
              "lg"
            ) : (
              "sm"
            )
          }
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {localList.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td>{data.fullName}</td>
                  <td>{data.jobTitle}</td>
                  <td>{data.emailAddress}</td>
                  <td>{data.phoneNumber}</td>
                  <td className="td-custom">
                    <button
                      type="button"
                      className="btn-danger btn-td"
                      onClick={() => handleEdit(data.id)}
                    >
                      edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Sheet>
    </form>
  ) : null;
}

export default EmployeeList;
