"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserFeed } from "./user";

export interface createpost {
    descricao: string;
  }
export interface updatepost {
    postid?:number;
    descricao: string;
}
export interface feedinfos{
  user:UserFeed[];
  posts:getuserposts[];
};

export interface getuserposts {
    userId:number;
    id:number;
    descricao:string;
    post_image:string;
    publication_date:Date;
}
export interface deletepost {
    postid:number;
}


  export async function create(post: createpost, image:FormData) {
              const token = cookies().get('token-user');
              const formDados = new FormData();
              
              formDados.append('descricao',post.descricao);
              formDados.append('postimage',image.get('postimage') as File);
              
              await axios.post 
                (
                    'http://localhost:3001/posts/create-post/',
                    formDados,   
                    {
                        headers:{ 
                        'Content-type': 'multipart/form-data',
                        'Authorization' : `Bearer ${token?.value}`,
                        }
                    },
                )
                .then(response => {
                    return response.data
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response) {
                            if (error.response.status == 400 || error.response.status==401) {
                                throw error.response.data.message;
                            }
                            else {
                                throw error;
                            }
                        }
                    }
                }
                )
            return redirect('/UserProfile')
}

export async function update(updtpost:updatepost) {
    const token = cookies().get('token-user');
    const postId=updtpost.postid
    delete updtpost.postid
    await axios.put 
      (
         `http://localhost:3001/posts/${postId}`,
          updtpost,   
          {
              headers:{ 
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization' : `Bearer ${token?.value}`,
              }
          },
      )
      .then(response => {
          return response.data
      })
      .catch(error => {
          if (error.response) {
              if (error.response) {
                  if (error.response.status == 400 || error.response.status==401) {
                      throw error.response.data.message;
                  }
                  else {
                      throw error;
                  }
              }
          }
      }
      )
    return redirect('/UserProfile')
}
export async function deletepost(delpost:deletepost) {
    const token = cookies().get('token-user');
    await axios.delete 
      (
         `http://localhost:3001/posts/${delpost.postid}`, 
          {
              headers:{ 
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization' : `Bearer ${token?.value}`,
              }
          },
      )
      .then(response => {
          return response.data
      })
      .catch(error => {
          if (error.response) {
              if (error.response) {
                  if (error.response.status == 400 || error.response.status==401) {
                      throw error.response.data.message;
                  }
                  else {
                      throw error;
                  }
              }
          }
      }
      )
    return redirect('/UserProfile')
}

export async function getposts() {
    try {
      const token = cookies().get('token-user');
      const response = await axios.get(
        'http://localhost:3001/posts/user-posts',
        {
          headers: {
            "Authorization": `Bearer ${token?.value}`,
            'Content-type': 'application/json; charset=UTF-8'
          },
        }
      );
  
     
      return response.data ; 
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

  export async function Feed() :Promise<feedinfos>{
    try {
      const token = cookies().get('token-user');
      const response = await axios.get(
        'http://localhost:3001/posts/feed',
        {
          headers: {
            "Authorization": `Bearer ${token?.value}`,
            'Content-type': 'application/json; charset=UTF-8'
          },
        }
      );
  
     
      return response.data as feedinfos ; 
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



  