const router =require("express").Router();
const Car = require("../models/Car");

//Add Car
router.post("/", async (req, res) => {
    const newCar = new Car(req.body);
    let code = 1;
    try {
      const carcount = await Car.find().sort({_id:-1}).limit(1)
      if(carcount.length > 0)
        code += carcount[0].code
        newCar.car_Id='CI00' + code;
        newCar.code = code;
      try {
        const savedCar = await newCar.save();
        res.status(200).json(savedCar);
      } catch (err) {
        res.status(500).json(err);
      }
    }catch(error){
      console.log(error)
    } 
  });

//GET CAR
router.get("/:car_Id", async (req, res) => {
    try {
      const viewCar = await Car.findOne({'car_Id':req.params.car_Id});
      res.status(200).json(viewCar);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//GET ALL CARS
router.get("/", async (req, res) => {
      
  try {
    const viewCars = await Car.find();
    res.status(200).json(viewCars);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CAR
router.put("/update/:car_Id", async(req, res) => {

  try {
    const updatedCar = await Car.findOneAndUpdate(
      {':car_Id':req.params.car_Id},
      {
        $set: req.body
      },
      {new:true}
    );
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;