import dotenv from "dotenv";

import { updateItemStatus } from "./controllers/items.controller.js";
import connectDB from "./db/index.js";
import { app, server } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    server.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });

    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MONGODB connection failed ", err));
