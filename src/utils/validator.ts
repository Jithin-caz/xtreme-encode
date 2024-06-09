import bcrypt from 'bcrypt'
export const Validate=async(authemail:string,cookie:string)=>{
    const reqstring=`${process.env.SECRET_ONE}${authemail}${process.env.SECRET_TWO}`
  const match = await bcrypt.compare(reqstring,cookie);
  if(match)
    return true
    else
    return false
}