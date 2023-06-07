import Razorpay from "razorpay";
// import shortid from "shortid";
import shortid from "shortid";



export const razorpay = new Razorpay({
  key_id: "rzp_test_Vhg1kq9b86udsY",
  key_secret: "JqBlqFSxkpviUc6CUR8BcmOt"
});


export const payment3 = async (req, res) => {

  const payment_capture = 1;
  const amount = req.body.totalBill;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
}
