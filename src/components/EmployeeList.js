import React from "react";
import Table from "react-bootstrap/Table";
import UpdateEmployee from "./UpdateEmployee";

function EmployeeList({
  localList,
  setLocalList,
  handleEdit,
  editId,
  employeeInfo,
  handleUpdate,
  toggleComponent,
}) {
  return toggleComponent ? (
    <form
      className="col-sm-12 d-flex flex-column align-items-center"
      onSubmit={handleUpdate}
    >
      <Table
        striped
        bordered
        hover
        className="employeeListDb table-responsive-sm"
      >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Job Title</th>
            <th>Email Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {localList.map((data, index) => {
            return editId === data.id ? (
              <UpdateEmployee
                key={data.id}
                employeeInfo={employeeInfo}
                data={data}
                localList={localList}
                setLocalList={setLocalList}
                handleEdit={handleEdit}
              />
            ) : (
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
    </form>
  ) : null;
}

export default EmployeeList;
