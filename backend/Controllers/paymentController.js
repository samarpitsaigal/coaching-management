const Payment = require("../Models/Paymentt");

exports.addPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);

    await payment.save();

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("studentId");

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    await Payment.findByIdAndDelete(id);
    res.json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
