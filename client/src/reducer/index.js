import { getDogsTemperaments } from "../actions";

const initialState = {
    dogBreeds : [],
    allDogBreeds : [],
    dogTemperaments : []
    
    //WHAT IS HOUNG ON 
}

function rootReducer (state = initialState, action){
    switch(action.type) {
        case "GET_DOGS":
            return {
                ...state,
                dogBreeds: action.payload,
                allDogBreeds : action.payload
            }
        case "GET_DOGS_TEMPERAMENTS":
            return {
                ...state,
                dogTemperaments: action.payload
            }
        case 'FILTER_BY_TEMPERAMENTS':
            const allDogs = state.allDogBreeds;
            const temperamentFiltered = action.payload === 'All' ? allDogs :
            allDogs.filter(dog => dog.temperament && 
                           dog.temperament.includes(action.payload))
            return {
                ...state, 
                dogBreeds: temperamentFiltered
            }
        case "FILTER_BY_CREATED":
            const createdAndApiDogs = state.allDogBreeds;
            const createdFiltered = action.payload === 'created' ? 
            createdAndApiDogs.filter(dog => dog.createdBreed) :
            createdAndApiDogs.filter(dog => !dog.createdBreed)
            return {
                ...state,
                dogBreeds: action.payload === 'All' ? state.allDogBreeds :
                            createdFiltered
            }
        default:
            return state;
    }

}
export default rootReducer;