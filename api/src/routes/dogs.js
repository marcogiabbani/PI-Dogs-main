const { Router } = require('express');
const router = Router();
const { Dog, Temperament } = require("../db");
const {getAllBreeds, validateData, validateExistance}  = require("../controllers/index");


router.get('/', async (req, res) => {
    try {
        const newBreedName = req.query.name;
        const dogs = await getAllBreeds();
        if (newBreedName) {
            const foundedBreed = dogs.filter(
                //podria ser un find?
                dog => dog.name.toLowerCase().includes(newBreedName.toLowerCase())
            )
            if (foundedBreed.length) {
                return res.status(200).send(foundedBreed)
            } else {
                return res.status(404).send("no esta la breed")
            }
        } 
        return res.status(200).send(dogs)
    } catch (error){
        console.log(error.message)
       return res.status(400).send(error.message)
    }
})





router.post('/', async (req, res) => {
    const {name, height, weight, life_span, temperament, createdBreed,} = req.body;
    try{
        validateData(name, height, weight)
        let allDogs = await getAllBreeds()
        validateExistance(allDogs, name)
        let dog = await Dog.create({
            name,
            height,
            weight,
            life_span,
            createdBreed,
        });
        let temperamentDb = await Temperament.findAll({
            where: {name: temperament},
        });
        dog.addTemperament(temperamentDb);
        res.status(200).send("Breed created successfully");
    } catch (error) {
        if (error.message == 'Missing or damaged data') return res.status(400).send(error.message)
        if (error.message == 'Breed already exists') return res.status(401).send(error.message)//unauthorized
        return res.status(500).send(error.message)//cant resolve
    }
});


router.get("/:idRaza", async (req, res) => {
    try {
        const {idRaza} = req.params;
        if (idRaza) {
            let dataExtended = true;
            const dogs = await getAllBreeds(dataExtended);
            const foundedDog = dogs.filter((breed) => (breed.id == idRaza))
            res.status(200).send(foundedDog)
        }
    }  catch {
        res.status(404).send("no se encontro el perro")
    }
})


module.exports = router;