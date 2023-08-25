const axios = require("axios");
const youtubedl = require("youtube-dl-exec");
// const fbDownloader = require("./facebookmain");
const ErrorHandler = require("../errors/ErrorHandler");

const fbdownload = async (req, res) => {
  res.render("facebookpage", {
    title: "Facebook",
    hdurl: "",
    hdquality: "",

    sdurl: "",
    sdquality: "",
  });
};

const fbdownloadlogic = async (req, res) => {
  try {
    urllist = req.body.url;
    if (!urllist) {
      const error = ErrorHandler.validationError("Please provide a valid URL!");
      return res.status(error.status).json({ message: error.message });
    }

    const ytdlist = await youtubedl(urllist, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    });

    const newobj = ytdlist.formats.filter((element, index) => {
      return element.vcodec !== "none" && element.acodec !== "none";
    });

    const lengthofobj = newobj.length;

    let sditemurl = {};
    let hditemurl = {};

    for (let i = 0; i < lengthofobj; i++) {
      if (newobj[i].format === "sd - unknown") {
        sditemurl = newobj[i].url;
        break;
      }
    }

    for (let i = 0; i < lengthofobj; i++) {
      if (newobj[i].format === "hd - unknown") {
        hditemurl = newobj[i].url;
        break;
      }
    }

    console.log(sditemurl);
    console.log(hditemurl);

    res.render("facebookpage", {
      title: "Facebook",
      hdurl: hditemurl,
      hdquality: "HD",
      sdurl: sditemurl,
      sdquality: "SD",
    });
    //////////////////////
  } catch (error) {
    // console.log(error);
    if (error) {
      const error = ErrorHandler.validationError("You have provided wrong url");
      return res.status(error.status).json({ message: error.message });
      // console.log(error);
    }
  }
};

const fbdownloadfinal = async (req, res) => {
  try {
    const selectedRadioButton = req.body.radioButton;

    console.log(`check selected button ${selectedRadioButton}`);
    // const filename = `${req.session.filename}.mp4`;
    const response = await axios({
      method: "GET",
      url: selectedRadioButton,
      responseType: "stream",
      timeout: 60000,
      // headers: {
      //   "Content-Type": "video/mp4",
      // },
    });

    const filename = "facebookvideo";

    res
      .status(200)
      .set("Content-Type", "video/mp4")
      .set("Content-Disposition", "attachment; filename=" + `${filename}.mp4`);

    response.data.pipe(res);
  } catch (error) {
    if (error) {
      const error = ErrorHandler.validationError("Error in Downloading");
      return res.status(error.status).json({ message: error.message });
      // console.log(error);
    }
  }
};
module.exports = {
  fbdownload,
  fbdownloadlogic,
  fbdownloadfinal,
};
