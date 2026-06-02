const Student = require("../Models/Studentt");
const Payment = require("../Models/Paymentt");

const addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);

    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentFees = async (req, res) => {
  try {
    const students = await Student.find();

    const data = await Promise.all(
      students.map(async (student) => {
        // 1️⃣ Total months calculate
        const admissionDate = new Date(student.admissionDate);
        const today = new Date();

        const months =
          (today.getFullYear() - admissionDate.getFullYear()) * 12 +
          (today.getMonth() - admissionDate.getMonth()) +
          1;

        // 2️⃣ Total Fees
        const totalFees = student.monthlyFees * months;

        // 3️⃣ Paid Fees (reduce)
        const payments = await Payment.find({ studentId: student._id });

        const paidFees = payments.reduce((sum, p) => sum + p.amount, 0);

        // 4️⃣ Pending Fees
        const pendingFees = totalFees - paidFees;

        return {
          ...student.toObject(),
          totalFees,
          paidFees,
          pendingFees,
        };
      }),
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


};

const deleteStudent = async(req,res)=>{
  try {
    const studentId = req.params.id 
    await Student.findByIdAndDelete(studentId)
    res.status(200).json({
      success:true,
      message:"student deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"delete failed"
    })
  }
}


module.exports = { addStudent, getStudents, getStudentFees, deleteStudent };
