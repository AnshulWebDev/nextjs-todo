"use client"
import Link from "next/link"
const page = () => {
  return (
    <div className="login">
        <section>
            <form action="">
                <input type="email" placeholder="Enter Your Email"/>
                <input type="password" placeholder="Enter Your Password"/>
                <button type="submit">Login</button>
                <p>Or</p>
                <Link href={"/register"}>New User?</Link>
            </form>
        </section>
    </div>
  )
}
export const metadata = {
    title: "Login",
    description: "This is Login Page for Todo app",
  };
export default page