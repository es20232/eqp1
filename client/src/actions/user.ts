"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios, { Axios } from 'axios';

export interface updtUser {
    full_name: string;
    username: string;
    email: string;
    password: string;
  }
  export interface getUser {
    id:number
    full_name: string;
    username: string;
    email: string;
    profile_picture:string;
  }
  export interface picture{
    profile_picture?: File ;
  }
    
    export async function edit_profile(user: updtUser, image:FormData) {
            const token=cookies().get('token-user');    
            const formDados = new FormData();
            formDados.append('full_name',user.full_name );
            formDados.append('username',user.username );
            formDados.append('email',user.email );
            formDados.append('password', user.password);
            formDados.append('Profile_picture', image.get('Profile_picture') as File);
        
            await axios.patch
                (
                    'http://localhost:3001/users/edit-profile/',
                    formDados,   
                    {
                        headers:
                            { 'Content-type': 'multipart/form-data',
                               'Authorization' : `Bearer ${token?.value}`,
                        }
                    },
                )
                .then(response => {
             
                    return response.data;
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response) {
                            if (error.response.status == 400 || error.response.status ==403 || error.response.status==401) {
                                throw error.response.data.message;
                            }
                            else {
                                throw error;
                            }
                        }
                    }
                })
            return redirect('/Profile');
    }

    export async function get_me(): Promise<getUser> {
        try {
          const token = cookies().get('token-user');
          const response = await axios.get(
            'http://localhost:3001/users/profile',
            {
              headers: {
                "Authorization": `Bearer ${token?.value}`,
                'Content-type': 'application/json; charset=UTF-8'
              },
            }
          );
      
         
          return response.data as getUser; 
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              if (error.response.status == 400 || error.response.status == 401) {
                throw error.response.data.message;
              } else {
                throw error;
              }
            }
          }
          throw error;
        }
      }
        
          



    
        