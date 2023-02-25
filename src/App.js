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
  const [employeeListDb, setEmployeeListDb] = useState([]);
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
    setEmployeeListDb(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const searchEmployee = async (e) => {
    e.preventDefault();
    const filterBy = e.target.elements.search.value.toLowerCase().trim();
    //filtering for what was searched in the input for search employee to see if employee exists in db
    const findEmployee = employeeListDb.find(
      (obj) =>
        obj.fullName.toLowerCase() === filterBy ||
        obj.jobTitle.toLowerCase() === filterBy ||
        obj.emailAddress.toLowerCase() === filterBy
    );
    if (findEmployee) {
      //get employee detail by employee id from firebase
      const data = await EmployeeDataService.getEmployee(findEmployee.id);
      const employee = (e) => [...e, data.data()];
      const nameExistsInList = localList.some(
        (el) => el.fullName.toLowerCase() === data.data().fullName.toLowerCase()
      );

      if (!nameExistsInList) setLocalList(employee);
      e.target.elements.search.value = "";
      setErrorMsg("");
    } else {
      setErrorMsg("Employee not found");
    }
  };
  //for clearing error msg
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
    const emptyEmployeeObj = {
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
    if (editId !== undefined && editId !== "") {
      try {
        //add newmployee to firefox db
        employeeInfo["id"] = editId;
        await EmployeeDataService.updateEmployee(editId, employeeInfo);
        const newEmployee = (data) => [...data, employeeInfo];
        setLocalList(newEmployee);
        setToggleComponent(!toggleComponent);
        localList.map((obj, index) => {
          if (obj.id === employeeInfo.id) {
            localList.splice(index, 1, employeeInfo);
          }
        });
        setLocalList(localList);
      } catch (err) {
        setMessage({ error: true, msg: "Error in adding employee" });
      }
      setEditId("");
    } else {
      const employeeExists = employeeListDb.some(employee => employee.fullName.toLowerCase() === employeeInfo.fullName.toLowerCase()
      );
        if (!employeeExists) {
      try {
        //add newmployee to firefox db
        const docRef = await EmployeeDataService.addEmployees(employeeInfo);
        employeeInfo["id"] = docRef.id;
        await EmployeeDataService.updateEmployee(docRef.id, employeeInfo);
        const newEmployee = (data) => [...data, employeeInfo];
        setLocalList(newEmployee);
        setToggleComponent(!toggleComponent);
      } catch (err) {
        setMessage({ error: true, msg: "Error in adding employee" });
      }
    } else {
      setMessage({error: true, msg: "Employee name already exists in the directory"})
    }
    }
    setEmployeeInfo(emptyEmployeeObj);
  };
  //toggle handlers
  const handleButtonClick = () => {
    setToggleComponent(!toggleComponent);
    setToggleSearch(!toggleSearch);
    setMessage("");
  };

  //////////////////////////////////////////////
  //Update functionality and update handlers
  //////////////////////////////////////////////
  //these handlers are being used to compare with current row id so you can get the row clicked on

  useEffect(() => {
    if (editId !== undefined && editId !== "") {
      handleUpdate();
    }
  }, [editId]);

  const handleUpdate = async () => {
    try {
      const docSnap = await EmployeeDataService.getEmployee(editId);
      setEmployeeInfo(docSnap.data());
    } catch (err) {
      console.log(`update didn't work`);
      setEmployeeInfo("");
    }
  };
  //id passed when edit button clicked to set current row id that you want to edit
  const handleEdit = (id) => {
    setEditId(id);
    setToggleComponent(!toggleComponent);
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
              toggleComponent={toggleComponent}
              localList={localList}
              setLocalList={setLocalList}
              editId={editId}
              handleEdit={handleEdit}
              employeeInfo={employeeInfo}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
