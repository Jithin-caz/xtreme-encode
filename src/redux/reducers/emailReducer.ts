
export const initialState={
    email:""
}

export const emailReducer=(state=initialState,action:any)=>
{
    switch(action.type)
    {
        case 'setemail':
            return {
                ...state,
                email:action.payload
            }
        case 'getemail':
            return{
                state
            }
        default:return state
    }
} 