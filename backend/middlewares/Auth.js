import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({
                message: 'User not authenticated!',
                success: false
            })
        }

        // if exists decode the code by verifying
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if(!decode) {
            return res.status(401).json({
                message: 'Invalid token!',
                success: false
            })
        }

        // decode hojata hai to kuch information milti hai user ki jo humne insert kr rkhi hai (user controller mai login mai) --> userid
        // humne token generate krte waqt token ke andr user ki id dali thi.. to yehi pr hume yeh milega

        req.id = decode.userId;  // req ki id mai yeh store krdunga
        next();

    } catch (error) {
        console.error(error);
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}


export default isAuthenticated;