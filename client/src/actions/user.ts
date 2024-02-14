"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios, { Axios } from 'axios';

export interface updtUser {
    full_name?: string;
    username?: string;
    email?: string;
    password?: string;
  }
  export interface picture{
    // profile_picture?: File;
    profile_picture?: File ;
  }

//   export async function edit_profile(user:updtUser,image: picture){
    
        export async function edit_profile(user: updtUser, image:FormData) {
            const token=cookies().get('token-user');
            const { full_name, username, email, password } = user;
          
        //    const data = {
        //     ...{ full_name, username, email, password },
        //     ...{ teste }
        // };
            const formData = new FormData();
            formData.append('profile_picture', image.get('profile_picture') as File);

            await axios.patch
                (
                    'http://localhost:3001/users/edit-profile/',
                    formData,   
                    {
                        headers:
                            { 'Content-type': 'multipart/form-data',
                               'Authorization' : `Bearer ${token?.value}`,
                        }
                    },
                )
                .then(response => {
                    console.log(response.data);
                    
                    return response.data;
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status == 400) {
                            throw error.response.data.message;
                        }else if(error.response.status==401){
                            throw error.response.data.message;
                        } else {
                            throw error;
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
                "Authorization":`Bearer ${token?.value}`,
                'Content-type': 'application/json; charset=UTF-8'} 
            
        },
        ).then(response=>{
          return response.data
        }).catch(error =>{
            if (error.response) {
                if (error.response.status == 400) {
                    throw error.response.data.message;
                }else if(error.response.status==401){
                    throw error.response.data.message;
                }
                 
                else {
                    throw error;
                }
            }
    
        })
        return response.data;
    
        }     
        