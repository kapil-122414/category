const modelschema = require("../models/schema");
const express = require("express");
const router = express.Router();
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

router.delete("/category/:Categoryname ",async(req,res)=>{
  try{ 
    const data=req.findOne();
  console.log(data);
}
catch(error){
  res.status(500).json
}

 

})
module.exports = router;
