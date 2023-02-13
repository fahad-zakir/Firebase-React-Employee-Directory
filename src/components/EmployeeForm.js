import React from "react";
import Button from "react-bootstrap/Button";

function EmployeeForm({
  handleChange,
  employeeInfo,
  handleSubmit,
  handleButtonClick,
}) {
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-sm-12 flex-column custom-form justify-content-center">
        <input
          type="text"
          onChange={handleChange}
          value={employeeInfo.fullName}
          name="fullName"
          className="form-control"
          placeholder="Full Name"
        />
        <input
          type="text"
          onChange={handleChange}
          value={employeeInfo.jobTitle}
          name="jobTitle"
          className="form-control"
          placeholder="Job Title"
        />
        <input
          type="email"
          onChange={handleChange}
          value={employeeInfo.emailAddress}
          name="emailAddress"
          className="form-control"
          placeholder="Email Address"
        />
        <input
          type="text"
          onChange={handleChange}
          value={employeeInfo.phoneNumber}
          name="phoneNumber"
          className="form-control"
          placeholder="Phone Number"
        />
      </div>
      <div className="col-sm-12 d-flex justify-content-center form-buttons">
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
