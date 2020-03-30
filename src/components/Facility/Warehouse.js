import React, { useState } from "react";

import { Button } from "@material-ui/core";

import WarehouseTable from "./WarehouseTable";
import AddWarehouseDialog from "./AddWarehouseDialog";
import EditWarehouseDialog from "./EditWarehouseDialog";
import DeleteWarehouseDialog from "./DeleteWarehouseDialog";

const Warehouse = () => {
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
        Add Warehouse
      </Button>

      <WarehouseTable onEdit={onEdit} onDelete={onDelete} />

      <AddWarehouseDialog open={openAdd} onClose={() => setOpenAdd(false)} />

      <EditWarehouseDialog
        warehouseId={editId}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />

      <DeleteWarehouseDialog
        warehouseId={deleteId}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      />
    </div>
  );
};

export default Warehouse;
