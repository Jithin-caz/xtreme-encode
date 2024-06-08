export const setemail=(email:string)=>{
    return {
        type:'setemail',
        payload:email
    };

}

export const getemail=()=>{
    return {
        type:'getemail',
    };

}