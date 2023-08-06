const formatTodoForAI = (board: Board) => {
  const todos = Array.from(board.columns.entries());

  const flatArray = todos.reduce((map, [key, value]) => {
    map[key] = value.todos;
    console.log("map", map);
    return map;
  }, {} as { [key in TypedColumn]: Todo[] });

  const flatArrayCounted = Object.entries(flatArray).reduce(
    (map, [key, value]) => {
      map[key as TypedColumn] = value.length;
      console.log("map", map);
      return map;
    },
    {} as { [key in TypedColumn]: number }
  );

  return flatArrayCounted;
};

export default formatTodoForAI;
