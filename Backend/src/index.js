import dotenv from "dotenv";

import cron from "node-cron";
import { updateItemStatus } from "./controllers/items.controller.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    cron.schedule("* * * * * *", async () => {
      try {
        await updateItemStatus();
        // console.log("Item status updated successfully.");
      } catch (error) {
        console.error("Error updating item status:", error);
      }
    });

    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });

    app.listen(process.env.Port || 8000, () => {
      console.log(`Server running on port ${process.env.Port}`);
    });
  })
  .catch((err) => console.log("MONGODB connection failed ", err));
