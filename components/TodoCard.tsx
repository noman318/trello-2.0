"use client";
import { useBoardStore } from "@/store/boardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  dragHandleProps,
  draggableProps,
}: Props) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const handleDeleteTasks = () => {
    deleteTask(index, todo, id);
  };
  return (
    <div
      className="space-y-2 bg-white rounded-md drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex items-center justify-between p-5">
        <p>{todo.title}</p>
        <button
          onClick={handleDeleteTasks}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
