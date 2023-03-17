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
    //filterBy is the searched employee from input field to see if it exsists in the firebase database 
    //function below looks for multiple matches to see if there are more than one based on search
    //it uses filterBy to search for in database
    const filterEmployeeDb = (employeeDb, keys, values) => {
      return employeeDb.filter((object) => {
        return keys.some((key, index) => {
          return object[key].toLowerCase() === values[index].toLowerCase();
        });
      });
    }
    //since we are searching based on either fullName, jobTitle, and emailAddress, it will be used for db search 
    const keys = ["fullName", "jobTitle", "emailAddress"];
    const values = [filterBy, filterBy, filterBy];
    const findEmployees = filterEmployeeDb(
      employeeListDb,
      keys,
      values
    );
    //if found get all names and save it in array of objects findEmployees above
    //code below is to check to see if the current local employee directory list you see already has names listed to avoid duplicate names
    //it compares localList array of objects with findEmployees array of objects and only passes what doesn't exists in localList
    if (findEmployees.length > 0) {
      const compareLocalListAndFindEmployees = (firstArray, secondArray) => {
        // create a new array to hold the merged objects
        const mergedArray = [...firstArray];
        // loop through each object in the second array
        secondArray.forEach((secondObject) => {
          // check if the object exists in the first array
          const employeeExists = mergedArray.some(
            (firstObject) => firstObject.id === secondObject.id
          );
          // if the object doesn't exist in the first array, add it
          if (!employeeExists) {
            mergedArray.push(secondObject);
          }
        });
        setLocalList(mergedArray);
      }
      compareLocalListAndFindEmployees(localList, findEmployees);
      e.target.elements.search.value = "";
      setErrorMsg("");
    } else {
      setErrorMsg("Employee not found");
    }
  };
  //for clearing error msg when you type back in search input once error message appears
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    if (searchInput) setErrorMsg("");
  };

  //employee form input field changes for updating to latest values
  const handleChange = (e) => {
    const newInfo = (value) => ({
      ...value,
      [e.target.name]: e.target.value,
    });
    setEmployeeInfo(newInfo);
    setMessage("");
  };

  //for emptying employee info object, employeeInfo object is used for getting form values and passing it to localList or database list if form is submitted
  const emptyEmployeeInfo = () => {
    const emptyEmployeeObj = {
      fullName: "",
      jobTitle: "",
      emailAddress: "",
      phoneNumber: "",
    };
    setEmployeeInfo(emptyEmployeeObj);
  };

  //////////////////////////////////////////////
  //Add employee, edit employee
  //////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    //if any form field was empty, display error
    if (
      Object.values(employeeInfo).some(
        (value) => value === undefined || value === ""
      )
    ) {
      setMessage({ error: true, msg: "All fields are required!" });
      return;
    }
    //if edit id then update employee, else add new employee in else condition
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
        getEmployees();
      } catch (err) {
        setMessage({ error: true, msg: "Error in adding employee" });
      }
      setEditId("");
    } else {
      const employeeExists = employeeListDb.some(
        (employee) =>
          employee.fullName.toLowerCase() ===
          employeeInfo.fullName.toLowerCase()
      );
      if (!employeeExists) {
        try {
          //add newmployee to firefox db
          const docRef = await EmployeeDataService.addEmployees(employeeInfo);
          employeeInfo["id"] = docRef.id;
          //since id is not added in docRef above, its updated immediately with id from above 
          await EmployeeDataService.updateEmployee(docRef.id, employeeInfo);
          const newEmployee = (data) => [...data, employeeInfo];
          setLocalList(newEmployee);
          setToggleComponent(!toggleComponent);
        } catch (err) {
          setMessage({ error: true, msg: "Error in adding employee" });
        }
      } else {
        setMessage({
          error: true,
          msg: "Employee name already exists in the directory",
        });
      }
    }
    emptyEmployeeInfo();
  };
  //toggle handlers
  const handleButtonClick = () => {
    emptyEmployeeInfo();
    setEditId("");
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
      //for populating form with employee info when updating 
      const docSnap = await EmployeeDataService.getEmployee(editId);
      setEmployeeInfo(docSnap.data());
    } catch (err) {
      console.log(`update didn't work`);
      emptyEmployeeInfo();
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
              employeeListDb={employeeListDb}
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
                editId={editId}
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
