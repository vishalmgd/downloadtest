const youtubedl = require("youtube-dl-exec");
const axios = require("axios");
const ErrorHandler = require("../errors/ErrorHandler");
const { request, response } = require("express");

const youtubedownload = async (req, res) => {
  res.render("youtubepage", {
    title: "Youtubepage",
    link720p: "",
    link1080p: "",
    link360p: "",
    linkmp3: "",
    formatmp3: "",
    extmp3: "",
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
    // console.log(`checking new slice object ${ytdlist}`);
    delete ytdlist.automatic_captions;
    delete ytdlist.thumbnails;
    delete ytdlist.description;
    delete ytdlist.chapters;
    /////////////////////////////////////////////////////////////////////////////
    ///extremly important
    // const sliced = Object.keys(ytdlist)
    //   .slice(0, 2)
    //   .reduce((result, key) => {
    //     result[key] = ytdlist[key];

    //     return result;
    //   }, {});
    // // const checks = sliced.formats;
    // console.log(sliced);

    /////////////////////////////////////////////////////////////////
    // req.session.filename = sliced.title;

    const newslicedobj = ytdlist.formats;

    /// new item for mp3

    const mp3 = ytdlist.formats.filter((element, index) => {
      return element.acodec !== "none" && element.vcodec == "none";
    });
    // console.log("sliced for mp3", mp3);

    // console.log(`sliced for mp3 ${sliced1formp3}`);// will not work please learn logic
    // console.log(sliced1formp3);
    
    const linkmp3 = mp3[0]?.url;
    const formatmp3 = mp3[0]?.resolution || `${mp3[0]}?."audio only"`;
    const extmp3 = mp3[0]?.audio_ext;
    console.log(extmp3);

    req.session.mp3file = linkmp3;
    

    ////////  720p
    const newobj720p = newslicedobj.filter((element, index) => {
      return (
        element.vcodec !== "none" &&
        element.acodec !== "none" &&
        element.format_note === "720p"
      );
    });

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

    ////////////
    res.render("youtubepage", {
      title: "Youtubepage",

      link1080p: link1080p,
      format1080p: format1080p,

      link720p: link720p,
      format720p: format720p,

      link360p: link360p,
      format360p: format360p,

      linkmp3: linkmp3,
      formatmp3: formatmp3,
      extmp3: extmp3,

      // linkaudio:linkaudio,
      // formataudio:formataudio
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
  const audiofile = req.body.formatmp3;
  const extmp3 = req.body.extmp3;

  console.log(`checking audio file ${audiofile}`);
  console.log(`checking audio extmp3 ${extmp3}`);
  console.log(`check selected button ${selectedRadioButton}`);
  console.log(`check selected button ${req.session.mp3file}`);
  // console.log(`You are hereeeeeeeeeeeeeeeeeeeeeeeeeee`);
  // const filename = `${req.session.filename}.mp4`;
  if (selectedRadioButton === "audio only") {
    console.log(`url getting from session ${req.session.mp3file}`);
    try {
      const response = await axios({
        method: "GET",
        // url: selectedRadioButton,
        url: req.session.mp3file,
        responseType: "stream",
        timeout: 90000,
      });
      const filename = `youtubeaudio.${extmp3}`;
      // header setting

      if (extmp3 === "mp3") {
        res.set("Content-Type", "audio/mpeg");
      } else if (extmp3 === "wav") {
        res.set("Content-Type", "audio/wav");
      } else if (extmp3 === "m4a") {
        res.set("Content-Type", "audio/mp4");
      } else if (extmp3 === "webm") {
        res.set("Content-Type", "audio/webm");
      } else {
        // set default MIME type
        res.set("Content-Type", "audio/mpeg");
      }
      // Set the Content-Type header to the appropriate audio MIME type
      res.set("Content-Disposition", "attachment; filename=" + filename);

      ///

      response.data.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error/Timeout");
    }
  } else {
    try {
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
        .set(
          "Content-Disposition",
          "attachment; filename=" + `${filename}.mp4`
        );

      response.data.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
};
module.exports = {
  youtubedownload,
  youtubedownloadlogic,
  youtubedownloadfinal,
};
