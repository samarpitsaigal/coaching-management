const router = require("express").Router();
const {addPayment, getPayments, deletePayment,} = require("../Controllers/paymentController");

router.post("/add",addPayment);
router.get("/",getPayments);
router.delete("/delete/:id",deletePayment)

module.exports = router;