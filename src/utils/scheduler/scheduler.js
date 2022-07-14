import cron from "node-cron";
import {
  deleteUnusedCategoryImages,
  deleteUnusedProductImages,
} from "./jobs.js";

export const startJobs = () => {
  const timer = "0 4 * * 7";
  cron.schedule(timer, deleteUnusedCategoryImages);
  cron.schedule(timer, deleteUnusedProductImages);
  console.log("Jobs started");
};
