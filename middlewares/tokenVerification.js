import Jwt from "jsonwebtoken";

export const verifyTokenForSeller = (request, response, next) => {
    let token = request.headers.authorization;
    try {
        if (!token)
            throw new Error();
        token = token.split(' ')[1];
        Jwt.verify(token, "bughgdfhgdhghdghghhg");
        next();
    } catch (err) {
        console.log(err);
        return response.status(401).json({ error: "Unauthorized Request", status: false });
    }
}

export default verifyTokenForSeller;
