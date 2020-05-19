import React, { useState } from "react";
import ConfigTable from "./ConfigTable";
import { Button } from "@material-ui/core";
import AddConfigDialog from "./AddConfigDialog";
import EditConfigDialog from "./EditConfigDialog";
import DeleteConfigDialog from "./DeleteConfigDialog";

const SalesRoute = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editConfigId, setEditConfigId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteConfigId, setDeleteConfigId] = useState(null);

  const onEdit = id => {
    setEditConfigId(id);
    setOpenEdit(true);
  };

  const onDelete = id => {
    setDeleteConfigId(id);
    setOpenDelete(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
      >
        Add Sales Route Config
      </Button>

      <ConfigTable onEdit={onEdit} onDelete={onDelete} />

      <AddConfigDialog open={openAdd} onClose={() => setOpenAdd(false)} />

      <EditConfigDialog
        open={openEdit}
        configId={editConfigId}
        onClose={() => setOpenEdit(false)}
      />

      <DeleteConfigDialog
        open={openDelete}
        configId={deleteConfigId}
        onClose={() => setOpenDelete(false)}
      />
    </div>
  );
};

export default SalesRoute;
