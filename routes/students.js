const router = require('express').Router();
const bodyParser = require('body-parser');
const students = require('../db/models/student.js');
const tests = require('../db/models/test.js');


router.get("/", async (req, res, next) => {
  try {
    const studentList = await students.findAll();
    res.json(studentList);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const reqId = req.params.id;
    const student = await students.findById(reqId)
    if (!student) {
      res.sendStatus(404);
    } else {
      res.send(student);

    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newStudent = await students.create(req.body);
    res.status(201).send(newStudent);
  } catch (error) {
    next(error)
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedStudent = await students.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })

    // 1 and 0 are required because of the structure of the returned object - print out req.body to see it
    res.send(updatedStudent[1][0]);
  } catch (error) {
    next (error);
  }

})

router.delete("/:id", async (req, res, next) => {
  try {
    await students.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(204);
  } catch (error) {
    next (error);
  }
})
module.exports = router;
