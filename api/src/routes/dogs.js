const { Router } = require('express');
const router = Router();
const { Dog, Temperament } = require("../db");
let getAllBreeds  = require("../controllers/index");


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

const validateData = (name, height, weight) => {
    if (!name || !height || !weight) throw new Error ('missing full data')
    //podria haber otras validaciones de datos aca, incluyendo los datos no obligatorios
}


router.post('/', async (req, res) => {
    //podria hacer tres try catch para que en cada cactch pueda responder con un estatus determinado
    try{
        //aca iria un controller que verifica que los campos requeridos hallan venido por body
        const {name, height, weight, life_span, temperament, createdBreed,} = req.body;
        //aca iria un controller que busca a ver si existe una raza con ese nomre y si la hay, lanza un error
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
    res.status(200).send("Ok");
    } catch (error) {
    res.status(400).send("fallo la carga")
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