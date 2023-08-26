"use client";

import Link from "next/link";
import { useState, createContext, useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { toast } from "react-hot-toast";
import {useRouter} from "next/navigation"
export const Context = createContext({ user: {} });

export const Provider = ({ children }) => {
  const [user, setUser] = useState({});
  const meAPICall=async()=>{
    const response = await axios({
      method: "post",
      url: `/api/auth/me`,
      withCredentials: true,
    });
    const data = response.data;
    // console.log(data);
    if (data.success) setUser(data.user);
  }
  useEffect(() => {
    meAPICall();
  }, []);
  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);
  const logoutHandler = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/auth/logout",
      });
      const data = response.data;
      if (!data.success) return toast.error(data.message);
      setUser({});
      toast.success(data.message);
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  return user._id ? (
    <button className="btn" onClick={logoutHandler}>
      Logout
    </button>
  ) : (
    <Link href={"/login"}>Login</Link>
  );
};

export const TodoButton = ({ id, completed }) => {
  const router=useRouter()
  const deleteHandler = async(id) => {
    try {
      const response=await axios({
        method:"delete",
        url: `/api/getdeltask`
      })
      const data=response;
  
      toast.success("Task deleted")
      router.refresh()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };
  return (
    <>
      <input type="checkbox" checked={completed} />
      <button className="btn" onClick={() => deleteHandler(id)}>
        Delete
      </button>
    </>
  );
};
