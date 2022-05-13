import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { moveMessagePortToContext } from 'worker_threads';
import { MakeService } from './make.service';
import { time } from 'console';

@Controller('make')
export class MakeController {
    constructor(private readonly makeService: MakeService){}

    @Post()
    async request(
        @Body('time') time: number,
        @Body('name') name: string,
        @Body('lastname') lastname: string,
        @Body('boss') boss: boolean,
    ): Promise<any> {
        let id = await this.makeService.insertRequestToDb(time ,name, lastname,boss);
        return await this.makeService.insertRequestToQueue(time, boss, id);
    }
    @Get()
    async getAllRequests() {
        const requests = await this.makeService.getRequests();
        return requests;
    }
    @Get('histogram')
    async getHistogram()
    {
        const vars = await this.makeService.makeHistogram();
        return vars;
    }
    @Get('table')
    async getTable()
    {
        const vars = await this.makeService.makeTable();
        return vars;
    }

}
