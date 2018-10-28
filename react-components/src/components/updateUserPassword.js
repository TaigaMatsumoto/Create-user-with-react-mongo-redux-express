import React from "react";
import axios from "axios";
import {
  changeUserName,
  changePassword,
  initializeForm,
  requestData,
  receiveDataSuccess,
  receiveDataFailed
} from "../actions";

const UpdateUserPassword = ({ id, store }) => {
  const { password } = store.getState().form;
  const handleUpdateUserPassword = (id, e) => {
    store.dispatch(requestData());
    axios
      .put("/api/users", {
        id,
        password
      })
      .then(res => {
        const _userArray = res.data;
        store.dispatch(receiveDataSuccess(_userArray));
      })
      .catch(err => {
        console.error(new Error(err));
        store.dispatch(receiveDataFailed());
      });
  };

  return (
    <div>
      <form onSubmit={e => handleUpdateUserPassword(id, e)}>
        <label>
          Password:
          <input
            value={password}
            type="password"
            onChange={e => store.dispatch(changePassword(e.target.value))}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default UpdateUserPassword;
