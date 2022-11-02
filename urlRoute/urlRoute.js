const router = require("express").Router();
const model = require("../model/userModel");
const axios = require("axios");


// For finding one url
module.exports = router.post("/", async (req, res) => {
  // try {
  //   // const url = req.body.url

  //   const fetchUrlContent = async () => {
  //     const data = await axios.get(req.body.url);

  //     console.log("type of", data.data);
  //     return data;
  //   };
  //   const data = fetchUrlContent
  //     .toString()
  //     .replace(/[^A-Za-z']+/g, " ")
  //     .trim()
  //     .toLowerCase()
  //     .split(" ")
  //     .filter((word) => word !== "").length;

  //   if (!data) {
  //     res.status(400).send({
  //       message: " Failed to fetch",
  //       success: false,
  //       data: null,
  //     });
  //   } else {
  //     const details = await model.create({
  //       domainName: req.body.url,
  //       wordCount: data,
  //       weblink: "",
  //       mediaLink: "",
  //       isFavourite: false,
  //     });

  //     details.save();

  //     console.log(details);
  //     return res.status(200).send({
  //       message: "fetched successful",
  //       success: true,
  //       data: null,
  //     });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.status(410).send(error);
  // }
  const data1 = req.body.data;
  console.log(data1);

  try {
    const details = await model.find();
console.log("deatils",details);
    const result = details.find((data) => data.domainName == data1);
    console.log(result);
    if (result) {
      res.status(200).send({      
        message: "successfull",
        success: true,

        data: result
      });
    } else {
      res.status(401).send({
        message: "Invalid URL",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).send({  
      message: error.message,
    })
  }
});
// For getting single url
module.exports = router.post("/getDetails", async (req, res) => {
  try {
    const details = await model.find();
    const result = details.filter((data)=>data.id==req.body._id)
    console.log("details",result);
    res.status(200).send({   
      message: "fetched successful",   
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(403).send({
      message: error.message,
      success: false,
      data: null,  
    });
  }
});
// For Deletion
module.exports = router.post("/delete", async (req, res) => {
  try {
    await model.findByIdAndDelete(req.body._id);
    console.log("deleted succesfully");
    res.status(200).send({
      message: "updated suucessfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// for updation
module.exports = router.post("/update", async (req, res) => {
  try {
    console.log(req.body._id);
    await model.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).send({
      message: "updated suucessfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
