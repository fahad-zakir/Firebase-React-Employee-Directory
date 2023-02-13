import React from "react";

function EditForm({ data, tableData, setTableData }) {
  const handleNameAttribute = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const updatedData = tableData.map((d) =>
      d.id === data.id ? { ...d, [name]: value } : d
    );
    setTableData(updatedData);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          onChange={handleNameAttribute}
          value={data.fullName}
          name="fullName"
          className="form-control"
          placeholder="Full Name"
        />
      </td>
      <td>
        <input
          type="text"
          onChange={handleNameAttribute}
          value={data.jobTitle}
          name="jobTitle"
          className="form-control"
          placeholder="Job Title"
        />
      </td>
      <td>
        <input
          type="email"
          onChange={handleNameAttribute}
          value={data.emailAddress}
          name="emailAddress"
          className="form-control"
          placeholder="Email Address"
        />
      </td>
      <td>
        <input
          type="number"
          onChange={handleNameAttribute}
          value={data.phoneNumber}
          name="phoneNumber"
          className="form-control"
          placeholder="Phone Number"
        />
      </td>
      <td className="td-custom">
        <button type="submit" className="btn-success btn-td-save">
          save
        </button>
      </td>
    </tr>
  );
}

export default EditForm;
