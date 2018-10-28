import React from "react";
import axios from "axios";
import { changeUserName, changePassword, initializeForm } from "../actions";

const AddForm = ({ store }) => {
  const { userName, password } = store.getState().form;
  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("./api/users", {
        userName,
        password
      })
      .then(response => {
        console.log(response);
        store.dispatch(initializeForm());
      })
      .catch(err => {
        console.error(new Error(err));
      });
  };
  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          User Name:
          <input
            value={userName}
            onChange={e => store.dispatch(changeUserName(e.target.value))}
          />
        </label>
        <label>
          Password:
          <input
            value={password}
            type="password"
            name="password"
            onChange={e => store.dispatch(changePassword(e.target.value))}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddForm;
