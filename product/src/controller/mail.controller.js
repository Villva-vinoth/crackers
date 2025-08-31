const { transporter } = require('../config/mailConfig');

const customerTemplate = `
<div style="font-family: Arial, sans-serif; font-size:14px; color:#333;">
  <h2 style="text-align:center; color:#2c3e50;">Order Placed</h2>

  <p>Hi <b>{{CUSTOMER_NAME}}</b>,</p>
  <p>Thank you for your order! Our team will review your order and get back to you soon.</p>
  <p>The total amount of your order is <b>₹{{TOTAL_AMOUNT}}</b></p>
  <p>Verify your order details below:</p>
  <h3 style="margin-top:20px; color:#2c3e50;">Customer Details</h3>
  <table cellspacing="0" cellpadding="6" border="1" style="border-collapse:collapse; width:100%; font-size:14px;">
    <tr><td><b>Name</b></td><td>{{CUSTOMER_NAME}}</td></tr>
    <tr><td><b>Email</b></td><td>{{CUSTOMER_EMAIL}}</td></tr>
    <tr><td><b>Phone</b></td><td>{{CUSTOMER_PHONE}}</td></tr>
    <tr><td><b>Address</b></td><td>{{CUSTOMER_ADDRESS}}</td></tr>
    <tr><td><b>City</b></td><td>{{CUSTOMER_CITY}}</td></tr>
    <tr><td><b>State</b></td><td>{{CUSTOMER_STATE}}</td></tr>
    <tr><td><b>Pincode</b></td><td>{{CUSTOMER_PINCODE}}</td></tr>
  </table>

  <h3 style="margin-top:20px; color:#2c3e50;">Order Details</h3>
  <table cellspacing="0" cellpadding="8" border="1" style="border-collapse:collapse; width:100%; font-size:14px; text-align:center;">
    <tr style="background:#f4f4f4;">
      <th>Code</th>
      <th>Product</th>
      <th>Rate</th>
      <th>Qty</th>
      <th>Category</th>
      <th>Amount</th>
    </tr>
    {{ORDER_ITEMS}}
  </table>

  <p style="text-align:right; font-size:15px; margin-top:10px;">
    <b>Total Items:</b> {{ORDER_TOTAL}} <br>
    <b>Total Products:</b> {{TOTAL_PRODUCTS}} <br>
    <b>Total Amount:</b> ₹{{TOTAL_AMOUNT}}
  </p>

   <div style="margin-top:25px; padding:15px; background:#fff3cd; border:1px solid #ffeeba; border-radius:8px;">
    <p style="margin:0; font-size:15px; color:#856404;">
      <b>Payment Pending:</b> If the payment is not done, please complete it using the link below:
    </p>
    
     <p style="margin-top:10px; font-size:14px; color:#333;">
    pay manually to UPI ID: <b>{{UPI_ID}}</b>
    </p>

    <!-- QR Code -->
    <p style="margin-top:10px; font-size:14px; color:#333;">
      Or scan the QR code below:
    </p>
    <p>
      <img src='{{QR_CODE_DATA_URL}}'
           alt="UPI QR Code" style="width:300px;height:400px;" />
    </p>
  </div>

  <p style="margin-top:20px;">If you have any questions, feel free to contact us.</p>
  <a href="mailto:{{SUPPORT_EMAIL}}" style="color:#2980b9;">{{SUPPORT_EMAIL}}</a>

  <p>Best regards, <br><b>{{APP_NAME}}</b></p>
</div>


`;
const OrderTemplate = `
<div style="font-family: Arial, sans-serif; font-size:14px; color:#333;">
  <h2 style="text-align:center; color:#2c3e50;">New Order Confirmation</h2>

  <p>Hi <b>{{CUSTOMER_NAME}}</b>,</p>
  <p>Has placed the order successfully, The Order ID is <b>{{ORDER_ID}}</b></p>
  <p>The total amount of your order is <b>₹{{TOTAL_AMOUNT}}</b>,Make sure the payment is done and confirm the order. </p>
  <p>Verify your order details below:</p>
  <h3 style="margin-top:20px; color:#2c3e50;">Customer Details</h3>
  <table cellspacing="0" cellpadding="6" border="1" style="border-collapse:collapse; width:100%; font-size:14px;">
    <tr><td><b>Name</b></td><td>{{CUSTOMER_NAME}}</td></tr>
    <tr><td><b>Email</b></td><td>{{CUSTOMER_EMAIL}}</td></tr>
    <tr><td><b>Phone</b></td><td>{{CUSTOMER_PHONE}}</td></tr>
    <tr><td><b>Address</b></td><td>{{CUSTOMER_ADDRESS}}</td></tr>
    <tr><td><b>City</b></td><td>{{CUSTOMER_CITY}}</td></tr>
    <tr><td><b>State</b></td><td>{{CUSTOMER_STATE}}</td></tr>
    <tr><td><b>Pincode</b></td><td>{{CUSTOMER_PINCODE}}</td></tr>
  </table>

  <h3 style="margin-top:20px; color:#2c3e50;">Order Details</h3>
  <table cellspacing="0" cellpadding="8" border="1" style="border-collapse:collapse; width:100%; font-size:14px; text-align:center;">
    <tr style="background:#f4f4f4;">
      <th>Code</th>
      <th>Product</th>
      <th>Rate</th>
      <th>Qty</th>
      <th>Category</th>
      <th>Amount</th>
    </tr>
    {{ORDER_ITEMS}}
  </table>

  <p style="text-align:right; font-size:15px; margin-top:10px;">
    <b>Total Items:</b> {{ORDER_TOTAL}} <br>
    <b>Total Products:</b> {{TOTAL_PRODUCTS}} <br>
    <b>Total Amount:</b> ₹{{TOTAL_AMOUNT}}
  </p>
     <div>Order Status: <b>Processing</b></div>
  <div class="color:red">Please verify the payment is done and Confirm the order</div>
  <div>Thanks</div> Fireworks Team
</div>`;
const contactTemplate = (data) => {
    const { name, email, message } = data
    return `<h1>Contact Request</h1>
<p>Hi, I am ${name}</p>
<p>Email: ${email}</p>
<p>Message: ${message}</p>`
};

