import * as mongoose from 'mongoose';

export const MakeSchema = new mongoose.Schema({
    time: Number,
    name: String,
    lastname: String,
    dateTime: String,
    boss: Boolean,
    done: Boolean

});

export class Make
{
    time: number;
    name: string;
    lastname: string;
    dateTime:string;
    boss: boolean;
    done:boolean;

    constructor(time: number, name: string, lastname: string, dateTime: string,boss:boolean, done:boolean=false)
    {
        time = this.time;
        name = this.name;
        lastname = this.lastname;
        dateTime = this.dateTime;
        boss = this.boss;
        done = this.done;
    }
}