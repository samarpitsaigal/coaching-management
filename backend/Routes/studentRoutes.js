const router = require("express").Router();

const {addStudent, getStudents, getStudentFees, deleteStudent,} = require("../Controllers/studentController")

const { verifyToken, checkAdmin } = require("../Middleware/authMiddleware");

router.post("/add",addStudent);
router.get("/",getStudents);
router.get("/fees", getStudentFees);
router.post("/add", verifyToken, checkAdmin, addStudent);
router.delete('/delete/:id',deleteStudent)




module.exports = router;