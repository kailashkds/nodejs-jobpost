import {User} from './User';
import {DataTypes, Model, Sequelize} from 'sequelize'
import { now } from 'sequelize/types/lib/utils';
import { sequelize } from './instance'
export const Job =sequelize.define<any>("job", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    no_of_hire: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    salary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job_end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    work_remotely: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});
Job.hasMany(User, {foreignKey: 'id',as:"client"})
User.belongsTo(Job, {foreignKey: 'id', targetKey: 'client_id'})