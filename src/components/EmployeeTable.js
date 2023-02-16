import React from "react";
import Table from "react-bootstrap/Table";
import EditForm from "./EditForm";
import { Button } from "react-bootstrap";


function EmployeeTable({
  tableData,
  setTableData,
  handleEdit,
  editId,
  employeeInfo,
  handleUpdate,
  handleToggleForm,
  toggleForm,
  toggleSearch,
  toggleTableButton
}) {
  return (
    <form
      className="col-sm-12 d-flex flex-column align-items-center"
      onSubmit={handleUpdate}
    >
      {!toggleForm ?
      <button type="button" className="btn-success add--employee" onClick={handleToggleForm}>
        Add Employee
      </button>
      : null }
      <Table striped bordered hover className="tableData table-responsive-sm">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Job Title</th>
            <th>Email Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => {
            return editId === data.id ? (
              <EditForm
                key={index}
                employeeInfo={employeeInfo}
                data={data}
                tableData={tableData}
                setTableData={setTableData}
              />
            ) : (
              <tr key={index}>
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
    </form>
  );
}

export default EmployeeTable;
