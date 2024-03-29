import React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import useMediaQuery from "@mui/material/useMediaQuery";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";

function EmployeeList({
  localList,
  handleEdit,
  handleUpdate,
  toggleComponent,
}) {
  const isSmallScreen = useMediaQuery("(min-width:600px)");
  return toggleComponent ? (
    <form
      className="col-sm-12 d-flex flex-column align-items-center"
      onSubmit={handleUpdate}
    >
      <Sheet
        style={{
          width: isSmallScreen ? "80%" : "105%",
          marginTop: "5%",
          marginBottom: "3%",
          marginLeft: isSmallScreen ? "2px" : "0px",
        }}
        variant="solid"
        color="primary"
        invertedColors
        sx={{
          pt: 1,
          borderRadius: "sm",
          transition: "0.3s",
          background: (theme) => `linear-gradient(45deg, #ecf1f0, #cccccc)`,
          "& tr:last-child": {
            "& td:first-of-type": {
              borderBottomLeftRadius: "8px",
            },
            "& td:last-child": {
              borderBottomRightRadius: "8px",
            },
          },
        }}
      >
        <Table size={isSmallScreen ? "lg" : "sm"}>
          <thead>
            <tr>
              <th style={isSmallScreen ? { width: "25%" } : { width: "20%" }}>
                Name
              </th>
              <th style={isSmallScreen ? { width: "25%" } : { width: "20%" }}>
                Title
              </th>
              <th style={{ width: "32%" }}>Email Address</th>
              <th style={isSmallScreen ? { width: "18%" } : { width: "25%" }}>
                Phone Number
              </th>
              <th
                style={isSmallScreen ? { width: "8%" } : { width: "10%" }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {localList.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td>{data.fullName}</td>
                  <td>{data.jobTitle}</td>
                  <td>{data.emailAddress}</td>
                  <td>{data.phoneNumber} </td>
                  <td className="td-custom">
                    <ModeEditOutlineTwoToneIcon
                      fontSize={isSmallScreen ? "medium" : "small"}
                      onClick={() => handleEdit(data.id)}
                      style={{ cursor: "pointer" }}
                    />
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
