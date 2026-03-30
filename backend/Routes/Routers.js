const modelschema = require("../models/schema");
const express = require("express");
const router = express.Router();
const uploads = require("../multer/imgmulter");
const { model } = require("mongoose");

router.post("/category", uploads.single("Img"), async (req, res) => {
  try {
    const data = req.body;

    const newcategory = await modelschema.create({
        Img: req.file ? req.file.path.replace(/\\/g, "/") : null,
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

router.get("/categroy", async(req,res)=>{
    try{
      const data= await modelschema.find();
    console.log(data);
    res.status(201).json({message:"successfully"});
    }
   catch(error){
    res.status(500).json({message:"server error"});
   }
})
module.exports = router;
