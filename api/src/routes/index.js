const axios = require('axios');
const {Dog, Temperament} = require('../db')

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const auxHelper = (string) => (array = string.split(' - '))

const apiData = async (dataExtended) => {
    const apiRawData = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    //deberia tirar un error en caso de quye la info venga vacia
    let apiData;
    dataExtended ? apiData = await apiRawData.data.map(breed => {
        return {
            id: breed.id,
            name: breed.name,
            image: breed.image.url,
            temperament: breed.temperament,
            weight: breed.weight,
            height: breed.height,
            life_span: breed.life_span,
            createdBreed: false
        };}) : apiData = await apiRawData.data.map(breed => {
            let array = auxHelper(breed.weight.imperial)
                return {
                    id: breed.id,
                    name: breed.name,
                    image: breed.image.url,
                    temperament: breed.temperament,
                    weight: {
                        imperial: breed.weight.imperial,
                        imperialAverage: (parseInt(array[0]) + parseInt(array[1])) / 2
                    
                    },
                    createdBreed: false
                };
            });
    return apiData;
}


const dbData = async () => {
    const dbBreeds = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    return dbBreeds; 
}


const getAllBreeds = async (dataExtended = false) => {
    const apiInfo = await apiData(dataExtended)
    const dbInfo = await dbData();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo
}


router.get('/dogs', async (req, res) => {
    try {
        const newBreedName = req.query.name;
        const dogs = await getAllBreeds();
        if (newBreedName) {
            const foundedBreed = dogs.filter(
                //podria ser un find?
                dog => dog.name.toLowerCase().includes(newBreedName.toLowerCase())
            )
            if (foundedBreed.length) {
                res.status(200).send(foundedBreed)
            } else {
                res.status(404).send("no esta la breed")
            }
        } 
        return res.status(200).send(dogs)
    } catch {
        console.log('fallo la carga de perros')
    }
})


router.get("/temperaments", async(req,res ) => {
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


router.post('/dogs', async (req, res) => {
    try{
        const {name, height, weight, life_span, temperament, createdBreed,} = req.body;
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


router.get("/dogs:idRaza", async (req, res) => {
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

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


module.exports = router;
