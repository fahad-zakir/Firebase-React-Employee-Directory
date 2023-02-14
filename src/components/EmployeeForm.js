import React from "react";
import Button from "react-bootstrap/Button";

function EmployeeForm({
  handleChange,
  employeeInfo,
  handleSubmit,
  handleButtonClick,
}) {
  return (
    <form onSubmit={handleSubmit} className="row d-flex justify-content-center">
      <div className="col-sm-12 custom-form">
        <input
          type="text"
          onChange={handleChange}
          value={employeeInfo.fullName}
          name="fullName"
          className="form-control"
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          value={employeeInfo.jobTitle}
          name="jobTitle"
          className="form-control"
          placeholder="Job Title"
          required
        />
        <input
          type="email"
          onChange={handleChange}
          value={employeeInfo.emailAddress}
          name="emailAddress"
          className="form-control"
          placeholder="Email Address"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          value={employeeInfo.phoneNumber}
          name="phoneNumber"
          className="form-control"
          placeholder="Phone Number"
          required
        />
      </div>
      <div className="col-sm-12 d-flex justify-content-center form-buttons">
        <input
          type="submit"
          value="Submit"
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
    </form>
  );
}

export default EmployeeForm;
