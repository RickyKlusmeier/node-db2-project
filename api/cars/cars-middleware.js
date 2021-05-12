const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  Cars.getById(id)
  .then(car => {
    if (!car) {
      res.status(404).json({
        message: `There is no car with id ${id}`
      })
    } else {
      next()
    }
  }) .catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { 
    vin,
    make,
    model,
    mileage
  } = req.body
  if (!vin) {
    res.status(400).json({
      message: `Vin is missing`
    })
  } else if (!make) {
    res.status(400).json({
      message: `Make is missing`
    })
  } else if (!model) {
    res.status(400).json({
      message: `Model is missing`
    })
  } else if (!mileage) {
    res.status(400).json({
      message: `Mileage is missing`
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const vin = req.body.vin
  const isValidVin = vinValidator.validate(vin)
  if (!isValidVin) {
    res.status(400).json({
      message: `vin ${vin} is invalid`
    })
  } else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const vin = req.body.vin
   Cars.getVinNumber(vin)
   .then(car => {
     console.log(vin)
     if(!car) {
       next()
     } else {
       res.status(400).json({
         message: `Vin ${vin} already exists`
       })
     }
   })
 }

 module.exports = {
   checkCarId,
   checkCarPayload,
   checkVinNumberValid,
   checkVinNumberUnique
}
