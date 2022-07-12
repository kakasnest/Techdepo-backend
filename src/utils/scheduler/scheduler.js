import cron from "node-cron";
import {
  deleteOrdersWithoutLines,
  deleteUnusedCategoryImages,
  deleteUnusedProductImages,
} from "./jobs.js";

export const startJobs = () => {
  cron.schedule("* * * * *", deleteUnusedCategoryImages);
  cron.schedule("* * * * *", deleteOrdersWithoutLines);
  cron.schedule("* * * * *", deleteUnusedProductImages);
  console.log("Jobs started");
};
