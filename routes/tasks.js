const express = require("express");
const router = express();
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/asyncWrapper");

router
  .route("/")
  .get(
    asyncWrapper(async (req, res) => {
      const tasks = await Task.find({});
      res.status(200).json({ tasks });
      //   res.status(500).json({ msg: error });
    })
  )
  .post(
    asyncWrapper(async (req, res) => {
      const task = await Task.create(req.body);
      res.status(201).json({ task });
    })
  );

router
  .route("/:name")
  .get(
    asyncWrapper(async (req, res) => {
      const name = req.params.name;
      const task = await Task.findOne({ name });

      if (!task) {
        return res.status(404).json({ msg: "No task found" });
      }

      res.status(200).json({ task });
    })
  )

  .patch(
    asyncWrapper(async (req, res) => {
      const name = req.params.name;
      const task = await Task.findOneAndUpdate({ name }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!task) {
        return res.status(404).json({ msg: "No task found" });
      }

      res.status(200).json({ task });
    })
  )

  .delete(
    asyncWrapper(async (req, res) => {
      const name = req.params.name;
      const task = await Task.findOneAndDelete({ name });

      if (!task) {
        return res.status(404).json({ msg: "No task found to delete" });
      }

      res.status(200).json({ task });
    })
  );

module.exports = router;
