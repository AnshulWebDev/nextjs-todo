import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGOOSE_URI, {
      dbName: "NextTodo",
    })
    .then(console.log("db connected success"))
    .catch((e) => {
      console.log("error", e.message);
      process.exit(1);
    });
};
