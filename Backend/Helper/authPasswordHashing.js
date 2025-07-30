import bcrypt from "bcrypt"


// hasing New Password 

export const hasedPassword= async(password)=>{
    try {
        const hasedPassword= await bcrypt.hash(password,10);
        return hasedPassword
    } catch (error) {
        console.log("Error in hashing Password", error)
    }
}

// password decrption and comapre hasing password 

export const comparePassword = async(password,hasedPassword)=>{
    try {
        return bcrypt.compare(password, hasedPassword)
    } catch (error) {
        console.log("Error in Compare hasing Password ",error)
    }
}