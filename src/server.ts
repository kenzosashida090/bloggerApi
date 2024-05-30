

import dotenv from "dotenv"
import { app } from "./app";

dotenv.config({path:"./.env"})

const PORT = process.env.PORT || 3000;
//SERVER UP AND RUNNING ON PORT 3000
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


process.on("uncaughtException",(error)=>{
  console.log("UNHANDLED REJECTION! SHUTTING DOWN...")
  console.log(error)
  server.close(()=>{
    process.exit((1))
  })
})