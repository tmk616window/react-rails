import React, { Component } from "react";
import { TaskList } from "../../../pages/tasks";

interface TaskItemProps {
  taskItem: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ taskItem }) => {
  return (
    <li className="list-group-item list-group-item-primary">{taskItem}</li>
  );
};

export default TaskItem;
