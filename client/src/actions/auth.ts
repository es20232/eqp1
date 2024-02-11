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

export interface Code {
    code: string
}

export interface Email {
    email: string
}

export interface Password {
    password : string
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

export async function requestPassword(email: Email) {
    const response = await axios.post
        (
            'http://localhost:3001/auth/reset-password/request',
            email,
            {
                headers:
                    { 'Content-type': 'application/json; charset=UTF-8' }
            },
        )
        .then(response => {
            cookies().set('token-request', response.data.acess_token);
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
    return redirect('/GetCode');
}

export async function verifyCode(code: Code) {

    const token = cookies().get('token-request')?.value;

    const response = await axios.post
        (
            'http://localhost:3001/auth/reset-password/verify',
            code,
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json; charset=UTF-8',
                }
            },
        )
        .then(response => {
            cookies().set('token-verify', response.data.acess_token);
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status == 403 ||
                    error.response.status == 401) {
                    throw error.response.data.message;
                } else {
                    throw 'Unexpected error';
                }
            }
        })
    return redirect('/NewPassword');
}

export async function updatePassword(password: Password) {
    const token = cookies().get('token-verify')?.value;

    const response = await axios.post
        (
            'http://localhost:3001/auth/reset-password/update',
            password,
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json; charset=UTF-8',
                }
            },
        )
        .then(response => { })
        .catch(error => {
            if (error.response) {
                if (error.response.status == 403 ||
                    error.response.status == 401) {
                    throw error.response.data.message;
                } else {
                    throw 'Unexpected error';
                }
            }
        })
    return redirect('/Login');
}