require('dotenv').config()
import passport from "passport";
import {  Strategy,ExtractJwt} from "passport-jwt";
const SECRET = process.env.JWTSECRET;
import {conn} from "../database/connection";
var opts:any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;
passport.use('clientAuth',new Strategy(opts, function(jwt_payload, done) {
    if (jwt_payload && jwt_payload.jwtdata && jwt_payload.jwtdata.email &&  (jwt_payload.jwtdata.userrole==1)) {
        conn.query('select count(*) as cnt from user where id=? and role=1',[jwt_payload.jwtdata.id],(err,resfs)=>{
            if(err){
                return done(null, false);
            }else if(resfs[0]['cnt']>0){
                return done(null, jwt_payload);
            }else{
                return done(null, false);
            }
        })
    } else {
        return done(null, false);
    }
}));
passport.use('userAuth',new Strategy(opts, function(jwt_payload, done) {
    if (jwt_payload && jwt_payload.jwtdata && jwt_payload.jwtdata.email &&  jwt_payload.jwtdata.userrole==0) {
        conn.query('select count(*) as cnt from user where id=? and role=0',[jwt_payload.jwtdata.id],(err,resfs)=>{
            if(err){
                return done(null, false);
            }else if(resfs[0]['cnt']>0){
                return done(null, jwt_payload);
            }else{
                return done(null, false);
            }
        })
    } else {
        return done(null, false);
    }
}));
passport.use('Auth',new Strategy(opts, function(jwt_payload, done) {
    if (jwt_payload && jwt_payload.jwtdata && jwt_payload.jwtdata.email) {
        conn.query('select count(*) as cnt from user where id=?',[jwt_payload.jwtdata.id],(err,resfs)=>{
            if(err){
                return done(null, false);
            }else if(resfs[0]['cnt']>0){
                return done(null, jwt_payload);
            }else{
                return done(null, false);
            }
        })
        // return done(null, jwt_payload);
    } else {
        return done(null, false);
    }
}));
module.exports = passport;

