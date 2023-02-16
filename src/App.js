import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import EmployeeDataService from "../src/firebase_crud_actions/crud";
// import { addDoc, collection, setDoc, deleteDoc, doc, query, onSnapshot } from "firebase/firestore";
import { db } from './firebase_setup/firebase';
import { v4 as uuidv4 } from "uuid"; 
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  const [info, setInfo] = useState([]);
  const [isUpdate, setisUpdate] = useState(false);
  const [docId, setdocId] = useState("");
  const [employeeDatabase, setEmployeeDatabase] = useState();
  const [toggleComponent, setToggleComponent] = useState(true);
  const [toggleForm, setToggleForm] = useState(true);
  const [toggleSearch, setToggleSearch] = useState(true);
  const [toggleTableButton, setToggleTableButton] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState({ error: false, msg: "" });

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
  useEffect(() => {
    getEmployees();

   
    }, []);
    const getEmployees = async() => {
      const data = await EmployeeDataService.getAllEmployees();
      setEmployeeDatabase(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(employeeDatabase)
    }
  const handleButtonClick = () => {
    setToggleComponent(!toggleComponent);
    setToggleSearch(!toggleSearch);
  };
  const searchEmployee = (e) => {
    e.preventDefault();
    const filterBy = e.target.elements.search.value.toLowerCase();
    //filtering data json for what was typed in the input
    const filterObject = employeeDatabase.find(
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
    setMessage("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (Object.values(employeeInfo).some((value) => value === undefined || value === "")) {
      setMessage({ error: true, msg: "All fields are required!" });
      return;
    }
    //id was not a property for employee form so we are adding key value pair
    const newEmployee = (data) => [...data, employeeInfo];
    employeeInfo["id"] = uuidv4();
    setTableData(newEmployee);
    const emptyInput = {
      fullName: "",
      jobTitle: "",
      emailAddress: "",
      phoneNumber: "",
    };
    setEmployeeInfo(emptyInput);
    setToggleForm(!toggleForm);
    try {
      await EmployeeDataService.addEmployees(employeeInfo);
      console.log('worked')
    } catch (err) {
      console.log('did not work')
    }
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

  const handleToggleForm = () => {
    setToggleForm(!toggleForm);
    setToggleSearch(!toggleSearch);
  }

  return (
    <div className="main">
      {/* <pre>{JSON.stringify(employeeDatabase, undefined, 8)}</pre> */}
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
          <div className="col-sm-12 row d-flex justify-content-center employeeForm">
            {message?.msg && (
              <Alert variant="danger" onClose={() => setMessage(false)}>
                {message?.msg}
                <button
                  className="alert-msg-btn"
                  onClick={() => setMessage("")}
                >
                  x
                </button>
              </Alert>
            )}
            {toggleForm ? (
              <div className="col-sm-12 d-flex justify-content-center">
                <EmployeeForm
                  handleChange={handleChange}
                  employeeInfo={employeeInfo}
                  handleSubmit={handleSubmit}
                  handleButtonClick={handleButtonClick}
                />
              </div>
            ) : null}
          </div>
        )}
        {tableData.length > 0 && !toggleSearch ? (
          <div className="col-sm-12 d-flex justify-content-center">
            <EmployeeTable
              tableData={tableData}
              setTableData={setTableData}
              editId={editId}
              handleEdit={handleEdit}
              employeeInfo={employeeInfo}
              handleUpdate={handleUpdate}
              toggleForm={toggleForm}
              handleToggleForm={handleToggleForm}
              toggleTableButton={setToggleTableButton}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
