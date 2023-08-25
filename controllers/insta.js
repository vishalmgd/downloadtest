

// const instagramGetUrl = require("instagram-url-direct");
// const axios = require("axios");
// // const bodyParser = require("body-parser");
// // const circularJSON = require("circular-json");
// const archiver = require("archiver");
// const fs = require("fs");
// const ErrorHandler = require("../errors/ErrorHandler");

// // router.use(bodyParser.urlencoded({ extended: true }));


// const instadld = (req, res) => {
//   res.render("instapage", {
//     title: "Instagram page",
//   });
// };

// const instapost = async (req, res) => {
//   const url = req.body.urlname;
//   console.log(url);
//   // res.send(url)
//   if (!url) {
//     const error = ErrorHandler.validationError("Please provide a valid URL!");
//     return res.status(error.status).json({ message: error.message });
  

//   }

//   try {
//     // checking number of url
//     const urlobj = await insta(url);
//     const singleitem = urlobj.toString();
//     const newitem = urlobj.toString().split(",");
//     console.log(`length of url ${newitem}`);
//     if (newitem.length > 1) {
//       // Create a new archive
//       const archive = archiver("zip");

//       // Set the archive as the response
//       res.attachment("insta.zip");
//       archive.pipe(res);

//       // Append each file to the archive
//       for (let i = 0; i < newitem.length; i++) {
//         const response = await handleinstaFormSubmit(newitem[i], i);
//         archive.append(response.data, { name: response.filename });
//       }

//       // Finalize the archive
//       archive.finalize();
//     } else {
//       console.log("checking in in elif");
//       console.log(`singleitem ${singleitem}`);
//       console.log(typeof singleitem);
//       handleinstaFormSubmit(singleitem, 1, res);
//     }
//   } catch (err) {
//     console.log(err);
//     // res.status(500).send(err);

//     if (err) {
//       const error = ErrorHandler.validationError(
//         "Invalid url or Instagram/User imposed some restrcition"
//       );
//       return res.status(error.status).json({ message: error.message });
//     }
//   }
// };

// const insta = async (url) => {
//   try {
//     let links = await instagramGetUrl(url);
//     const urlobj = links.url_list;
//     return urlobj;
//   } catch (error) {
//     console.log(`Error: ${error}`);
//     throw error;
//   }
// };

// handleinstaFormSubmit = async (urlstr, i, res) => {
//   try {
//     const response = await axios({
//       method: "GET",
//       url: urlstr,
//       responseType: "stream",
//       timeout: 6000000,
//     });
//     if (urlstr.search("mp4") !== -1 && !res) {
//       const filename = `instavideo${i}.mp4`;
//       return {
//         type: "video/mp4",
//         filename: filename,
//         data: response.data,
//       };
//     } else if (urlstr.search("jpg") !== -1 && !res) {
//       return {
//         type: "image/jpg",
//         filename: `instaimage${i}.jpg`,
//         data: response.data,
//       };
//     } else if (res && urlstr.search("mp4") !== -1) {
//       console.log("just before response video");
//       res
//         .status(200)
//         .set("Content-Type", "video/mp4")
//         .set(
//           "Content-Disposition",
//           "attachment; filename=" + `instavideo${i+10000}.mp4`
//         );
//       response.data.pipe(res);
//     } else if (res && urlstr.search("jpg") !== -1) {
//       console.log("just before response image");
//       res
//         .status(200)
//         .set("Content-Type", "image/jpg")
//         .set(
//           "Content-Disposition",
//           "attachment; filename=" + `instaimage${i}.jpg`
//         );
//       response.data.pipe(res);
//     }
//   } catch (error) {
//     console.log(`Error: ${error}`);
//     throw error;
//   }
// };

// module.exports = { instadld, instapost };



const axios = require("axios");
const youtubedl = require("youtube-dl-exec");
const ErrorHandler = require("../errors/ErrorHandler");

const instadld = (req, res) => {
  res.render("instapage", {
    title: "Instagram page",
    urllist:""
  });
};

const instapost = async (req, res) => {
  const url = req.body.urlname;
  console.log(url);
  // res.send(url)
  if (!url) {
    const error = ErrorHandler.validationError("Please provide a valid URL!");
    return res.status(error.status).json({ message: error.message });
  }

  try {
    const insta = await youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
      requestOptions: {
        timeout: 30000, // Set the timeout to 30 seconds (30,000 milliseconds)
      },
    });
    
    console.log("====================");
    console.log(insta);
    console.log("====================");
    let urllist;
try {
  urllist = insta?.formats[0]?.url; // Assigns format URL if available
  // console.log("Checking format:", urllist);
} catch (error) {
  try {
    urllist = insta?.entries[0]?.url; // Assigns entries URL if available
    // console.log("Checking entries:", urllist);
  } catch (error) {
    urllist = null; // Default value if no URL is found
  }
}



    const response = await axios({
      method: "GET",
      url: urllist,
      responseType: "stream",
      timeout: 60000,
    
    });

    const filename = insta.title || "instavideo";

    res
      .status(200)
      .set("Content-Type", "video/mp4")
      .set("Content-Disposition", "attachment; filename=" + `${filename}.mp4`);

    response.data.pipe(res);
  } catch (err) {
    console.log(err);

    const error = ErrorHandler.validationError(
      "Invalid URL or Instagram/User imposed some restriction"
    );
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = { instadld, instapost };
