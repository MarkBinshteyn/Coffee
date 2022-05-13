import { Injectable} from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { User } from './users.model';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as jwt from "jsonwebtoken";

@Injectable()
export class UsersService{
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async insertUser(name: string, lastname: string, email: string, boss: boolean, password: string)
    {
        const newUser = new this.userModel({name: name, lastname: lastname, email: email, boss: boss, password: password});
        const result = await newUser.save();
        return {ok:true}
    }
    async getUsers() {
        const users = await this.userModel.find().exec();
        return users as User[];
    }
    async getSingleUser(userEmail: string) {
        const user = await this.findUser(userEmail);
        return user;
    }
    private async findUser(email: string): Promise<User> {
        let user;
        try{
        user = await this.userModel.findOne({email:email});
        }
        catch(error)
        {
            throw new NotFoundException('Could not find user.');
        }
        if (!user) {
          throw new NotFoundException('Could not find user.');
        }
        return {name: user.name, lastname: user.lastname, email: user.email, boss: user.boss, password: user.password};
      }
    async login(email: string, password: string): Promise<{success:boolean,token?:string}>{
        let user;
        user = await this.userModel.findOne({email:email, password:password});
        if(user)
        {
            return {success:true, token:jwt.sign({name:user.name,lastname:user.lastname, boss: user.boss}, 'shhhh')};
        }
        return {success:false};
    }
}