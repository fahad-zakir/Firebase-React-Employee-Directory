import React from 'react';
import Table from 'react-bootstrap/Table';


function EmployeeTable({ tabledata }) {
  return (
    <Table striped bordered hover className="tableData" style={{width:"80%"}}>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Email Address</th>
          <th>Job Title</th>
        </tr>
      </thead>
            <tbody>
        {tabledata.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.fullName}</td>
              <td>{data.emailAddress}</td>
              <td>{data.jobTitle}</td>
              <td className="td-custom">
                <button type="button" className="btn-success btn-td">
                  edit
                </button>
              </td>
            </tr>
          );
        })}
        
      </tbody>
    </Table>
  );
}

export default EmployeeTable;
