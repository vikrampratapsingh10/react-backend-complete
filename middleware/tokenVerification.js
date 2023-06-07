import jwt from "jsonwebtoken";

export const verifyToken = (request,response,next)=>{
    let token = request.headers.authorization;
    try{
        if(!token)
          throw new Error()
        token = token.split(" ")[1]
        jwt.verify(token, 'fkjdfhfflfglkfaslfgdlf') 
        next(); 
    }
    catch(err){
        return response.status(401).json({error: "unauthorization error ", status: false});
    }
 
}