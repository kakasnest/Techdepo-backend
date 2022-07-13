import cron from "node-cron";
import {
  deleteReviewsWithoutProductId,
  deleteUnusedCategoryImages,
  deleteUnusedProductImages,
} from "./jobs.js";

export const startJobs = () => {
  const timer = "0 4 * * 7";
  cron.schedule(timer, deleteUnusedCategoryImages);
  cron.schedule(timer, deleteUnusedProductImages);
  cron.schedule(timer, deleteReviewsWithoutProductId);
  console.log("Jobs started");
};
