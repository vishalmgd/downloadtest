// // const router = require("express").Router();
// const axios = require("axios");
// (cheerio = require("cheerio")), (qs = require("qs"));
// const ErrorHandler = require("../errors/ErrorHandler");
// const twitterGetUrl = require("./tweet");

// // const bodyParser = require("body-parser");
// //
// // let bestqturl;
// // let bestformat;
// // let lowqturl;
// // let lowformat;
// let username;

// const twitterdld= (req, res) => {

//   res.render("twitterpage", {
//     // title: "Twitterpage",
//     // bestqturl: "",
//     // lowqturl: "",
//       dimurl:'',

//   });
// };

// ///////////////////////////////////////////////////////////////////////////////////////////

// async function test(url) {
//   let result = await twitterGetUrl(url);
//   // console.log(`here test url result ${result}`);
//   return result;
// }
// /////////////////////////////////////////////////////////////////////////////
// const twitterdownload =((req, res) => {
//   const selectedRadioButton = req.body.radioButton;
//   console.log(`Selected radio button: ${selectedRadioButton}`);
//   console.log(`checking req body: ${req.body}`);
//   handleFormSubmit(selectedRadioButton, res);

// });
// //////////////////////////////////////////////////////

// const twitterpost= async (req, res) => {
//   const url = req.body.url;

//   if (!url) {
//     const error = ErrorHandler.validationError("Please provide a valid URL!");
//     return res.status(error.status).json({ message: error.message });

//   }

//   // res.send(url);
//   try {
//     const urlobj = await test(url)
//       .then((result) => {
//         const urlList = result.download;
//         console.log("========================");

//         const dimurl = result.download;
//         console.log(`u r checking dimurl ${dimurl}`);

//         ///

//         let array = [];
//         for (let i = 0; i < dimurl.length; i++) {
//           console.log(dimurl[i].dimension + ":::" + dimurl[i].url);
//           // let `url${i}`

//           array.push({
//             format: dimurl[i].dimension,
//             url: dimurl[i].url,
//           });
//         }
//         req.session.dimurl=array
//         req.session.totalvideo=array.length

//     // console.log(`this is req session ${req.session.dimurl}`);
//     // console.log(`this is req session count ${req.session.totalvideo}`);
//         username = result.tweet_user.name;
//         // req.session.newusername = result.tweet_user.name;

//         console.log("===========================");
//         bestqturl = urlList[urlList.length - 1].url;
//         bestformat = urlList[urlList.length - 1].dimension;

//         lowqturl = urlList[urlList.length - 2].url;
//         lowformat = urlList[urlList.length - 2].dimension;

//         console.log(`best quality ${bestqturl} ${bestformat}`);
//         console.log(`low quality ${lowqturl} ${lowformat}`);
//         // console.log(lasturl);
//         //
//         // req.session.dimurl=array
//         // req.session.totalvideo=array.length
//         console.log(req.session.dimurl[0]);

//         ///
//         res.render("twitterpage", {
//           title: "Twitterpage",
//           // hello: "vishnu how are you",
//           dimurl: req.session.dimurl,
//           totalnovideo: req.session.totalvideo,
//           // bestqturl: bestformat,
//           // lowqturl: lowformat,
//         });

//         // handleFormSubmit(bestqturl, res, username);
//         // res.send("success");
//       })
//       .catch((err) => {
//         console.dir(
//           {
//             test: "Image Test",
//             status: "error",
//             result: err,
//           },
//           { depth: null }
//         );
//         /// validating urls are correct or not

//         // if (err) {
//         //   const error = ErrorHandler.validationError(
//         //     "You have provided wrong url"
//         //   );
//         //   return res.status(error.status).json({ message: error.message });
//         // }
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// };

// handleFormSubmit = async (urlstr, res) => {

//   try {
//     const response = await axios({
//       method: "GET",
//       url: urlstr,
//       responseType: "stream",
//     });

//     const filename = 'Twittervideo.mp4';
//     // console.log(`this item isin handlesubmit if block ext check ${urlstr}`);
//     // console.log("======================================================");
//     res
//       .status(200)
//       .set("Content-Type", "video/mp4")
//       .set("Content-Disposition", "attachment; filename=" + filename);

//     response.data.pipe(res);
//   } catch (error) {
//     console.log(`Error: ${error}`);
//     res.status(500).send(error);
//   }
// };

// module.exports ={twitterdld,twitterpost,twitterdownload};

///////////////working

// const router = require("express").Router();
require("dotenv").config();
const axios = require("axios");
const youtubedl = require("youtube-dl-exec");
const ErrorHandler = require("../errors/ErrorHandler");
const puppeteer = require("puppeteer");



const twitterdld = (req, res) => {
  res.render("twitterpage", {
    // title: "Twitterpage",
    // bestqturl: "",
    // lowqturl: "",
    dimurl: "",
  });
};

