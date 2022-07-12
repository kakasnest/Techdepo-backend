import cron from "node-cron";
import {
  deleteOrdersWithoutLines,
  deleteReviewsWithoutProductId,
  deleteUnusedCategoryImages,
  deleteUnusedProductImages,
} from "./jobs.js";

export const startJobs = () => {
  cron.schedule("* * * * 7", deleteUnusedCategoryImages);
  cron.schedule("* * * * 7", deleteUnusedProductImages);
  cron.schedule("* * * * 7", deleteOrdersWithoutLines);
  cron.schedule("* * * * 7", deleteReviewsWithoutProductId);
  console.log("Jobs started");
};
