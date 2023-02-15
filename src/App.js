import React, { useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import data from "./data.json";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  const [toggleComponent, setToggleComponent] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [id, setIdCount] = useState(11);
  //id set count to 11 for new ids since 1 - 10 are used in json data
  const [employeeInfo, setEmployeeInfo] = useState({
    fullName: "",
    jobTitle: "",
    emailAddress: "",
    phoneNumber: "",
  });
  const [editId, setEditId] = useState(-1);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchInput, setSearchInput] = useState("");
  //editId is used when clicked on edit button, setting current row id as state and enabling edit component
  const handleButtonClick = () => {
    setToggleComponent(!toggleComponent);
  };
  const searchEmployee = (e) => {
    e.preventDefault();
    const filterBy = e.target.elements.search.value.toLowerCase();
    //filtering data json for what was typed in the input
    const filterObject = data.find(
      (obj) =>
        obj.fullName.toLowerCase() === filterBy ||
        obj.jobTitle.toLowerCase() === filterBy ||
        obj.emailAddress.toLowerCase() === filterBy
    );
    if (filterObject) {
      const newEmployee = [...tableData, filterObject];
      setTableData(newEmployee);
      e.target.elements.search.value = "";
      setErrorMsg("");
    } else {
      setErrorMsg("Employee not found");
    }
  };
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    if (searchInput) setErrorMsg("");
  }

  //handleChange to get target value and update state in adding inputs for employee form
  const handleChange = (e) => {
    const newInfo = (value) => ({
      ...value,
      [e.target.name]: e.target.value,
    });
    setEmployeeInfo(newInfo);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //if all fields are not empty '', then checkEmptyInput is true;
    //id was not a property for employee form so we are adding key value pair
    setIdCount(id + 1);
    const newData = (data) => [...data, employeeInfo];
    employeeInfo["id"] = id;
    setTableData(newData);
    const emptyInput = {
      fullName: "",
      jobTitle: "",
      emailAddress: "",
      phoneNumber: "",
    };
    setEmployeeInfo(emptyInput);
  };
  //these handlers are being used to compare with current row id so you can get the row clicked on
  const handleUpdate = (e) => {
    e.preventDefault();
    setEditId(-1);
  };
  //being passed when edit button clicked to set current row id that you want to edit
  const handleEdit = (id) => {
    setEditId(id);
  };

  return (
    <div className="main">
      <div className="row">
        <div className="col-sm-12">
          <Navbar />
        </div>
        {toggleComponent ? (
          <div className="col-sm-12">
            <SearchBar
              handleButtonClick={handleButtonClick}
              searchEmployee={searchEmployee}
              errorMsg={errorMsg}
              handleSearchInput={handleSearchInput}
            />
          </div>
        ) : (
          <div className="col-sm-12 d-flex justify-content-center employeeForm">
            <EmployeeForm
              handleChange={handleChange}
              employeeInfo={employeeInfo}
              handleSubmit={handleSubmit}
              handleButtonClick={handleButtonClick}
            />
          </div>
        )}
        {tableData.length > 0 ? (
          <div className="col-sm-12 d-flex justify-content-center">
            <EmployeeTable
              tableData={tableData}
              setTableData={setTableData}
              editId={editId}
              handleEdit={handleEdit}
              employeeInfo={employeeInfo}
              handleUpdate={handleUpdate}
            />
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default App;
