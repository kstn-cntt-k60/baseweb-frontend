import React, { useState } from "react";

import { Button } from "@material-ui/core";
import UserLoginTable from "./UserLoginTable";
import AddDialog from "./AddDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

const UserLogin = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const onEdit = id => {
    setEditId(id);
    setOpenEdit(true);
  };

  const onDelete = id => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
      >
        Add User Login
      </Button>

      <UserLoginTable onEdit={onEdit} onDelete={onDelete} />

      <AddDialog open={openAdd} onClose={() => setOpenAdd(false)} />
      <EditDialog
        open={openEdit}
        userLoginId={editId}
        onClose={() => setOpenEdit(false)}
      />
      <DeleteDialog
        open={openDelete}
        userLoginId={deleteId}
        onClose={() => setOpenDelete(false)}
      />
    </div>
  );
};

export default UserLogin;
