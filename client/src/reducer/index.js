
const initialState = {
    dogBreeds : []
    //WHAT IS HOUNG ON 
}

function rootReducer (state = initialState, action){
    switch(action.type) {
        case "GET_DOGS":
            return {
                ...state,
                dogBreeds: action.payload
            }
        default:
            return state;
    }

}
export default rootReducer;