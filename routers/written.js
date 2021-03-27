const { json } = require("body-parser");
const express  = require("express");
const { data } = require("jquery");
const moment   = require('moment');

const Writtens = require("../schemas/written");
const router   = express.Router();

router.get("/written", async(req, res) => {
    try {
       const { category } = req.query; 
        const writtens    = await Writtens.find({ category }).sort("date")
        res.json({writtens})
    } catch (err) {
        console.error(err);
        next(err);
      }
    });

router.get("/written/:writtensId", async (req, res) => {
    const {writtensId} = req.params;

    writtens = await Writtens.findOne({ writtensId: writtensId });
    res.json({detail : writtens})
})

router.post("/written", async(req, res, next) => {
     try {
        const {title, image_url, description, user, password, category } = req.body;
        let writtensId = 0;
        var date     = moment().format("YYYY년 MM월 DD일");
        let data     = await Writtens.find({}).sort("-writtensId")
         
         if (data.length == 0) {
            writtensId = 1
         }else{
            writtensId   = data[0]["writtensId"] + 1
         }

         await Writtens.create({ writtensId, title, image_url, description, user, password, date, category})   
         res.send({result : true})  
      } catch(err) {
          console.error(err);
          next(err);
      }
});

router.delete('/written', async(req, res, next) => {
   try {
      const writtensId = req.body.id
      const find_obj = await Writtens.findOne({writtensId})
      
      if (find_obj.password == req.body.password) {
         await Writtens.deleteOne({writtensId})
         res.send({result:"삭제되었습니다"})
      }else{
      res.send({result:"비밀번호가 틀렸습니다"})
      }
} catch(err) {
   console.error(err);
   next(err);
}
})

router.post('/update', async(req, res, next) => {
   const {writtensId, title, image_url, description, user, password} = req.body
   
   const find_obj = await Writtens.findOne({writtensId})
   if (password == find_obj.password){
      await Writtens.updateOne({writtensId}, { $set:{ title, image_url, description, user} });
      res.send({result : true})
   }else{
      res.send({result : false})
   }
})
module.exports = router;
