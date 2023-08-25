
import { TodoItem } from "../../components/serverComponent";
import Form from "./register/addTodoForm";

export default function Home() {
  return (
    <div className="container">
      <Form />
      <section className="todosContainer">
        <TodoItem
          className="todo"
          title={"sample Task"}
          description={"Lorem ipsum dolor sit amet consectetur "}
          id={"sampledId"}
          completed={true}
        />
      </section>
    </div>
  );
}
