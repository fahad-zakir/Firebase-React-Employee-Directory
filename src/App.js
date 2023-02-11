import React, { useState } from "react";
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import data from "./data.json";
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';

function App() {
  const [showComponent1, setShowComponent1] = useState(true);
  const [tabledata, setTableData] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState({
     fullName: "",
     emailAddress: "",
     jobTitle: "",
   });
  const [editEmployee, setEditEmployee] = useState({
    fullName: "",
    emailAddress: "",
    jobTitle: "",
  });
  const handleButtonClick = () => {
    setShowComponent1(!showComponent1);
  };
    const searchEmployee = (e) => {
      e.preventDefault();
      const filterBy = e.target.elements.search.value.toLowerCase()
      data.filter((x) => {
        if (
          x.fullName.toLowerCase() == filterBy ||
          x.emailAddress.toLowerCase() == filterBy ||
          x.jobTitle.toLowerCase() == filterBy
        ) {
          // console.log(x);
              const newTodos = [...tabledata, x ];
              setTableData (newTodos);
        }
      });
    };
//initial static state for adding employee info to the form 
//handleChange to get target name 
 const handleChange = (e) => {
   const newName = (value) => ({
     ...value,
     [e.target.name]: e.target.value,
   });
   setEmployeeInfo(newName);
 };

 const handleSubmit = (e) => {
   e.preventDefault();
   //if any array is not any empty '', then checkEmptyInput is true;
   const checkEmptyInput = !Object.values(employeeInfo).every(
     (res) => res === ""
   );
   if (checkEmptyInput) {
     const newData = (data) => [...data, employeeInfo];
     setTableData(newData);
    //  const emptyInput = { fullName: "", emailAddress: "", jobTitle: "" };
    //  setEmployeeInfo(emptyInput);
   }
 };

  return (
    <div className="main">
      <div className="row">
        <div className="col-sm-12">
          <Navbar />
        </div>

        {showComponent1 ? (
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
            <EmployeeTable tabledata={tabledata} />
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default App;
