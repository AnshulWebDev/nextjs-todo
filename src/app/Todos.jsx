import React from "react";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import axios from "axios";
import { TodoItem } from "../../components/serverComponent";
const fetchTodo = async (token) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.URL}/api/getdeltask`,
      data: {
        token,
      },
    });
    const data = response.data;
    // console.log(data)
    return data.task;
  } catch (error) {
    // console.log(error);
    return [];
  }
};
const Todos = async () => {
  const token = cookies().get("token")?.value;
  if (!token) return useRouter().replace("/login");
  const tasks = await fetchTodo(token);
  return (
    <section className="todosContainer">
      {tasks?.map((i) => (
        <TodoItem 
          key={i._id}
          className="todo"
          title={i.title}
          description={i.description}
          id={i._id}
          completed={i.isCompleted}
        />
      ))}
    </section>
  );
};

export default Todos;
