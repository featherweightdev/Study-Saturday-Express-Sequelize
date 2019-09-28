const router = require('express').Router();
const tests = require('../db/models/test.js');

router.get("/", async (req, res, next) => {
  try {
    const testList = await tests.findAll();
    res.json(testList);
  } catch (error) {
    next (error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const oneTest = await tests.findById(req.params.id);
    res.send(oneTest);
  } catch (error) {
    next (error);
  }
})

router.post("/student/:student", async (req, res, next) => {
  try {
    const student = Number(req.params.student);
    req.body.studentId = student;
    const newTest = await tests.create(req.body);
    res.status(201).send(newTest);
  } catch (error) {
    next(error)
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await tests.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(204);
  } catch (error) {
    next (error)
  }
})
module.exports = router;
