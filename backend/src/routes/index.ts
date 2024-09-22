import express from "express"; 
import cors from 'cors';
import { userRouter } from "./user";
import { accountRouter } from "./account";

const app = express(); 
app.use(cors());
app.use(express.json())
app.use("/api/v1/user",userRouter);
app.use("/api/v1/account",accountRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
