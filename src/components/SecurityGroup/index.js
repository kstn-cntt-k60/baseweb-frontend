import React, { useState } from "react";

import { Button } from "@material-ui/core";
import UserLoginTable from "./UserLoginTable";
import EditDialog from "./EditDialog";
import AddDialog from "./AddDialog";

const SecurityGroup = () => {
  const [open, setOpen] = useState(false);
  const [userLoginId, setUserLoginId] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  const onEdit = id => {
    setUserLoginId(id);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
      >
        Add Security Group
      </Button>

      <UserLoginTable onEdit={onEdit} />

      <EditDialog open={open} userLoginId={userLoginId} onClose={onClose} />

      <AddDialog open={openAdd} onClose={() => setOpenAdd(false)} />
    </div>
  );
};

export default SecurityGroup;
