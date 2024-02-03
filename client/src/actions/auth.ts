"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from 'axios';


export interface cUser {
    full_name: string,
    username: string,
    email: string,
    password: string
}

export interface lUser {
    username: string,
    password: string
}

export async function createUser(user: cUser) {
    const response = await axios.post
        (
            'http://localhost:3001/auth/signup/',
            user,
            {
                headers:
                    { 'Content-type': 'application/json; charset=UTF-8' }
            },
        )
        .then(response => {
            cookies().set('token-user', response.data.acess_token);
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status == 403) {
                    throw error.response.data.message;
                } else {
                    throw 'Unexpected error';
                }
            }
        })
    return redirect('/Dashboard');
}

export async function loginUser(user: lUser) {
    const response = await axios.post
        (
            'http://localhost:3001/auth/signin/',
            user,
            {
                headers:
                    { 'Content-type': 'application/json; charset=UTF-8' }
            },
        )
        .then(response => {
            cookies().set('token-user', response.data.acess_token);
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status == 403) {
                    throw error.response.data.message;
                } else {
                    throw 'Unexpected error';
                }
            }
        })
    return redirect('/Dashboard');
}