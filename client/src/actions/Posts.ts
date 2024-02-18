import axios from "axios";
import { cookies } from "next/headers";

export interface createpost {
    descricao: string;
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
             
                    return response.data;
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
            
  }


  