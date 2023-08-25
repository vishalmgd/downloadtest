const youtubedl = require("youtube-dl-exec");
const axios = require("axios");
const ErrorHandler = require("../errors/ErrorHandler");


const youtubedownload = async (req, res) => {
  res.render("youtubepage", {
    title: "Youtubepage",
    link720p: "",
    link1080p: "",
    link360p: "",
    audiolink: "",
    audioformat: "",
  });
};

const youtubedownloadlogic = async (req, res) => {
  // console.log('u r here');

  console.log(`ul here ${req.body.url}`);
  try {
    url = req.body.url;

    if (!url) {
      const error = ErrorHandler.validationError("Please provide Youtube URL!");
      return res.status(error.status).json({ message: error.message });
    }

    const ytdlist = await youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    });

    const newslicedobj = ytdlist.formats;
    // console.log(`checking new slice object ${newslicedobj}`);

    ////////  720p
    const newobj720p = newslicedobj.filter((element, index) => {
      return (
        element.vcodec !== "none" &&
        element.acodec !== "none" &&
        element.format_note === "720p"
      );
    });
    // console.log(newobj720p);
    const link720p = newobj720p[0]?.url;
    const format720p = newobj720p[0]?.format_note;
    ////////  360p
    const newobj360p = newslicedobj.filter((element, index) => {
      return (
        element.vcodec !== "none" &&
        element.acodec !== "none" &&
        element.format_note === "360p"
      );
    });

    const link360p = newobj360p[0]?.url;
    const format360p = newobj360p[0]?.format_note;
    // const extensionname360 = newobj360p[0]?.ext;

    //////  1080p
    const newobj1080p = newslicedobj.filter((element, index) => {
      return (
        element.vcodec !== "none" &&
        element.acodec !== "none" &&
        element.format_note === "1080p"
      );
    });

    const link1080p = newobj1080p[0]?.url;
    const format1080p = newobj1080p[0]?.format_note;

    ///  for audio file

    // const audio = ytdl(url, { filter: 'audioonly' });
    // console.log('testing new method');
    // console.log(audio);

    const formats = ytdlist.formats;

    const audioFormats = formats.filter((element) => {
      return (
        element.vcodec === "none" && element.acodec !== "none"
        // &&
        // element.container === "m4a"
      );
    });

    const audiolink = audioFormats[0]?.url;
    const audioformat = audioFormats[0]?.format_note;


    res.render("youtubepage", {
      title: "Youtubepage",

      link1080p: link1080p,
      format1080p: format1080p,

      link720p: link720p,
      format720p: format720p,

      link360p: link360p,
      format360p: format360p,

      audiolink: audiolink,
      audioformat: audioformat,
    });
    //////////////////////
  } catch (error) {
    // console.log(error);
    if (error) {
      const error = ErrorHandler.validationError("You have provided wrong url");
      return res.status(error.status).json({ message: error.message });
    }
  }
};

const youtubedownloadfinal = async (req, res) => {
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

  const filename = "youtubevideo";

  res
    .status(200)
    .set("Content-Type", "video/mp4")
    .set("Content-Disposition", "attachment; filename=" + `${filename}.mp4`);

  response.data.pipe(res);




};
module.exports = {
  youtubedownload,
  youtubedownloadlogic,
  youtubedownloadfinal,
};
