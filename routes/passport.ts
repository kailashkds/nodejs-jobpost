require('dotenv').config()
import passport from "passport";
import {  Strategy,ExtractJwt} from "passport-jwt";
const SECRET = process.env.JWTSECRET;
import { User } from "../models";
var opts:any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;
passport.use('clientAuth',new Strategy(opts, function(jwt_payload, done) {
    if (jwt_payload && jwt_payload.jwtdata && jwt_payload.jwtdata.email &&  (jwt_payload.jwtdata.userrole==1)) {
        User.findOne({where:{role:1,id:jwt_payload.jwtdata.id}}).then(data => {
            if(!data){
                return done(null, jwt_payload);
            }else{
                return done(null, jwt_payload);
            }
        }).catch(err => {
            return done(null, false);
        });
    } else {
        return done(null, false);
    }
}));
passport.use('userAuth',new Strategy(opts, function(jwt_payload, done) {
    if (jwt_payload && jwt_payload.jwtdata && jwt_payload.jwtdata.email &&  jwt_payload.jwtdata.userrole==0) {
        User.findOne({where:{role:0,id:jwt_payload.jwtdata.id}}).then(data => {
            if(!data){
                return done(null, jwt_payload);
            }else{
                return done(null, jwt_payload);
            }
        }).catch(err => {
            return done(null, false);
        });
    } else {
        return done(null, false);
    }
}));
passport.use('Auth',new Strategy(opts, function(jwt_payload, done) {
    if (jwt_payload && jwt_payload.jwtdata && jwt_payload.jwtdata.email) {
        User.findOne({where:{id:jwt_payload.jwtdata.id}}).then(data => {
            if(!data){
                return done(null, jwt_payload);
            }else{
                return done(null, jwt_payload);
            }
        }).catch(err => {
            return done(null, false);
        });
    } else {
        return done(null, false);
    }
}));
module.exports = passport;

