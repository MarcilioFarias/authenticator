import {sequelize} from '../instances/mariadbConnection';
import { Model, DataTypes } from 'sequelize';

export interface authInterface extends Model {
    id:number;
    user: string;
    email:string;
    password: string;

}

export const auth = sequelize.define<authInterface>('authenticate', {

    id:{
        primaryKey:true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    user: {
        type: DataTypes.STRING
        
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'auth',
    timestamps: false
});