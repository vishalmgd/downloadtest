const axios = require("axios");
const fbDownloader = require("./facebookmain");
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

    // console.log('testing facebook url');
    // res.send(url)
    // TEST
    const test = async (url) => {
      return await fbDownloader(url);
    };
      
      const testresult = await test(urllist);
      
      const hdurl = testresult.download[0].url;
      // console.log(`checking test url${hdurl}`);
      const hdquality = testresult.download[0].quality;

      const sdurl = testresult.download[1].url;
      const sdquality = testresult.download[1].quality;

      // console.log(furl);
      // console.log(fquality);
   

    res.render("facebookpage", {
      title: "Facebook",
      hdurl: hdurl,
      hdquality: hdquality,
      sdurl: sdurl,
      sdquality: sdquality,
    });
    //////////////////////
  } catch (error) {
    // console.log(error);
    if (error) {
      const error = ErrorHandler.validationError(
        "You have provided wrong url"
      );
      return res.status(error.status).json({ message: error.message });
    }
  }
};

const fbdownloadfinal = async (req, res) => {
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
};
module.exports = {
  fbdownload,
  fbdownloadlogic,
  fbdownloadfinal,
};
