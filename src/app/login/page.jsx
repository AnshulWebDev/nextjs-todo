"use client";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../components/Clients";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);
  const router = useRouter();
  const logInHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `/api/auth/login`,
        data: {
          email,
          password,
        },
      });
      const data = response.data;
      // console.log(data);
      if (data.success) {
        setUser(data.user);
        return toast.success(data.message);
      }
    } catch (error) {
      // console.log(error.message);
      return toast.error(error.response.data.message);
    }
  };
  if (typeof window !== "undefined") {
    if (user._id) return router.push("/");
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={logInHandler}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Your Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Your Password"
          />
          <button type="submit">Login</button>
          <p>Or</p>
          <Link href={"/register"}>New User?</Link>
        </form>
      </section>
    </div>
  );
};

export default Page;
