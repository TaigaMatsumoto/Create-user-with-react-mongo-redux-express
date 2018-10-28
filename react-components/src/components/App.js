import React, { Component } from "react";
import AddForm from "./addForm";
import UserList from "./userList";
class App extends Component {
  render() {
    return (
      <div className="App">
        <AddForm store={this.props.store} />
        <UserList store={this.props.store} />
      </div>
    );
  }
}

export default App;
