/**
 * install jsonwebtoken 
 * 
 * make a post Api in server side and hit it clinet side after login 
 * in API==>  create const token = jwt.sign(user,secret ,{expairesIn:time}) 
 * send response(token)
*/


/**
 * first run node in your terminal to open node 
 * then  require("crypto").randomBytes(64).toString('hex')
 * you will get a string use it as token secret in .env file and access it as secret in your jwtSign in 
*/

/***
 * how to store token in client site
 * memory--> ok type
 * local storage -->ok type(xss)
 * 3.cookies : http only 
 * 
 *  1. set Cookies with httpOnly,seceure ,maxAge
 * 2. response take send korte hobe 
 *_____________________________________________
 * install cookie-parser in backend
 * COOKIE_PARSER_PART
 * const cookieParser= require('cookie-parser')
 * app.use(cookieParser())
 * 
 * 
 * ________________________________
 * CORS Origin part
 * in app.use(cors())
 * we need to set 
 * 1. origin: ['http://localhost:5173/login']
 * 2. credentials : true 
 * ---------------
 * final look
 * app.use(cors({origin:['http://localhost:5173/login'],credentials : true}))
 * 
 * _______________________________________________________________________________
 * FrontEnd=> Axios Part 
 * add {
 * withCredentials: true } after user in axios
 * ______________________________________________
 * verify part 
 * 
 * 
 * /