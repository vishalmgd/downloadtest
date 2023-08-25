// const Post = require("../models/post");
// const path = require("path");
// const mongoose = require("mongoose");
// const User = require("../models/User");
// const bcryptjs = require("bcryptjs");

//  // // caching

// const NodeCache = require("node-cache");
// const cache = new NodeCache();



const showhomepage = async (req, res) => {
  // Check if the data is already cached
  // const cachedData = cache.get("posts");
  // // const randomImageUrl = "/images/" + imageUrls[Math.floor(Math.random() * imageUrls.length)];

  // if (cachedData) {
  //   console.log("Serving from cache...");
  //   console.log("Cache expiry time:", cache.getTtl("posts"));
  //   return res.render("index", { posts: cachedData });
  // } else {
  //   // Fetch the latest posts from the database
  //   const posts = await Post.find({});

  //   // Format the createdAt field to Indian Standard Time
  //   const formattedPosts = posts.map((post) => {
  //     const indianDate = post.createdAt.toLocaleDateString("en-IN", {
  //       timeZone: "Asia/Kolkata",
  //       day: "numeric",
  //       month: "long",
  //       year: "numeric",
  //     });
  //     const indianTime = post.createdAt.toLocaleTimeString("en-IN", {
  //       timeZone: "Asia/Kolkata",
  //     });

  //     return {
  //       ...post._doc,
  //       indianDate,
  //       indianTime,
  //     };
  //   });

  //   // Store the formatted posts in the cache for future use
  //   const cacheTime =  60* 60 * 0.5 //60 * 60 * 4; // 4 hours in milliseconds
  //   cache.set("posts", formattedPosts, cacheTime); // posts is key formattedPost is value

    res.render("index", { posts:"" });
  // }
};
/////

// const showhomepage = async (req, res) => {
//   const posts = await Post.find({});

//   // Format the createdAt field to Indian Standard Time
//   const formattedPosts = posts.map((post) => {
//     const indianDate = post.createdAt.toLocaleDateString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//     const indianTime = post.createdAt.toLocaleTimeString("en-IN", {
//       timeZone: "Asia/Kolkata",
//     });

//     return {
//       ...post._doc,
//       indianDate,
//       indianTime,
//     };
//   });
//   // console.log(formattedPosts[0]._id);
  // res.render("index", { posts: formattedPosts });
// };

/////////////////
// const createpost = (req, res) => {
//   let sessionData = req.session.username;
//   if (req.session.userId) {
//     console.log(`checking session data ${sessionData}`);
//     res.render("createpost", { sessionData });
//   } else {
//     res.render("login");
//   }
// };

// const postdata = async (req, res) => {
//   console.log(req.body);

//   // res.send('success')
//   try {
//     if (req.body.category === "1") {
//       await Post.create({
//         ...req.body,
//         category: "Art and design blogs",
//       });
//     } else if (req.body.category === "2") {
//       await Post.create({
//         ...req.body,
//         category: "Computer science and Technology",
//       });
//     } else if (req.body.category === "3") {
//       await Post.create({
//         ...req.body,
//         category: "Political blogs",
//       });
//     } else if (req.body.category === "4") {
//       await Post.create({
//         ...req.body,
//         category: "Movie blogs",
//       });
//     } else if (req.body.category === "5") {
//       await Post.create({
//         ...req.body,
//         category: "Sports blogs",
//       });
//     } else if (req.body.category === "6") {
//       await Post.create({
//         ...req.body,
//         category: "Business blogs",
//       });
//     } else if (req.body.category === "7") {
//       await Post.create({
//         ...req.body,
//         category: "Personal finance blogs",
//       });
//     } else if (req.body.category === "8") {
//       await Post.create({
//         ...req.body,
//         category: "Blockchain & Cryptocurrency",
//       });
//     } else if (req.body.category === "9") {
//       await Post.create({
//         ...req.body,
//         category: "Travel Blog",
//       });
//     } else if (req.body.category === "10") {
//       await Post.create({
//         ...req.body,
//         category: "Other",
//       });
//     } else if (req.body.category === "General") {
//       await Post.create({
//         ...req.body,
//         category: "General",
//       });
//     }

//     // console.log(`testing all field with catogary${req.body.category}`);

//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//   }
// };

// const categorywise = async (req, res) => {
//   const selectedCategory = req.body.category;
//   // Perform action based on selected category
//   // console.log(`selected category ${selectedCategory}`);
//   // res.send('success')

