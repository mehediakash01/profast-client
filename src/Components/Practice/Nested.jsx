import React, { useRef, useState } from "react";

const tasks = [
  {
    id: 1,
    title: "Design UI",
    children: [
      { id: 2, title: "Create wireframes" },
      { id: 3, title: "Make mobile version" },
    ],
  },
  {
    id: 4,
    title: "Develop Features",
    children: [
      { id: 5, title: "Drag and Drop" },
      { id: 6, title: "Expand/Collapse" },
    ],
  },
];

const Nested = () => {
  const [clicked, setClicked] = useState(false);
  const [folderId, setFolderId] = useState(0);
  const [taskList, setTaskList] = useState(tasks);
  const draggingItem = useRef();
  const dragOverItem = useRef();

  const handleDropDown = (id) => {
    if (folderId === id) {
      setClicked(!clicked);
    } else {
      setClicked(true);
      setFolderId(id);
    }
  };

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const handleDragEnd = () => {
    const updatedTasks = [...taskList];
    const parentIndex = updatedTasks.findIndex((t) => t.id === folderId);
    if (parentIndex === -1) return;

    const children = [...updatedTasks[parentIndex].children];
    const draggedItem = children[draggingItem.current];

    // Reorder logic
    children.splice(draggingItem.current, 1);
    children.splice(dragOverItem.current, 0, draggedItem);

    // Update children
    updatedTasks[parentIndex].children = children;

    // Reset refs and update state
    draggingItem.current = null;
    dragOverItem.current = null;
    setTaskList(updatedTasks);
  };

  return (
    <div className="max-w-96 bg-gray-400 p-12 mx-auto my-12 text-white">
      <ul className="space-y-2">
        {taskList.map((task) => (
          <li key={task.id}>
            <div
              onClick={() => handleDropDown(task.id)}
              className="cursor-pointer flex justify-between items-center"
            >
              {task.title}
              <span>{clicked && folderId === task.id ? "▼" : "▶"}</span>
            </div>

            {clicked && folderId === task.id && task.children && (
              <ul className="ml-4 mt-2 space-y-1">
                {task.children.map((child, index) => (
                  <li
                    key={child.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDragEnd={handleDragEnd}
                    className="text-sm pl-4 bg-gray-500 rounded cursor-grab"
                  >
                    {child.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nested;
