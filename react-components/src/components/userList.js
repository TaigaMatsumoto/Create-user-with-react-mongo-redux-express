import React from "react";
import axios from "axios";
import { requestData, receiveDataSuccess, receiveDataFailed } from "../actions";
import UpdateUserPassword from "./updateUserPassword";

const UserList = ({ store }) => {
  const { isFetching, userArray } = store.getState().user;
  const handleFetchData = () => {
    store.dispatch(requestData());
    axios
      .get("./api/users")
      .then(res => {
        const _userArray = res.data;
        // console.log(_userArray);
        store.dispatch(receiveDataSuccess(_userArray));
      })
      .catch(err => {
        console.error(new Error(err));
        store.dispatch(receiveDataFailed());
      });
  };
  return (
    <div>
      {isFetching ? (
        <h2>Now Loading...</h2>
      ) : (
        <div>
          {" "}
          <button onClick={() => handleFetchData()}>fetch data</button>
          <ul>
            {userArray.map(user => (
              <li key={user._id}>
                {`user name:${user.userName}, password: ${user.password} `}@{" "}
                <UpdateUserPassword id={user._id} store={store} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserList;
