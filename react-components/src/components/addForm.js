import React from "react";
import axios from "axios";
import { changeUserName, changePassword, initializeForm } from "../actions";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

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
        <InputLabel>
          User Name:
          <Input
            value={userName}
            onChange={e => store.dispatch(changeUserName(e.target.value))}
          />
        </InputLabel>
        <InputLabel>
          Password:
          <Input
            value={password}
            type="password"
            name="password"
            onChange={e => store.dispatch(changePassword(e.target.value))}
          />
        </InputLabel>
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
};

export default AddForm;
