import mongoose from 'mongoose'
import express from 'express'

const router = express.Router()

const fruitSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});
const Fruit = mongoose.model('Fruit', fruitSchema);

router.route("/seed").get(async (req,res)=>{
    try {
        await Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ])
        res.redirect('/fruits')
    } catch (error) {
        console.error(error)
      }
})
// INDUCES

router.route("/").get(async (req,res)=>{
    try{
        const fruits = await Fruit.find()
        res.json(fruits)
    }catch (err) {
        console.log(err)
    }
    // res.send(fruits)
}).post(async (req, res) => {
    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }

    try {
        const createdFruit = await Fruit.create(req.body);
        res.status(201).json(createdFruit);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

router.route("/:id").post(async (req,res)=>{
    try {
        await Fruit.findByIdAndRemove(req.params.id)
        res.redirect('/fruits')//redirect back to fruits index
    } catch(error) {
        console.error(error);
      }
}).put(async (req,res)=>{
    try {
        if (req.body.readyToEat === "on") {
          //if checked, req.body.readyToEat is set to 'on'
          req.body.readyToEat = true; //do some data correction
        } else {
          //if not checked, req.body.readyToEat is undefined
          req.body.readyToEat = false; //do some data correction
        }
        // fruits.push(req.body);
        await Fruit.findByIdAndUpdate(req.params.id, req.body);
    
        res.redirect("/fruits");
      } catch (error) {
        console.log(error);
      }
}).get(async (req,res)=>{
    try{
        const fruit = await Fruit.findById(req.params.id)
        res.json(fruit)
    } catch(err) {
        console.log(err)
    }
}).delete( async (req, res)=>{
    try {
        await Fruit.findByIdAndDelete(req.params.id)
        res.redirect('/fruits')//redirect back to fruits index
    } catch(error) {
        console.error(error);
        }
})




export default router;