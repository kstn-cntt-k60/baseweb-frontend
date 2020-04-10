import React, { useState } from "react";

import { Button, Divider } from "@material-ui/core";
import PersonTable from "./PersonTable";
import CustomerTable from "./CustomerTable";
import AddDialog from "./AddDialog";
import EditPersonDialog from "./EditPersonDialog";
import EditCustomerDialog from "./EditCustomerDialog";
import DeletePersonDialog from "./DeletePersonDialog";
import DeleteCustomerDialog from "./DeleteCustomerDialog";

const Party = () => {
  const [openAdd, setOpenAdd] = useState(false);

  const [openEditPerson, setOpenEditPerson] = useState(false);
  const [editPersonId, setEditPersonId] = useState(null);
  const [openDeletePerson, setOpenDeletePerson] = useState(false);
  const [deletePersonId, setDeletePersonId] = useState(null);

  const [openEditCustomer, setOpenEditCustomer] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [openDeleteCustomer, setOpenDeleteCustomer] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);

  const onEditPerson = id => {
    setEditPersonId(id);
    setOpenEditPerson(true);
  };

  const onEditCustomer = id => {
    setEditCustomerId(id);
    setOpenEditCustomer(true);
  };

  const onDeletePerson = id => {
    setDeletePersonId(id);
    setOpenDeletePerson(true);
  };

  const onDeleteCustomer = id => {
    setDeleteCustomerId(id);
    setOpenDeleteCustomer(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
      >
        Add Party
      </Button>
      <Divider />
      <PersonTable onEdit={onEditPerson} onDelete={onDeletePerson} />
      <Divider />
      <CustomerTable onEdit={onEditCustomer} onDelete={onDeleteCustomer} />

      <AddDialog open={openAdd} onClose={() => setOpenAdd(false)} />

      <EditPersonDialog
        open={openEditPerson}
        personId={editPersonId}
        onClose={() => setOpenEditPerson(false)}
      />
      <DeletePersonDialog
        open={openDeletePerson}
        personId={deletePersonId}
        onClose={() => setOpenDeletePerson(false)}
      />

      <EditCustomerDialog
        open={openEditCustomer}
        customerId={editCustomerId}
        onClose={() => setOpenEditCustomer(false)}
      />
      <DeleteCustomerDialog
        open={openDeleteCustomer}
        customerId={deleteCustomerId}
        onClose={() => setOpenDeleteCustomer(false)}
      />
    </div>
  );
};

export default Party;
