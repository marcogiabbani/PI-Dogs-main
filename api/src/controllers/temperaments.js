const { Router } = require('express');
const router = Router();
const axios = require('axios')
const { Temperament } = require("../db");

router.get("/", async(req,res ) => {
    const apiRawData = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const apiTemperaments = apiRawData.data.map(breed => breed.temperament ? 
        breed.temperament.split(', ') : null );
    tempers = apiTemperaments.reduce((first, second) => [...first.concat(second)])
    tempers.forEach(temp => {
        Temperament.findOrCreate({
            where: {name: temp}
        })
    })
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments)
})

module.exports = router;