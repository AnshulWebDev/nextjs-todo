"use client"

import Link from "next/link";

const page = () => {
  return (
    <div className="login">
        <section>
            <form action="">
            <input type="text" placeholder="Enter Your Name"/>
                <input type="email" placeholder="Enter Your Email"/>
                <input type="password" placeholder="Enter Your Password"/>
                <button type="submit">Signup</button>
                <p>Or</p>
                <Link href={"/login"}>Already have account?</Link>
            </form>
        </section>
    </div>
  )
}
export const metadata = {
    title: "Register",
    description: "This is Register Page for Todo app",
  };
export default page