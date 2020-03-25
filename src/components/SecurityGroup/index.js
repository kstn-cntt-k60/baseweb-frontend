import React, { useState } from "react";

import { Button } from "@material-ui/core";
import UserLoginTable from "./UserLoginTable";
import EditDialog from "./EditDialog";

const SecurityGroup = () => {
  const [open, setOpen] = useState(false);
  const [userLoginId, setUserLoginId] = useState(null);

  const onEdit = id => {
    setUserLoginId(id);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    console.log("SAVE");
  };

  return (
    <div>
      <Button variant="contained" color="primary">
        Add Security Group
      </Button>
      <UserLoginTable onEdit={onEdit} />
      <EditDialog
        open={open}
        userLoginId={userLoginId}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
};

export default SecurityGroup;
