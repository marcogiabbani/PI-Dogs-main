const axios = require('axios');
const {Raza, Temperamento} = require('../db')

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const apiData = async () => {
    const apiBreeds = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    //deberia tirar un error en caso de quye la info venga vacia
    const apiData = await apiBreeds.data.map(breed => {
        return {
            id: breed.id,
            name: breed.name,
            image: breed.image,
            temperament: breed.temperament,
            //mas tarde puede que haya que hacer un split aca.
            weigth: breed.weigth,
            localDbBreed: false
        };
    });
    return apiData;
}

const dbData = async () => {
    const dbBreeds = await Raza.findAll({
        include: {
            model: Temperamento,
            attributes: ['name'],
            through: {
                attributes: [],
            }

        }
    })
    return dbBreeds; 
}

const getAllBreeds = async () => {
    const apiInfo = await apiData();
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
            return res.status(200).json(dogs)
    } catch {
        console.log('fallo la carga de perros')
    }
})



//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


module.exports = router;