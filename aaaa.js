// otp verify
// exports.otp_verify = async (req, res) => {
//     try {
//       const { email, otp } = req.body;
//       const ext_doc = await database.findOne({ email: email });

//       if (ext_doc && ext_doc.otp === otp) {
//         database
//           .updateOne({ email: email }, { $set: { status: "Active" } })
//           .then((ext_doc) => {
//             console.log("ext_doc: ", ext_doc);
//           })
//           .catch((err) => {
//             console.log("err: ", err);
//           });
//         console.log("otp verified");
//         res.send({ status: true, msg: "otp verified successfully" });
//       } else {
//         if (ext_doc.otp === "expired") {
//           const newotpExpirationTime = 30 * 1000;
//           const new_otp_generate = Math.floor(
//             Math.random() * 8999 + 1000
//           ).toString();
//           console.log("OTP:", new_otp_generate);
//           database
//             .findOneAndUpdate(
//               { email: email },
//               {
//                 $set: {
//                   otp: new_otp_generate,
//                   expirationTime: newotpExpirationTime,
//                 },
//               }
//             )
//             .then((result) => {
//               // if (result) {
//               sendMail.send_email(object.email, new_otp_generate);
//               res.json({
//                 status: true,
//                 msg: "User created successfully",
//                 data: result,
//               });
//               if (ext_doc && ext_doc.otp === otp) {
//                 database.updateOne({ email: email }, { $set: { status: "Active" } })
//                   .then((ext_doc) => {
//                     console.log("ext_doc: ", ext_doc);
//                   })
//                   .catch((err) => {
//                     console.log("err: ", err);
//                   });
//                 console.log("otp verified");
//                 res.send({ status: true, msg: "otp verified successfully" });
//               } else {
//                 console.log("No OTP");
//               }
//             })
//             .catch((err) => {
//               console.log("err: ", err);
//               console.error("err:", err);
//             });
//         }
//         console.log("OTP is incorrect or expired. Please try again.");
//         res.send("OTP is incorrect or expired. Please try again.");
//       }
//     } catch (error) {
//       console.log("error:", error);
//       res.status(500).json({ status: false, msg: "An error occurred" });
//     }
//   };

// const itemsArray = [
//   { name: "item1", value: 10 },
//   { name: "item2", value: 20 },
//   { name: "item3", value: 30 },
// ];

// const itemsObject = itemsArray.reduce((obj, item) => {
//   obj[item.name] = item;
//   return obj;
// }, {});

// console.log(itemsObject);

// exports.asyncParallel = (req, res) => {
//   try {
//     const object = async.parallel([
//       await([database.find({}), login.find({}), client.find({})]),
//     ]);
//     res.json({ object });
//   } catch (error) {
//     // Handle any synchronous errors here
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const express = require('express');
// const fetch = require('node-fetch');

// const app = express();
// const port = 3000;

// // Middleware to fetch data before responding to requests
// async function fetchDataMiddleware(req, res, next) {
//   try {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     req.fetchedData = data; // Store fetched data in request object
//     next(); // Proceed to the next middleware/route handler
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }

// // Use the middleware for all requests
// app.use(fetchDataMiddleware);

// // Route to handle the fetched data
// app.get('/', (req, res) => {
//   const fetchedData = req.fetchedData; // Access data from request object
//   res.json(fetchedData);
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// Create a test URLSearchParams object
const searchpar = new URLSearchParams("keya = vala&keyb = valb");

// Display the key/value pairs
for (let pair of searchpar.entries()) {
	console.log(pair[0] + ', ' + pair[1]);
}
