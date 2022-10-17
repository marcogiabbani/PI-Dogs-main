import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getDogsTemperaments(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/temperaments");
        return dispatch({
            type: 'GET_DOGS_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function getBreedName(payload) {
    return async function(dispatch) { 
        try {
            let json = await axios.get(`http://localhost:3001/dogs?name=${payload}`)
            return dispatch ({
                type:"GET_NAME_BREEDS",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterDogsByTemperament(payload) {
    return {
        type: "FILTER_BY_TEMPERAMENTS",
        payload
    }
}

export function filterByCreated(payload) {
    return {
        type: "FILTER_BY_CREATED",
        payload
    }
}

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: "ORDER_BY_WEIGHT",
        payload
    }
}
