const modelschema = require("../models/schema");
const express = require("express");
const router = express.Router();
const fs=require("fs");
const uploads = require("../multer/imgmulter");

router.post("/category", uploads.single("Img"), async (req, res) => {
  try {
    const data = req.body;

    const newcategory = await modelschema.create({
      Img: req.file
        ? req.file.path.replace(/\\/g, "/").replace(/\s/g, "")
        : null,
      ...data,

      //    Img: req.file ? req.file.path.replace(/\\/g, "/") : null,
      //   Categoryname: data.Categoryname,
      //   Slug: data.Slug,
      //   Description: data.Description,
    });

    res.status(200).json({ Message: "successfully", data: newcategory });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/category", async (req, res) => {
  try {
    const data = await modelschema.find();

    res.status(200).json({ message: "successfully", data: data });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.delete("/category/:_id", async (req, res) => {
  try {
    const data = req.params._id;
    
    const finddata = await modelschema.findByIdAndDelete(data);

    if (!finddata) {
      return res.status(404).json({ message: "not find data" });
    }
    const filepath=finddata(Img);
    fs.unlink(filepath,(err)=>{
      if(err){
        console.log(" error delete file ",err)
      }
      else{
        console.log("delete succesfully");
      }
    })
    
    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
