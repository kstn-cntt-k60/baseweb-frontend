import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PlanningTable from "./PlanningTable";
import { Button } from "@material-ui/core";
import AddPlanningPeriodDialog from "./AddPlanningPeriodDialog";
import EditPlanningPeriodDialog from "./EditPlanningPeriodDialog";
import DeletePlanningPeriodDialog from "./DeletePlanningPeriodDialog";

const SalesRoute = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editPlanningPeriodId, setEditPlanningPeriodId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deletePlanningPeriodId, setDeletePlanningPeriodId] = useState(null);

  const onEdit = id => {
    setEditPlanningPeriodId(id);
    setOpenEdit(true);
  };

  const onDelete = id => {
    setDeletePlanningPeriodId(id);
    setOpenDelete(true);
  };

  const history = useHistory();

  const onSelectPlanningPeriod = id => {
    history.push(`/sales-route/planning-period-detail/${id}`);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
      >
        Add Planning Period
      </Button>
      <PlanningTable
        onSelect={onSelectPlanningPeriod}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <AddPlanningPeriodDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      />

      <EditPlanningPeriodDialog
        open={openEdit}
        planningPeriodId={editPlanningPeriodId}
        onClose={() => setOpenEdit(false)}
      />

      <DeletePlanningPeriodDialog
        open={openDelete}
        planningPeriodId={deletePlanningPeriodId}
        onClose={() => setOpenDelete(false)}
      />
    </div>
  );
};

export default SalesRoute;
