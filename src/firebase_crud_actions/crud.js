import { db } from "../firebase_setup/firebase";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    recentDoc
} from "firebase/firestore";

const employeeDatabaseRef = collection(db, "employees");
class EmployeeDataService {
    addEmployees = (newEmployee) => {
        return addDoc(employeeDatabaseRef, newEmployee);
    }

    updateEmployee = (id, updatedEmployee) => {
        const employeeDoc = doc(db, "employees", id);
        // check for existing employee based on id
        return updateDoc(employeeDoc, updatedEmployee);
    };
    deleteEmployee = (id) => {
        const employeeDoc = doc(db, "employees", id);
        return deleteDoc(employeeDoc);
    };

    getAllEmployees = () => {
        return getDocs(employeeDatabaseRef);
    }

    getEmployee = (id) => {
        const employeeDoc = doc(db, "employees", id);
        return getDoc(employeeDoc);
    }
}

export default new EmployeeDataService();