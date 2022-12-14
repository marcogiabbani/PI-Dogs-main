const axios = require('axios')
const { Dog, Temperament } = require("../db");
const AVERAGE = 0;
const RANGE = 1;


const parseRange = (string) => {
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
    let apiData;

    dataExtended ? apiData = await apiRawData.data.map(breed => {
            let averageAndCorrectedWeight = parseRange(breed.weight.metric);
            let averageAndCorrectedHeight = parseRange(breed.height.metric);
            return {
                id: breed.id,
                name: breed.name,
                image: breed.image.url,
                temperament: breed.temperament,
                weight:averageAndCorrectedWeight[RANGE],
                height: averageAndCorrectedHeight[RANGE],
                life_span: breed.life_span,
                createdBreed: false
            }
        }) : apiData = await apiRawData.data.map(breed => {
            let averageAndCorrectedWeight = parseRange(breed.weight.metric);
                return {
                    id: breed.id,
                    name: breed.name,
                    image: breed.image.url,
                    temperament: breed.temperament,
                    weight: {
                        metric: averageAndCorrectedWeight[RANGE],
                        metricAverage: averageAndCorrectedWeight[AVERAGE]
                    },
                    createdBreed: false
                }
        })
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


const validateData = (name, height, weight) => {
    if (!name || !height || !weight) throw new Error ('Missing or damaged data')
    //podria haber otras validaciones de datos aca, incluyendo los datos no obligatorios
}

const validateExistance = (dogs, targetName) => {
    if (dogs.find(dog => dog.name === targetName)) {
        throw new Error ('Breed already exists')
    }
}

module.exports = {getAllBreeds, validateData, validateExistance};