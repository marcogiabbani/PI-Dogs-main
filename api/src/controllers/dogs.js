const { Router } = require('express');
const router = Router();
const axios = require('axios')
const { Dog, Temperament } = require("../db");


function handleRange(string) {
    let averageAndCorrectedString = []
    if (string.includes('NaN') && string.includes(" - ")) {
        let stringWithoutNan = string.replace('NaN', '');
        let onlyNumberString = stringWithoutNan.replace(' - ', '');
        averageAndCorrectedString.push(parseInt(onlyNumberString));
        averageAndCorrectedString.push(string.replace('NaN', 'No info'));

    } else if (string.includes('NaN') && !string.includes(" - ")) {
        averageAndCorrectedString.push(0)
        averageAndCorrectedString.push(string.replace('NaN', 'No info'))

    } else if (!string.includes('NaN') && !string.includes(" - ")) {
        averageAndCorrectedString.push(parseInt(string));
        averageAndCorrectedString.push(string + ' only info')

    } else {
        let numberArr = string.split(' - ')
        let average = (parseInt(numberArr[0]) + parseInt(numberArr[1])) / 2;
        averageAndCorrectedString.push(average, string)
    }
    return averageAndCorrectedString;
}


const apiData = async (dataExtended) => {
    const apiRawData = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    //deberia tirar un error en caso de quye la info venga vacia
    let apiData;
    dataExtended ? apiData = await apiRawData.data.map(breed => {
        // let averageAndCorrectedWeight = handleRange(breed.weight.metric);
        // let averageAndCorrectedHeight = handleRange(breed.height.metric);
        //ojo que quizas tengo que mandar weight y height en metric
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
            let averageAndCorrectedWeight = handleRange(breed.weight.metric);
                return {
                    id: breed.id,
                    name: breed.name,
                    image: breed.image.url,
                    temperament: breed.temperament,
                    weight: {
                        metric: averageAndCorrectedWeight[1],
                        metricAverage: averageAndCorrectedWeight[0]
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
                res.status(200).send(foundedBreed)
            } else {
                res.status(404).send("no esta la breed")
            }
        } 
        return res.status(200).send(dogs)
    } catch (error){
       return res.status(400).send(error.message)
    }
})





router.post('/', async (req, res) => {
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