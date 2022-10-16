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

export function filterDogsByTemperament(payload) {
    return {
        type: "FILTER_BY_TEMPERAMENTS",
        payload
    }
}
