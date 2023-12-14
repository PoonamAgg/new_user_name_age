import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
// import UsersList from "./UsersList";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [EnteredUserName, setEnteredUserName] = useState("");
  const [EnteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState("");

  const AddUserHandler = (event) => {
    event.preventDefault();
    if (EnteredUserName.trim().length === 0 || EnteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please Enter a valid Name and age(non-empty value).",
      });
      return;
    }
    if (+EnteredAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please Enter a valid age(>0).",
      });
      return;
    }

    props.onAddUser(EnteredUserName, EnteredAge);
    setEnteredAge("");
    setEnteredUserName("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={AddUserHandler}>
          <label htmlFor="username"> Username</label>
          <input
            id="username"
            type="text"
            value={EnteredUserName}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age"> Age(Years)</label>
          <input
            id="age "
            type="number"
            value={EnteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit"> Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
