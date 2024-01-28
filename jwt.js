const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);


function signJwt(username,password){
    const userameResponse = emailSchema.safeParse(username);
    const PasswordResponse = passwordSchema.safeParse(password);

    if(!userameResponse||!passwordSchema){
        return null;
    }

    const signature = jwt.sign({username},jwtPassword);
    return  signature
}

function decodeJwt(token){
    const decoded = jwt.decode(token);

    if(decoded){
        return true
    }else{
        false
    }
}

function verifyJwt(token){
    const verified = jwt.verify(token,jwtPassword)
    if(verified){
        return true
    }else{
        return false
    }
}