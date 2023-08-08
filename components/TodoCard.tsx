"use client";
import getURL from "@/lib/getURL";
import { useBoardStore } from "@/store/boardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
  const [imageURL, setImageURL] = useState<string | null>(null);

  const deleteTask = useBoardStore((state) => state.deleteTask);
  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getURL(todo.image!);
        if (url) {
          setImageURL(url?.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);
  // console.log("imageURL", imageURL);
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
      {imageURL && (
        <div className="w-full h-full relative rounded-b-md">
          <Image
            src={imageURL}
            height={200}
            width={400}
            alt="todo-image"
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
};

export default TodoCard;
