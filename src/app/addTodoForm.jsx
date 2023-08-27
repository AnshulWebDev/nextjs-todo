"use client";

import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Context } from "../../components/Clients";
const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(Context);
  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "/api/newtask",
        data: {
          title,
          description,
        },
        withCredentials: true,
      });
      const data = response.data;
      // console.log(response);
      if (data.success == true) {
        toast.success(data.message);
      }
      if (response == "Request failed with status code 402") {
        toast.error(data.message);
      }
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if(typeof window!=="undefined"){
    if (!user._id) return router.push("/login");
  }
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Task Title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Task Description"
          />
          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  );
};

export default AddTodoForm;
