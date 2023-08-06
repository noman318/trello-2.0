"use client";
import { useBoardStore } from "@/store/boardStore";
import React, { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
const Board = () => {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );
  useEffect(() => {
    getBoard();
  }, [getBoard]);
  //   console.log("board", board);
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    // console.log("destination", destination);
    // console.log("source", source);
    // console.log("type", type);
    if (!destination) return;

    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      // console.log("entries", entries);
      const [removed] = entries.splice(source.index, 1);
      // console.log("removed", removed);
      entries.splice(destination.index, 0, removed);
      const reArrangeColumns = new Map(entries);
      // console.log("reArrangeColumns", reArrangeColumns);
      setBoardState({ ...board, columns: reArrangeColumns });
      return;
    }

    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    // console.log("startColIndex", startColIndex);
    const destColIndex = columns[Number(destination.droppableId)];
    // console.log("destColIndex", destColIndex);

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const destCol: Column = {
      id: destColIndex[0],
      todos: destColIndex[1].todos,
    };
    console.log("startCol", startCol);
    console.log("destCol", destCol);

    if (!startCol || !destCol) {
      return;
    }
    if (source.index === destination.index && startCol === destCol) {
      return;
    }

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);
    console.log("todoMoved", todoMoved);
    if (startCol.id === destCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(destCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      const destTodos = Array.from(destCol.todos);
      destTodos.splice(destination.index, 0, todoMoved);
      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      newColumns.set(startCol.id, newCol);
      newColumns.set(destCol.id, {
        id: destCol.id,
        todos: destTodos,
      });
      // console.log("newColumns", newColumns);
      updateTodoInDB(todoMoved, destCol.id);
      setBoardState({ ...board, columns: newColumns });
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 gap-5 mx-auto md:grid-cols-3 max-w-7xl"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
