import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import EmployeeDataService from "../src/firebase_crud_actions/crud";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import SearchEmployee from "./components/SearchEmployee";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [toggleComponent, setToggleComponent] = useState(true);
  const [toggleSearch, setToggleSearch] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [localList, setLocalList] = useState([]);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [employeeInfo, setEmployeeInfo] = useState({
    fullName: "",
    jobTitle: "",
    emailAddress: "",
    phoneNumber: "",
  });
  const [editId, setEditId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [searchInput, setSearchInput] = useState("");

  //get all employees from firestore db
  useEffect(() => {
    getEmployees();
  }, []);
  const getEmployees = async () => {
    const data = await EmployeeDataService.getAllEmployees();
    setEmployeeList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const searchEmployee = async(e) => {
    e.preventDefault();
    const filterBy = e.target.elements.search.value.toLowerCase();
    //filtering dfor what was searched in the input for search employee to see if employee exists in db
    const findEmployee = employeeList.find(
      (obj) =>
        obj.fullName.toLowerCase() === filterBy ||
        obj.jobTitle.toLowerCase() === filterBy ||
        obj.emailAddress.toLowerCase() === filterBy
    );
    if (findEmployee) {
      //get employee detail by employee id from firebase
      const data = await EmployeeDataService.getEmployee(findEmployee.id);
      const employee = (e) => [...e, data.data()];
      setLocalList(employee);
      e.target.elements.search.value = "";
      setErrorMsg("");
    } else {
      setErrorMsg("Employee not found");
    }
  };
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    if (searchInput) setErrorMsg("");
  };

  //employee form input field changes
  const handleChange = (e) => {
    const newInfo = (value) => ({
      ...value,
      [e.target.name]: e.target.value,
    });
    setEmployeeInfo(newInfo);
    setMessage("");
  };

  //////////////////////////////////////////////
  //Add employee
  //////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
      const emptyInput = {
        fullName: "",
        jobTitle: "",
        emailAddress: "",
        phoneNumber: "",
      };
    if (
      Object.values(employeeInfo).some(
        (value) => value === undefined || value === ""
      )
    ) {
      setMessage({ error: true, msg: "All fields are required!" });
      return;
    }
    try {
      const docRef = await EmployeeDataService.addEmployees(employeeInfo);
      setMessage({ error: false, msg: "New employee added" });
      employeeInfo["id"] = docRef.id;
      const newEmployee = (data) => [...data, employeeInfo];
      setLocalList(newEmployee);
    } catch (err) {
      setMessage({ error: true, msg: "Error in adding employee" });
    }
    setEmployeeInfo(emptyInput);
  };
  //toggle handlers
  const handleButtonClick = () => {
    setToggleComponent(!toggleComponent);
    setToggleSearch(!toggleSearch);
  };

  //////////////////////////////////////////////
  //Update handlers
  //////////////////////////////////////////////
  //these handlers are being used to compare with current row id so you can get the row clicked on
  const handleUpdate = async (e) => {
    const updatedEmployee = localList.find((obj) => obj.id === editId);
    e.preventDefault();
    try {
      if (editId !== undefined && editId !== "") {
        await EmployeeDataService.updateEmployee(editId, updatedEmployee);
        setEditId("");
        setMessage({ error: false, msg: "Employee updated succesfully" });
      }
    } catch (err) {
      setMessage({ error: true, msg: "Error in updating employee" });
    }
    setEmployeeInfo("");
    setEditId("");
  };
  //id passed when edit button clicked to set current row id that you want to edit
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
            <SearchEmployee
              handleButtonClick={handleButtonClick}
              searchEmployee={searchEmployee}
              errorMsg={errorMsg}
              handleSearchInput={handleSearchInput}
            />
          </div>
        ) : (
          <div className="col-sm-12 row d-flex justify-content-center employeeForm">
            {message?.msg && (
              <Alert
                variant={message?.error ? "danger" : "success"}
                onClose={() => setMessage(false)}
              >
                {message?.msg}
                <button
                  className={
                    message?.error ? "alert-msg-btn" : "alert-msg-success"
                  }
                  onClick={() => setMessage("")}
                >
                  x
                </button>
              </Alert>
            )}
            <div className="col-sm-12 d-flex justify-content-center">
              <AddEmployee
                handleChange={handleChange}
                employeeInfo={employeeInfo}
                handleSubmit={handleSubmit}
                handleButtonClick={handleButtonClick}
              />
            </div>
          </div>
        )}
        {localList.length > 0 ? (
          <div className="col-sm-12 d-flex justify-content-center">
            <EmployeeList
              localList={localList}
              setLocalList={setLocalList}
              editId={editId}
              handleEdit={handleEdit}
              employeeInfo={employeeInfo}
              handleUpdate={handleUpdate}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
