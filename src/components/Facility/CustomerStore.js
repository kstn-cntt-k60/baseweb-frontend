import React, { useState } from "react";

import { Button } from "@material-ui/core";

import CustomerStoreTable from "./CustomerStoreTable";
import AddCustomerStoreDialog from "./AddCustomerStoreDialog";
import EditCustomerStoreDialog from "./EditCustomerStoreDialog";
import DeleteCustomerStoreDialog from "./DeleteCustomerStoreDialog";

const CustomerStore = () => {
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
        Add Customer Store
      </Button>

      <CustomerStoreTable onEdit={onEdit} onDelete={onDelete} />

      <AddCustomerStoreDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      />

      <EditCustomerStoreDialog
        storeId={editId}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />

      <DeleteCustomerStoreDialog
        storeId={deleteId}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      />
    </div>
  );
};

export default CustomerStore;
