import React from "react";
import Table from "react-bootstrap/Table";
import EditForm from "./EditForm";

function EmployeeTable({
  tableData,
  setTableData,
  handleEdit,
  editId,
  employeeInfo,
  handleUpdate,
}) {
  return (
    <form
      className="col-sm-12 d-flex justify-content-center"
      onSubmit={handleUpdate}
    >
      <Table
        striped
        bordered
        hover
        className="tableData table-responsive-sm"
      >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Email Address</th>
            <th>Job Title</th>
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
                <td>{data.emailAddress}</td>
                <td>{data.jobTitle}</td>
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
