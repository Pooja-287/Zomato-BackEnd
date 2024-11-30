const Razorpay = require('razorpay');

const KEY_ID = 'rzp_test_EcY8gOOFJKNf63';
const SECRET_ID = 'KfVBkLHfAmumaLqcXjdVuI7g';

const instance = new Razorpay({ key_id: KEY_ID, key_secret: SECRET_ID });

module.exports.genOrderId = (request, response) => {
    const { amount } = request.body;

    // Validate 'amount'
    if (!amount || isNaN(amount) || amount <= 0) {
        console.error('Invalid amount:', amount);
        return response.status(400).send({
            status: false,
            message: 'Invalid amount. Please provide a valid positive number.',
        });
    }

    // Order creation options
    const options = {
        amount: Math.round(amount * 100), // Convert to paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
    };

    instance.orders.create(options, (err, order) => {
        if (err) {
            console.error('Razorpay Error:', err.error || err);
            return response.status(500).send({
                status: false,
                message: err.error?.description || 'Error creating order with Razorpay.',
            });
        }
        console.log('Order created successfully:', order);
        response.status(200).send({ status: true, order });
    });
};






// module.exports.genOrderId = (request, response) => {
//     const { amount } = request.body;

//     // Validate 'amount'
//     if (!amount || isNaN(amount)) {
//         console.error('Invalid amount:', amount);
//         return response.status(400).send({ status: false, message: 'Invalid amount' });
//     }

//     const options = {
//         amount: amount * 100, // Convert to paise
//         currency: 'INR',
//         receipt: 'order_rcptid_11',
//     };

//     instance.orders.create(options, (err, order) => {
//         if (err) {
//             console.error('Error creating order:', err);
//             return response.status(500).send({ status: false, message: 'Error creating order', error: err });
//         }
//         console.log('Order created successfully:', order);
//         return response.status(200).send({ status: true, order });
//     });
// };






// module.exports.verifyPayment = async (request, response) => {
//   // let data = request.body;
//   let { payment_id, order_id, signature } = data;
//   let body = order_id + "|" + payment_id;

//   var expectedSignature = crypto
//     .createHmac("sha256", SECRET_ID)
//     .update(body.toString())
//     .digest("hex");

//   // console.log(signature, expectedSignature);
//   if (expectedSignature === signature) {
//     // data["payment_status"] = true;
//     // await _saveNewOrder(data);
//     response.status(200).send({
//       status: true,
//     });
//   } else {
//     response.status(200).send({
//       status: false,
//     });
//   }
// };