//   if (selectedCategory === "1") {
//     const posts = await Post.find({ category: "Art and design blogs" });
//     console.log(`selected post ${posts}`);
//     res.render("index", { posts });
//   } else if (selectedCategory === "2") {
//     const posts = await Post.find({
//       category: "Computer science and Technology",
//     });
//     res.render("index", { posts });
//   } else if (selectedCategory === "3") {
//     const posts = await Post.find({ category: "Political blogs" });
//     res.render("index", { posts });
//   } else if (selectedCategory === "4") {
//     const posts = await Post.find({ category: "Movie blogs" });
//     res.render("index", { posts });
//   } else if (selectedCategory === "5") {
//     const posts = await Post.find({ category: "Sports blogs" });
//     res.render("index", { posts });
//   } else if (selectedCategory === "6") {
//     const posts = await Post.find({ category: "Business blogs" });
//     res.render("index", { posts });
//   } else if (selectedCategory === "7") {
//     const posts = await Post.find({ category: "Personal finance blogs" });
//     res.render("index", { posts });
//   } else if (selectedCategory === "8") {
//     const posts = await Post.find({
//       category: "Blockchain & Cryptocurrency",
//     });
//     res.render("index", { posts });
//   } else if (selectedCategory === "9") {
//     const posts = await Post.find({ category: "Travel Blog" });
//     res.render("index", { posts });
//   } else if (selectedCategory === "10") {
//     const posts = await Post.find({ category: "Other" });
//     res.render("index", { posts });
//   } else if (selectedCategory === "11") {
//     const posts = await Post.find({ category: "General" });
//     res.render("index", { posts });
//   } else if (req.body.category === "All") {
//     const posts = await Post.find({});
//     res.render("index", { posts });
//   }
// };

// const showpost = async (req, res) => {
//   // console.log(`u r in showpost${req}`);
//   // console.log(`checking re.params.id which in enedpoint${req.params.id}`);
//   // const id = mongoose.Types.ObjectId(req.params.id);
//   const id = req.params.id;

//   const post = await Post.findById(id);

//   // console.log(`checking auth${res.locals.auth}`);
//   // console.log(`checking user${res.locals.user}`);

//   res.render("showpost", { post });
// };

// const createuser = async (req, res) => {
//   // this will redirect testpage
//   res.render("testpage");
//   // right now i have restricted user to make account
//   // res.render("register");
// };

// const loginpage = async (req, res) => {
//   res.render("login");
// };

// const loginauth = async (req, res) => {
//   const { email, password } = req.body;
//   // Find the user by email
//   const user = await User.findOne({ email });
//   if (user) {
//     // Compare passwords
//     const validPassword = await bcryptjs.compare(password, user.password);
//     if (validPassword) {
//       console.log("User logged in");

//       req.session.userId = user._id;
//       req.session.username = user.username;
//       // console.log(`checking session data in login page ${req.session.userId}`);
//       // console.log(`checking session data in login page ${req.session.username}`);
//       // next();
//       res.redirect("/");
//     } else {
//       res.redirect("/users/login");
//     }
//   } else {
//     res.redirect("/users/login");
//   }
// };

// const logout = (req, res) => {
//   req.session.destroy();
//   res.redirect("/users/login");
// };

// const storeuser = async (req, res) => {
//   try {
//     User.create(req.body, (error, user) => {
//       console.log(
//         `u r in storeuser to check user ${user.username} " " ${user.email} " " ${user.password}`
//       );
//       console.log(`u r in storeuser to check user any error ${error}`);
//       res.redirect("login");
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect("/");
//   }
// };
// ///////////////////DELETE LOGIC////////////
// const deletepost = async (req, res) => {
//   const postId = req.params.id;
//   // const signedinuser= res.locals.user.username
//   // console.log(`checking id in delete fn${postId}`);

//   const post = await Post.find({ _id: postId });

//   // Find and delete the post with the specified id
//   if (!res.locals.user) {
//     console.log("not user session");
//     res.render("login");
//   } else {
//     // console.log(`post ${post}`);
//     console.log(`signedinuser ${res.locals.user.username}`); //its array of object thatswhy[0]
//     console.log(`postusername ${post[0].username}`); //its array of object thatswhy[0]

//     if (res.locals.user.username === post[0].username) {
//       const deleted = await Post.findByIdAndDelete(postId);
//       console.log("post deleted");

//       res.redirect("/");
//     } else {
//       console.log("u r not authorised to do");
//       res.redirect("/");
//       // res.redirect("/?message=Post Not deleted successfully");
//     }
//   }
// };

module.exports = {
  // createpost,
  showhomepage,
  // postdata,
  // showpost,
  // createuser,
  // storeuser,
  // loginpage,
  // loginauth,
  // logout,
  // categorywise,
  // deletepost,
};
