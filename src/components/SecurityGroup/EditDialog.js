import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  List,
  ListItem,
  Checkbox,
  makeStyles
} from "@material-ui/core";

import {
  formatTime,
  formatDate,
  getGender,
  setSwitch,
  setEquals,
  setDifference
} from "../../util";
import { apiGet, apiPost } from "../../actions";
import {
  GOT_USER_LOGIN_INFO,
  SAVED_USER_LOGIN_GROUPS
} from "../../actions/security";

const useStyles = makeStyles(() => ({
  dialog: {},
  panels: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  leftPanel: {
    width: "400px"
  },
  rightPanel: {
    marginLeft: "10px"
  }
}));

const EditDialog = ({
  open,
  userLoginId,
  getUserLogin,
  groups,
  permissions,
  groupIdSet,
  permissionIdSet,
  onClose,
  getInfo,
  saveGroups
}) => {
  const classes = useStyles();

  const [idSet, setIdSet] = useState(groupIdSet);

  const permIdSet = permissionIdSet(idSet);

  useEffect(() => {
    if (userLoginId !== null) {
      getInfo(userLoginId);
    }
  }, [userLoginId]);

  useEffect(() => {
    setIdSet(groupIdSet);
  }, [groupIdSet]);

  const onCancel = () => {
    setIdSet(groupIdSet);
  };

  const handleChange = id => {
    setIdSet(setSwitch(idSet, id));
  };

  const onSave = () => {
    const toBeInserted = [...setDifference(idSet, groupIdSet)];
    const toBeDeleted = [...setDifference(groupIdSet, idSet)];
    saveGroups(userLoginId, toBeInserted, toBeDeleted);
  };

  const userLogin = getUserLogin(userLoginId);

  const disabled = setEquals(idSet, groupIdSet);

  return (
    <Dialog open={open} onClose={onClose} className={classes.dialog}>
      <DialogTitle>Assigns Security Groups to Login Account</DialogTitle>
      <DialogContent>
        <h3>Username: {userLogin.username}</h3>
        <h3>Full name: {userLogin.fullName}</h3>
        <div className={classes.panels}>
          <Paper>
            <List>
              {groups.map(g => (
                <ListItem key={g.id}>
                  <Checkbox
                    checked={idSet.has(g.id)}
                    onChange={() => handleChange(g.id)}
                  />
                  {g.name}
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper className={classes.rightPanel}>
            <List>
              {permissions.map(p => (
                <ListItem key={p.id}>
                  <Checkbox disabled checked={permIdSet.has(p.id)} />
                  {p.name}
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          disabled={disabled}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          disabled={disabled}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const formatUserLogin = u => ({
  ...u,
  createdAt: formatTime(u.createdAt),
  updatedAt: formatTime(u.updatedAt),
  birthDate: formatDate(u.birthDate),
  fullName: `${u.lastName} ${u.middleName} ${u.firstName}`,
  gender: getGender(u.genderId)
});

const nullUserLogin = {
  username: "",
  createdAt: "",
  updatedAt: "",
  fullName: "",
  birthDate: "",
  gender: ""
};

const getUserLogin = u => (u ? formatUserLogin(u) : nullUserLogin);

const mapState = createSelector(
  state => state.security.userLoginMap,
  state => state.security.groupMap,
  state => state.security.permissionMap,
  state => state.security.groupIdList,
  state => state.security.groupPermissions,
  (userLoginMap, groupMap, permissionMap, idList, groupPermissions) => ({
    getUserLogin: id => getUserLogin(userLoginMap[id]),
    groups: Object.values(groupMap),
    permissions: Object.values(permissionMap),
    groupIdSet: new Set(idList),
    permissionIdSet: idSet =>
      new Set(
        groupPermissions
          .filter(gp => idSet.has(gp.id.securityGroupId))
          .map(gp => gp.id.securityPermissionId)
      )
  })
);

const mapDispatch = dispatch => ({
  getInfo: id =>
    dispatch(
      apiGet(`/api/security/user-login-info/${id}`, GOT_USER_LOGIN_INFO)
    ),
  saveGroups: (id, toBeInserted, toBeDeleted) =>
    dispatch(
      apiPost(
        "/api/security/save-user-login-security-groups",
        {
          id,
          toBeInserted,
          toBeDeleted
        },
        SAVED_USER_LOGIN_GROUPS
      )
    )
});

export default connect(mapState, mapDispatch)(EditDialog);
