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
  const [tabledata, setTableData] = useState([]);
  const [id, setIdCount] = useState(11);
  //id set count to 11 for new ids since 1 - 10 are id 1 - 10 are used in json data
  const [employeeInfo, setEmployeeInfo] = useState({
    fullName: "",
    emailAddress: "",
    jobTitle: "",
  });
  const [activeId, setActiveId] = useState(-1);
  //activeId is used for edit
  const handleButtonClick = () => {
    setToggleComponent(!toggleComponent);
  };
  const searchEmployee = (e) => {
    e.preventDefault();
    const filterBy = e.target.elements.search.value.toLowerCase();
    //filtering data json for what wast typed in the input 
    data.filter((x) => {
      if (
        x.fullName.toLowerCase() == filterBy ||
        x.emailAddress.toLowerCase() == filterBy ||
        x.jobTitle.toLowerCase() == filterBy
      ) {
        const newEmployee = [...tabledata, x];
        setTableData(newEmployee);
        e.target.elements.search.value = "";
      }
    });
  };
  //initial static state for adding employee info to the form
  //handleChange to get target name and update state 
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
    const checkEmptyInput = !Object.values(employeeInfo).every(
      (res) => res === ""
    );
    if (checkEmptyInput) {
      setIdCount(id + 1);
      const newData = (data) => [...data, employeeInfo];
      employeeInfo["id"] = id;
      setTableData(newData);
      const emptyInput = { fullName: "", emailAddress: "", jobTitle: "" };
      setEmployeeInfo(emptyInput);
    }
  };
  //these handlers are being used to compare with current tableid so you can get the row clicked on
  const handleUpdate = (e) => {
    e.preventDefault();
    setActiveId(-1);
  };
  function handleEdit(id) {
    setActiveId(id);
  }

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
            />
          </div>
        ) : (
          <div className="col-sm-12 employeeForm">
            <EmployeeForm
              handleChange={handleChange}
              employeeInfo={employeeInfo}
              handleSubmit={handleSubmit}
              handleButtonClick={handleButtonClick}
            />
          </div>
        )}
        {tabledata.length > 0 ? (
          <div className="col-sm-12 d-flex justify-content-center">
            <EmployeeTable
              tabledata={tabledata}
              setTableData={setTableData}
              activeId={activeId}
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
