import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    boss: Boolean,
    password: String
});

export class User
{
    name: string;
    lastname: string;
    email: string;
    boss: boolean;
    password: string;
    constructor(name: string, lastname: string, email: string,boss: boolean,password: string)
    {
        name = this.name;
        lastname = this.lastname;
        email = this.email;
        boss = this.boss;
        password = this.password;   
    }
}