import React, { useState } from "react";

import { Button } from "@material-ui/core";

import AddDialog from "./AddDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import ProductTable from "./ProductTable";

const Product = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const onEdit = id => {
    setEditProductId(id);
    setOpenEdit(true);
  };

  const onDelete = id => {
    setDeleteProductId(id);
    setOpenDelete(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
      >
        Add Product
      </Button>

      <ProductTable onEdit={onEdit} onDelete={onDelete} />

      <AddDialog open={openAdd} onClose={() => setOpenAdd(false)} />
      <EditDialog
        open={openEdit}
        productId={editProductId}
        onClose={() => setOpenEdit(false)}
      />
      <DeleteDialog
        open={openDelete}
        productId={deleteProductId}
        onClose={() => setOpenDelete(false)}
      />
    </div>
  );
};

export default Product;
