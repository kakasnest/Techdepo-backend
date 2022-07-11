import cron from "node-cron";
import {
  deleteUnusedCategoryImages,
  deleteUnusedProductImages,
} from "./jobs.js";

export const startJobs = () => {
  cron.schedule("* 23 * * *", deleteUnusedProductImages);
  cron.schedule("* 23 * * *", deleteUnusedCategoryImages);
  console.log("Jobs started");
};
