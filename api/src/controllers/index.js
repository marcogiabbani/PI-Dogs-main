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

module.exports = getAllBreeds;