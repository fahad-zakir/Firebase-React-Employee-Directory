import React from 'react';
import Button from "react-bootstrap/Button";

function EmployeeForm({ handleChange, employeeInfo, handleSubmit, handleButtonClick }) {
  return (
    <div className="form-row row">
      <div className="col-sm-3">
        <input
          type="text"
          onChange={handleChange}
          value={employeeInfo.fullName}
          name="fullName"
          className="form-control"
          placeholder="Full Name"
        />
      </div>
      <div className="col-sm-3">
        <input
          type="email"
          onChange={handleChange}
          value={employeeInfo.emailAddress}
          name="emailAddress"
          className="form-control"
          placeholder="Email Address"
        />
      </div>
      <div className="col-sm-3">
        <input
          type="text"
          name="jobTitle"
          onChange={handleChange}
          value={employeeInfo.jobType}
          className="form-control"
          placeholder="Job Title"
        />
      </div>
      <div className="col">
        <input
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        />
      </div>
      <Button
        onClick={handleButtonClick}
        type="button"
        className="col btn btn-danger add--button"
      >
        Cancel
      </Button>
    </div>
  );
}

export default EmployeeForm;