import React from "react";
import Button from "react-bootstrap/Button";

function AddEmployee({
  handleChange,
  employeeInfo,
  handleSubmit,
  handleButtonClick,
  editId
  })
  {
  return (
    <form
      onSubmit={handleSubmit}
      className="form-container row d-flex justify-content-center"
    >
      <h3 id="form-signup" className="col-sm-12 d-flex justify-content-center">
        Add Employee
      </h3>
      <div className="col-sm-12">
        <label>Employee Name:</label>
        <input
          type="text"
          onChange={handleChange}
          value={employeeInfo.fullName || ""}
          name="fullName"
          className="form-control"
          placeholder="Full Name"
        />
      </div>
      <div className="col-sm-12">
        <label>Job Title</label>
        <input
          type="text"
          onChange={handleChange}
          value={employeeInfo.jobTitle || ""}
          name="jobTitle"
          className="form-control"
          placeholder="Job Title"
        />
      </div>
      <div className="col-sm-12">
        <label>Email</label>
        <input
          type="email"
          onChange={handleChange}
          value={employeeInfo.emailAddress || ""}
          name="emailAddress"
          className="form-control"
          placeholder="Email Address"
        />
      </div>
      <div className="col-sm-12">
        <label>Phone Number</label>
        <input
          type="text"
          onChange={handleChange}
          value={employeeInfo.phoneNumber || ""}
          name="phoneNumber"
          className="form-control"
          placeholder="Phone Number"
        />
      </div>
      <div className="col-sm-12 d-flex justify-content-center form-buttons">
        <input
          type="submit"
          value={editId ? "Update" : "Submit"}
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

export default AddEmployee;
