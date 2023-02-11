import React from "react";
import Button from "react-bootstrap/Button";

function EmployeeForm({ handleChange, employeeInfo, handleSubmit, handleButtonClick }) {

  return (
    <div className="form-row justify-content-center row">
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
          onChange={handleChange}
          value={employeeInfo.jobTitle}
          name="jobTitle"
          className="form-control"
          placeholder="Job Title"
        />
      </div>
      <div className="col-sm-12 d-flex justify-content-center">
        <input
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary form-buttons"
        />
        <Button
          type="button"
          className="btn-danger add--button form-buttons"
          onClick={handleButtonClick}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default EmployeeForm;
