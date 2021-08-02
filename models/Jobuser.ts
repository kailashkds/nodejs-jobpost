import {DataTypes, Model, Sequelize} from 'sequelize'
import { sequelize } from './instance'
import { Job } from './Job';
import { User } from './User';
export const Jobuser =sequelize.define<any>("job_user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Jobuser.hasMany(User, {foreignKey: 'id'})
User.belongsTo(Jobuser, {foreignKey: 'id', targetKey: 'user_id'})
Jobuser.hasMany(Job, {foreignKey: 'id'})
Job.belongsTo(Jobuser, {foreignKey: 'id', targetKey: 'job_id'})