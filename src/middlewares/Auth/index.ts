import { Request, Response, NextFunction } from "express";
import { AuthType, genCookieType } from "../../types/index.js";
import Jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const genCookie: genCookieType = (req, res, next ) => {
  const sercret = process.env.SECRET;
  if( sercret ){
    const signedJwt = Jwt.sign({token: 'jwt token'},sercret, { expiresIn: 90 });
    res
    .header('x-api-key', signedJwt)
    .header('access-control-expose-headers', 'x-api-key');
    next();
  }
};

export const Auth: AuthType = (req, res, next ) => {
  // try {
    const sercret = `${process.env.SECRET}`;
    const cookies: string = req.cookies['key'];
    // console.log( cookies );
    if( cookies ){
      Jwt.verify(cookies, sercret);
      next();
    }else{
      res
      .status(400)
      .json({ error: 'invalid Token' });
    };
  // } catch (error) {
  //   console.log(error)
  //   res
  //   .status(401)
  //   .json({ error: 'You Are Not Allowed!' });
  // };
};
