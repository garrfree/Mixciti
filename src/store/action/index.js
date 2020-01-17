

export function changeUser() {
    return dispatch => {
        console.log("Function Chal raha hai")
        dispatch({type: "CHANGE",payload: "ahmed"})
    }
}