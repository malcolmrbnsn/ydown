const router = require("express").Router(),
  Downloader = require("../middleware/downloader"),
  { isLoggedIn } = require("../middleware/auth");

// Start the scheduler
let downloader = new Downloader();

router.get("/options", async (req, res) => {
  let { hours, minutes, enabled } = downloader.options;
  currentTime = hours + ":" + minutes;
  return res.render("auth/options", {
    title: "Options",
    currentTime,
    enabled,
  });
});

router.post("/options", (req, res) => {
  // get settings from the request
  let [hours, minutes] = req.body.downloadTime.split(":");
  let enabled = req.body.enabled === "1";
  let newOpts = { enabled, hours, minutes };

  // update the schedule
  downloader.updateSchedule(newOpts);

  // redirect to the options page
  return res.redirect("/options");
});

module.exports = router;
