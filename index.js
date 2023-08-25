require("dotenv").config();
// console.log(process.env); // remove this after you've confirmed it is working
const express = require("express");
const compression = require("compression");
const app = new express();

app.use(compression());
// const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
// const db = require("./db")();

// let flash= require('connect-flash');
// const { cacheMiddleware } = require("./routeCache");

const {
  showhomepage,
  // createpost,
  // postdata,
  // showpost,
  // createuser,
  // storeuser,
  // loginpage,
  // loginauth,
  // logout,
  // categorywise,
  // deletepost,
} = require("./controllers/postcontroller.js");
const { calci, sipcalcfn,LumpsumCalculator,Lumsumpcalcfn  } = require("./controllers/calculator");
const { bmicalci, bmiCalculator, bmicalcfn  } = require("./controllers/bmicalculator");

const { instadld, instapost } = require("./controllers/insta");
const {
  twitterdld,
  twitterpost,
  twitterdownload,
} = require("./controllers/twitter");
const {
  youtubedownload,
  youtubedownloadlogic,
  youtubedownloadfinal,
} = require("./controllers/youtube");
const {
  fbdownload,
  fbdownloadlogic,
  fbdownloadfinal,
} = require("./controllers/newfb");

const {
  cryptoprice,
  cryptopricecategory,
} = require("./controllers/cryptoprice");

const port = process.env.PORT || 3000;
const User = require("./models/User");
//
const expressSession = require("express-session");
// const mongoStore = require("connect-mongo");

// Set EJS as templating engine
app.set("view engine", "ejs");

app.use(express.static("public"));

const imageUrls = [
  "/image/1.avif", // new AVIF format
  "/image/2.avif", // new AVIF format
  "/image/3.avif", // new AVIF format
  "/image/4.avif", // new AVIF format
  "/image/5.avif", // new AVIF format
  "/image/6.avif", // new AVIF format
  "/image/7.avif", // new AVIF format
];

app.locals.randomImageUrl = () => {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
};

app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // limit file upload size
  })
);

// This helps in retriving user data same like body parser
app.use(
  express.urlencoded({
    extended: true,
  })
);

/// it help in storing user seesion
// app.use(
//   expressSession({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//     store: mongoStore.create({
//       mongoUrl: process.env.MONGO_URL, // mongodb://localhost:27017
//       // mongoUrl: Mydb, // mongodb://localhost:27017
//       autoReconnect: true,
//     }),
//   })
// );

// This makes Global variable
// user global varialbel object with all user information
// auth user id
///////
// app.use("*", async (req, res, next) => {
//   if (req.session.userId) {
//     const user = await User.findById(req.session.userId);
//     res.locals.auth = req.session.userId;
//     res.locals.user = user;


    ////
    // console.log('middleware called inside if');

    // console.log(`checking session data in middleware ${res.locals.auth}`);
    // console.log(
    //   `checking session data in middleware ${res.locals.user.username}`
    // );

    ////////
//   } else {
//     res.locals.auth = false;
//     res.locals.user = null;
//   }

//   next();
// });
//////
app.get("/", showhomepage);

app.get("/cal", calci);
app.post("/cal", sipcalcfn );

app.get("/lumpcal", LumpsumCalculator );
app.post("/lumpcal", Lumsumpcalcfn );

//////bmi
app.get("/bmical", bmicalci);
app.post("/bmical", bmicalcfn );


////


// app.get("/post/new", createpost);

// app.post("/post/data", postdata);
// app.get("/post/:id", showpost);
// app.get("/auth/register", createuser);
// app.post("/users/register", storeuser);
// app.get("/users/login", loginpage);
// app.post("/user/auth", loginauth);
// app.get("/user/logout", logout);
// /////////for deleteing post//////////////////
// app.get("/delete/:id", deletepost);

// /////////////////////////////////////////////////////////////

// app.post("/route", categorywise);

/////Instagra
app.get("/insta", instadld);
app.post("/insta", instapost);

///// Twitter

app.get("/twitter", twitterdld);
app.post("/twitter", twitterpost);
app.post("/downloading", twitterdownload);

////// youtube
app.get("/youtube", youtubedownload);
app.post("/youtubedld", youtubedownloadlogic);
app.post("/ytdownloading", youtubedownloadfinal);

/// facebook


app.get("/fb", fbdownload);
app.post("/fbdld", fbdownloadlogic);
app.post("/fbdownloading", fbdownloadfinal);

// crypto
app.get("/cryptoall", cryptoprice);

app.get('/health', (req, res) => {
  res.status(200).send('Hii Vishnu, Server is up and running.\n Render is making request every 5 sec to avoid going your site idle');
});

// app.get('/health', (req, res) => {
//   console.log('Health check endpoint hit at: ', new Date().toISOString());
//   res.status(200).send('Server is up and running');
// });



app.listen(port, () => console.log(`Listening on port ${port}`));