///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
const twitterdownload = async (req, res) => {
  // const selectedRadioButton = req.body.radioButton;
  // console.log(`Selected radio button: ${selectedRadioButton}`);
  // // console.log(`checking req body: ${req.body}`);
  // handleFormSubmit(selectedRadioButton, res);
  const  url  = req.body.videoUrl;
  console.log("button hit in twitterdownload");
  console.log("button hit in twitterdownload",url);

  try {
    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    const filename = "video.mp4";
    // console.log(`this item isin handlesubmit if block ext check ${urlstr}`);
    // console.log("======================================================");
    res
      .status(200)
      .set("Content-Type", "video/mp4")
      .set("Content-Disposition", "attachment; filename=" + filename);

    response.data.pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error);
    res
      .status(500)
      .json({ success: false, message: "Error downloading video." });
  }
};
//////////////////////////////////////////////////////

const twitterpost = async (req, res) => {
  const url = req.body.url;
  console.log("u r here top================================================");
  console.log(url);

  if (!url) {
    const error = ErrorHandler.validationError("Please provide a valid URL!");
    return res.status(error.status).json({ message: error.message });
  }
  const tweetUrl = url;
  // console.log("Executable Path:", puppeteer.executablePath());
  try {
    // const twitter = await youtubedl(url, {
    //   dumpSingleJson: true,
    //   noCheckCertificates: true,
    //   noWarnings: true,
    //   preferFreeFormats: true,
    //   addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    // });

    // console.log("u r here bottom================================================");
    // console.log(twitter);
    // // const uploader=twitter.uploader_id
    // // req.session.uploadername= uploader
    // // console.log(uploader);

    // const filteredOutput = twitter.formats.filter((element) => {
    //   return (
    //     // element.hasOwnProperty("vcodec") &&
    //     // element.hasOwnProperty("acodec") &&
    //     // element.vcodec !== "none" &&
    //     // element.acodec !== "none"
    //     element.protocol== 'https'
    //   );
    // });
    // // console.log(filteredOutput);

    // const lenOfObj = filteredOutput.length;
    // const result = [];

    // for (let i = 0; i < lenOfObj; i++) {
    //   const url = filteredOutput[i].url;
    //   const format = filteredOutput[i].resolution;
    //   result.push({ url, format });
    // }

    // console.log(result);

    // req.session.dimurl = result;
    // req.session.totalvideo = lenOfObj;

    const getVideoUrl = async (tweetUrl) => {
      // const browser = await puppeteer.launch();
      const browser = await puppeteer.launch({
        args: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
        ],
        executablePath:
          process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
      });


      
      const page = await browser.newPage();

      try {
        // await page.goto(tweetUrl);
        await page.goto(tweetUrl, { timeout: 90000 }); // Timeout set to 10 seconds (10,000 milliseconds)

        // await page.waitForSelector("video");
        await page.waitForSelector("video", { timeout: 90000 }); // Timeout set to 5 seconds (5,000 milliseconds)

        const tweetData = await page.evaluate(
          () => {
            const videoElement = document.querySelector("video");
            return {
              videoUrl: videoElement.src,
            };
          },
          { timeout: 90000 } // Timeout set to 90 seconds (90,000 milliseconds)
        );

        return tweetData.videoUrl;
      } catch (error) {
        console.error("Error:", error);
      } finally {
        await browser.close();
      }
    };

    const videoUrl = await getVideoUrl(tweetUrl);

    if (videoUrl) {
      // Instead of downloading the video, send the video URL to the client
      console.log(videoUrl);
      // handleFormSubmit(videoUrl, res);
      // // res.json({ videoUrl: videoUrl });
      res.render("twitterpage", {
        title: "Twitterpage",
        // hello: "vishnu how are you",
        dimurl: videoUrl,
        // totalnovideo: req.session.totalvideo,
      });
    } else {
      res.status(404).json({ error: "Video URL not found." });
    }

    // res.render("twitterpage", {
    //   title: "Twitterpage",
    //   // hello: "vishnu how are you",
    //   dimurl: req.session.dimurl,
    //   totalnovideo: req.session.totalvideo,

    // });
  } catch (err) {
    console.log(err);

    const error = ErrorHandler.validationError(
      "Invalid URL or Twitter/User imposed some restriction"
    );
    return res.status(error.status).json({ message: error.message });
  }
};

handleFormSubmit = async (urlstr, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: urlstr,
      responseType: "stream",
    });

    const filename = "Twittervideo.mp4";
    // console.log(`this item isin handlesubmit if block ext check ${urlstr}`);
    // console.log("======================================================");
    res
      .status(200)
      .set("Content-Type", "video/mp4")
      .set("Content-Disposition", "attachment; filename=" + filename);

    response.data.pipe(res);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).send(error);
  }
};

module.exports = { twitterdld, twitterpost, twitterdownload };
