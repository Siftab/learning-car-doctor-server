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
 * /
 
/**
 *  1. set Cookies with httpOnly*/ 