require('dotenv').config();


const mapData = async (template, data, type = "customer") => {
    let mappedTemplate = template;
    mappedTemplate = mappedTemplate.replaceAll('{{CUSTOMER_NAME}}', data.name);
    mappedTemplate = mappedTemplate.replace('{{CUSTOMER_EMAIL}}', data.email);
    mappedTemplate = mappedTemplate.replace('{{CUSTOMER_PHONE}}', data.phone_number);
    mappedTemplate = mappedTemplate.replace('{{CUSTOMER_ADDRESS}}', data.address);
    mappedTemplate = mappedTemplate.replace('{{CUSTOMER_CITY}}', data.city);
    mappedTemplate = mappedTemplate.replace('{{CUSTOMER_STATE}}', data.state);
    mappedTemplate = mappedTemplate.replace('{{CUSTOMER_PINCODE}}', data.pincode);
    mappedTemplate = mappedTemplate.replace('{{ORDER_TOTAL}}', data.noOfItems);
    mappedTemplate = mappedTemplate.replace('{{TOTAL_PRODUCTS}}', data.noOfProducts);
    mappedTemplate = mappedTemplate.replaceAll('{{TOTAL_AMOUNT}}', data.total_amount);


    if (type === "customer") {
        mappedTemplate = mappedTemplate.replaceAll('{{SUPPORT_EMAIL}}', process.env.APP_USER);
        mappedTemplate = mappedTemplate.replace('{{APP_NAME}}', "Sri ShivaSakthi Fireworks");

        const upiId = "srisivasakthicrackers-1@okaxis";
        mappedTemplate = mappedTemplate.replace('{{UPI_ID}}', upiId);
        const url = process.env.App_URL + "/qrcode.jpeg";
        mappedTemplate = mappedTemplate.replace('{{QR_CODE_DATA_URL}}', url);
    }
    if (type === "order") {
        mappedTemplate = mappedTemplate.replace('{{ORDER_ID}}', data.order_id);
    }

    let orderItems = '';
    data.order_details.forEach((item, index) => {
        orderItems += `<tr>
        <td>${index + 1}</td>
        <td>${item.product}</td>
        <td>₹${item.rate}</td>
        <td>${item.qty}</td>
        <td>${item.category}</td>
        <td>₹${item.amount}</td>
      </tr>`;
    });

    mappedTemplate = mappedTemplate.replace('{{ORDER_ITEMS}}', orderItems);
    return mappedTemplate;
}


const transport = (mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // throw error;
            // console.log(error)
            throw new Error(error);
        }
        // console.log('Email sent: ' + info.response);
        return "Email sent successfully"
    });
}

module.exports = {
    sendMail: async (req, res, next) => {
        try {

            const data = req.body;
            const template = await mapData(OrderTemplate, data, 'order');
            // console.log(template)
            const customerInvoice = await mapData(customerTemplate, data);
            // console.log(customerInvoice)
            const customerOptions = {
                from: process.env.APP_USER,
                to: data.email,
                subject: "Order Confirmation - Sri ShivaSakthi Fireworks",
                html: customerInvoice
            };

            transport(customerOptions)


            const OrderOptions = {
                from: process.env.APP_USER,
                to: process.env.APP_USER,
                subject: "New Order Placed - Sri ShivaSakthi Fireworks",
                html: template
            };

            transport(OrderOptions)


            return res.status(200).json({
                success: true,
                message: 'Email sent successfully'
            })
        } catch (error) {
            next(error)
        }
    },
    contactMail: async (req, res, next) => {
        try {

            const data = req.body;
            const template = contactTemplate(data);
            const mailOptions = {
                from: process.env.APP_USER,
                to: process.env.APP_USER,
                subject: "Contact Us",
                html: template
            };

            // console.log(mailOptions)
            transport(mailOptions)
            return res.status(200).json({
                success: true,
                message: 'Email sent successfully',
                // template
            })

            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         // throw error;
            //         // console.log(error)
            //         throw new Error(error);
            //     }
            //     // console.log('Email sent: ' + info.response);
            //     return res.status(200).json({
            //         success: true,
            //         message: 'Email sent successfully',
            //         // template
            //     })

            // });
            // return res.status(200).send(template)
        } catch (error) {
            // console.log(error)
            next(error)

        }
    }
}