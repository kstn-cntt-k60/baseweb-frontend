import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DeleteScheduleDialog from "./DeleteScheduleDialog";
import ScheduleTable from "./ScheduleTable";

const ScheduleInfoIndex = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState(null);

  const onDelete = id => {
    setDeleteScheduleId(id);
    setOpenDelete(true);
  };

  const history = useHistory();

  const onSelectSchedule = id => {
    history.push(`/schedule/schedule-detail/${id}`);
  };
  return (
    <div>
      <ScheduleTable onSelect={onSelectSchedule} onDelete={onDelete} />

      <DeleteScheduleDialog
        open={openDelete}
        scheduleId={deleteScheduleId}
        onClose={() => setOpenDelete(false)}
      />
    </div>
  );
};

export default ScheduleInfoIndex;
