import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable} from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { Make } from "./make.model";
import { InjectQueue, Processor, Process } from '@nestjs/bull';
import { Queue } from "bull";
import { Job } from 'bull';
@Injectable()
export class MakeService {
    constructor(@InjectModel('Make') private readonly makeModel: Model<Make>,@InjectQueue('coffeeRequest') private coffeeQueue: Queue ){
        this.getUndone();

    }

    async insertRequestToDb(time: number, name: string, lastname: string, boss:boolean)
    {
        let dateTime = new Date();
        const newRequest = new this.makeModel({time: time, name: name, lastname: lastname, dateTime, boss: boss});
        const result = await newRequest.save();
        return result.id;
    }
    async getRequests() {  
        const requests = await this.makeModel.find().exec();
        return requests as Make[];
    }
    async insertRequestToQueue(time: number, boss: boolean, id:string) : Promise<number>
    {
        if(!time)
        {
            time = 0;
        }
        if(boss)
        {
            await this.coffeeQueue.add(
                {
                   id
                },
                { delay: time*60000, priority: 1 },
                  );
        } 
            else
            {
                await this.coffeeQueue.add(
                    {
                       id
                    },
                    { delay: time*60000, priority: 420 },
                      );

            }
            return this.coffeeQueue.count();
    }
    async makeHistogram()
    {
        let names: string[];
        let count: number[];
        count = [];
        names = [];
        const requests = await this.makeModel.find().exec();
        for(let i=0; i< requests.length; i++)
        {
            let name = requests[i].name;
            let lastname = requests[i].lastname;
            count.push(0);
            names.push(name+" "+lastname)
            for (let j = 0; j< requests.length; j++)
            {
                if(requests[j].name===name && requests[j].lastname===lastname)
                {
                    requests.splice(j,1)
                    count[i]++;
                    j--;
                }
            }
        }
        return {names,count};
    }
    async makeTable()
    {
        let timeNow = new Date().getTime();
        let names: string[];
        let dates: string[];
        names = [];
        dates = [];
        const requests = await this.makeModel.find().exec();
        for (let i=0; i< requests.length; i++)
        {
            let time = timeNow - new Date(requests[i].dateTime).getTime();
            if(time > 2629800000)  //Number of milliseconds in a month
            {
                requests.splice(i,1);
                i--;
            }
        }
        for (let i=0; i< requests.length; i++)
        {
            let name = requests[i].name;
            let lastname = requests[i].lastname;
            names.push(name+" "+lastname);
            dates.push(requests[i].dateTime);
        }
        console.log({names,dates});
        return {names, dates};
        


    }
    async getUndone()
    {
        let check= await this.makeModel.find({done:false}).exec();
        for( let request of check)
        {
            let newTime = new Date(request.dateTime).getTime();
            newTime = Math.max(newTime +request.time*60000 - new Date().getTime(),0);
            this.insertRequestToQueue(newTime,request.boss,request.id);
        }
    }
}

@Processor('coffeeRequest')
export class CoffeeConsumer {
    constructor(@InjectModel('Make') private readonly makeModel: Model<Make>){}
    @Process()
    async transcode(job: Job<any>) {
        console.log(job.data.id);
        await new Promise(r => setTimeout(r, 60000));
        this.makeModel.updateOne({id:job.data.id},{done:true});
     

      return {};
    }
  }

