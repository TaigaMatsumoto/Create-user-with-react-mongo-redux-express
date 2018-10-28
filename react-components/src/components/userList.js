import React, { Component } from "react";
import axios from "axios";
import { requestData, receiveDataSuccess, receiveDataFailed } from "../actions";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
  root: {
    width: "100%",
    marginRight: "0 auto",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class UserList extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.isFetching = this.store.getState().user;
    this.userArray = this.store.getState().user;
    this.handleFetchData = this.handleFetchData.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.state = {
      open: true
    };
  }
  handleFetchData = () => {
    this.store.dispatch(requestData());
    axios
      .get("./api/users")
      .then(res => {
        const _userArray = res.data;
        // console.log(_userArray);
        this.store.dispatch(receiveDataSuccess(_userArray));
      })
      .catch(err => {
        console.error(new Error(err));
        this.store.dispatch(receiveDataFailed());
      });
  };

  handleUpdateUser = id => {
    let newPassword = document.getElementById(id).value;
    this.store.dispatch(requestData());
    axios
      .put("/api/users", {
        id,
        newPassword
      })
      .then(response => {
        const _userArray = response.data;
        this.store.dispatch(receiveDataSuccess(_userArray));
      })
      .catch(err => {
        console.error(new Error(err));
        this.store.dispatch(receiveDataFailed());
      });
  };

  render() {
    const { classes } = this.props;
    const { isFetching, userArray } = this.store.getState().user;
    return (
      <div className={classes.root}>
        {isFetching ? (
          <h2>Now Loading...</h2>
        ) : (
          <div>
            {" "}
            <Button onClick={() => this.handleFetchData()}>fetch data</Button>
            <List>
              {userArray.map(user => (
                <ListItem key={user._id}>
                  <InputLabel>
                    {" "}
                    {`user name:${user.userName}, password: ${user.password} `}
                  </InputLabel>
                  {/* {`user name:${user.userName}, password: ${user.password} `}{" "} */}
                  <Input id={user._id} />
                  <Button onClick={() => this.handleUpdateUser(user._id)}>
                    update password
                  </Button>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    );
  }
}

// const UserList = ({ store }) => {
//   const { isFetching, userArray } = store.getState().user;
//   const handleFetchData = () => {
//     store.dispatch(requestData());
//     axios
//       .get("./api/users")
//       .then(res => {
//         const _userArray = res.data;
//         // console.log(_userArray);
//         store.dispatch(receiveDataSuccess(_userArray));
//       })
//       .catch(err => {
//         console.error(new Error(err));
//         store.dispatch(receiveDataFailed());
//       });
//   };

//   const handleUpdateUser = id => {
//     let newPassword = document.getElementById(id).value;

//     store.dispatch(requestData());
//     axios
//       .put("/api/users", {
//         id,
//         newPassword
//       })
//       .then(response => {
//         const _userArray = response.data;
//         store.dispatch(receiveDataSuccess(_userArray));
//       })
//       .catch(err => {
//         console.error(new Error(err));
//         store.dispatch(receiveDataFailed());
//       });
//   };
//   // const { classes } = this.props;
//   return (
//     <div className={styles.root}>
//       {isFetching ? (
//         <h2>Now Loading...</h2>
//       ) : (
//         <div>
//           {" "}
//           <button onClick={() => handleFetchData()}>fetch data</button>
//           <List>
//             {userArray.map(user => (
//               <ListItem key={user._id}>
//                 {`user name:${user.userName}, password: ${user.password} `}{" "}
//                 <br />
//                 <input id={user._id} />
//                 <button onClick={() => handleUpdateUser(user._id)}>
//                   update password
//                 </button>
//               </ListItem>
//             ))}
//           </List>
//         </div>
//       )}
//     </div>
//   );
// };

export default withStyles(styles)(UserList);
