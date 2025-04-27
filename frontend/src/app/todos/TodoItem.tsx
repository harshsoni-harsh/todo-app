import { Pencil, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";

export default function TodoItem({
  todo,
  deleteTodo,
  updateTodo,
}: {
  todo: Todo;
  deleteTodo: ({ id }: Pick<Todo, "id">) => {};
  updateTodo: ({
    id,
    title,
    description,
  }: Pick<Todo, "id" | "title" | "description" | "completed">) => {};
}) {
  const completeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    updateTodo({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: e.target.checked,
    });
  };
  return (
    <div className="w-full border border-t-0 border-black flex items-center justify-between">
      <div className="flex gap-2 pl-2 w-full items-center">
        <input
          onChange={completeTodo}
          id={todo.id}
          checked={todo.completed}
          type="checkbox"
          className="peer"
        />
        <label htmlFor={todo.id} className="flex flex-col peer-checked:[&>*]:line-through grow">
          <p className="px-2 grow">{todo.title}</p>
          <p className="px-2 grow text-xs">{todo.description}</p>
        </label>
      </div>
      <div className="flex gap-2 min-h-full">
        <button className="hover:cursor-pointer hover:bg-black hover:text-white h-full p-1">
          <Pencil size="16px" className="m-2" />
        </button>
        <button
          onClick={() => deleteTodo({ id: todo.id })}
          className="hover:cursor-pointer hover:bg-black hover:text-white h-full p-1"
        >
          <Trash2 size="16px" className="m-2" />
        </button>
      </div>
    </div>
  );
}
