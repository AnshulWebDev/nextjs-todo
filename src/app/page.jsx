import React from "react";
import Form from "./addTodoForm";
import Todos from "./Todos";

const Page = () => {
  return (
    <div className="container">
      <Form />
      <Todos />
    </div>
  );
};

export default Page;
