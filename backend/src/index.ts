import express from "express";
import cors from 'cors';
import { userRouter } from "./routes/user";
import { accountRouter } from "./routes/account";

const app = express();
app.use(cors());
app.use(express.json())
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
