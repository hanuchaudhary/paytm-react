import express from "express"; 
import { userRouter } from "./user";

const app = express(); 
const router = express.Router();

// router.use(userRouter , "/api/v1/user")

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
