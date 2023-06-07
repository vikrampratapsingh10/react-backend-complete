import jwt from "jsonwebtoken"
export const verificationToken = (request, response, next) => {
    try {
        let token = request.headers.authorization;
        if (!token) 
            throw new Error()
            token = token.split(" ")[1]
            jwt.verify(token, 'fdgljfiofojffjdfjdfkjof');
            next();
    }
    catch(err){
        console.log(err)
      return response.status(500).json({error:"unauthorization"})  
    }
}