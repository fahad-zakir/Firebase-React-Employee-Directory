import React from "react";

function EditForm({ data, tabledata, setTableData }) {
  const handleName = (e) => {
    const name = e.target.value;
    const updatedData = tabledata.map((d) =>
      d.id === data.id ? { ...d, fullName: name } : d
    );
    setTableData(updatedData);
  }
  const handleEmail = (e) => {
    const email = e.target.value;
    const updatedData = tabledata.map((d) =>
      d.id === data.id ? { ...d, emailAddress: email } : d
    );
    setTableData(updatedData);
  };
  const handleJobTitle = (e) => {
    const job = e.target.value;
    const updatedData = tabledata.map((d) =>
      d.id === data.id ? { ...d, jobTitle: job } : d
    );
    setTableData(updatedData);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          onChange={handleName}
          value={data.fullName}
          name="fullName"
          className="form-control"
          placeholder="Full Name"
        />
      </td>
      <td>
        <input
          type="email"
          onChange={handleEmail}
          value={data.emailAddress}
          name="emailAddress"
          className="form-control"
          placeholder="Email Address"
        />
      </td>
      <td>
        <input
          type="text"
          onChange={handleJobTitle}
          value={data.jobTitle}
          name="jobTitle"
          className="form-control"
          placeholder="Job Title"
        />
      </td>
      <td className="td-custom">
        <button type="submit" className="btn-success btn-td">
          save
        </button>
      </td>
    </tr>
  );
}

export default EditForm;
