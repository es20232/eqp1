"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from 'axios';

export interface updtUser {
    full_name?: string;
    username?: string;
    email?: string;
    password?: string;
  }
  export interface picture{
    // profile_picture?: File;
    profile_picture?: File | undefined;
  }
//   export async function edit_profile(user:updtUser,image: picture){
    export async function edit_profile(user:updtUser, image: any){
    const token=cookies().get('token-user');
    const response=await axios.patch
    ('http://localhost:3001/users/edit-profile'
    ,{user,image},
    {
        
        headers: {
            "Authorization":"Bearer "+ token,
            'Content-type': 'multipart/form-data'} 
        
    }
    ).then(response=>{
      return response.data
    }).catch(error =>{
        if (error.response) {
            if (error.response.status == 400) {
                throw error.response.data.message;
            } else {
                throw 'Unexpected error';
            }
        }

    })

    return redirect('/Profile');
    }

    export async function get_me(){
        const token=cookies().get('token-user');
        const response=await axios.get
        ('http://localhost:3001/users/profile',
        {
            
            headers: {
                "Authorization":"Bearer "+ token,
                'Content-type': 'application/json; charset=UTF-8'} 
            
        }
        ).then(response=>{
          return response.data
        }).catch(error =>{
            if (error.response) {
                if (error.response.status == 404) {
                    throw error.response.data.message;
                } else {
                    throw error;
                }
            }
    
        })
        return response.data;
    
        }     
        