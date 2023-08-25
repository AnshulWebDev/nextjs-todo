"use client";
const addTodoForm = () => {
  return (
    <div className="login">
      <section>
        <form action="">
          <input type="text" placeholder="Task Title" />
          <input type="text" placeholder="Task Description" />
          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  );
};

export default addTodoForm;
