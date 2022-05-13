import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { User } from './users.model';
import { Module } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { moveMessagePortToContext } from 'worker_threads';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    addUser(
        @Body('name') userName: string,
        @Body('lastname') userLastname: string,
        @Body('email') userEmail: string,
        @Body('boss') userBoss,
        @Body('password') userPassword: string,
    ): any {
        return this.usersService.insertUser(
            userName,
            userLastname,
            userEmail,
            !(userBoss?.toLowerCase()=='false'),
            userPassword
        );

    }
    @Post('login')
    login(
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
    ) : any 
    {
        return this.usersService.login(userEmail,userPassword);
    }
    @Get()
    async getAllUsers() {
        const users = await this.usersService.getUsers();
        return users;
    }
    @Get(':email')
    getUser(@Param('email') userEmail: string)
    {
        return this.usersService.getSingleUser(userEmail);
    }


}
