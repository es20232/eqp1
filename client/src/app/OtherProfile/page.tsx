'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
import { FaCamera } from "react-icons/fa";
import { getOtherUser, getUser, getUserPosts, get_me } from "@/actions/user";
import { deletepost, getposts, getuserposts, update, updatepost } from "@/actions/Posts";
import { postcss } from "tailwindcss";
import { useSearchParams } from 'next/navigation'



export default function UserProfile() {

    const [userData,setUserData]= useState<getUser>()
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [userPost,setUserPost] = useState<getuserposts[]>([])
    const [userOther,setUserOther] = useState<getUser>()

    const searchParams = useSearchParams()
    const userId = searchParams.get('id')

    useEffect(()=>{
        const get=async () => {
        try{
            if(userId){
                const response=await getOtherUser(userId);
                setUserOther(response) 
                setLoading(false)
            }
        }catch(error){
            console.log(error);
        }
        }
        get()

        const getpost=async () => {
            try{
                if(userId){
                    const response=await getUserPosts(userId);
                    setUserPost(response)
                    setLoading(false)
                }
            }catch(error){
                console.log(error);
            }
        }
        getpost()

    },[])

    const refreshPosts = async () => {
        try {
            const userPostsResponse = await getposts();
            setUserPost(userPostsResponse);
        } catch (error) {
            console.log(error);
        }
    };


    if (loading ) {
        return <p>Carregando...</p>; // Componente de carregamento a ser adicionado depois
      }
      
    if(loading==false){
    return (
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
            }}>
                <div className="item-center"
                style={{
                    position: 'relative'
                }}>
                <Link href="/Profile">
                <Avatar
                style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    borderRadius:'50%',
                    marginRight: '20px'
                    }}>
                    <AvatarFallback style={{ backgroundColor: '#FF2C46' }}></AvatarFallback>
                </Avatar>
                {userOther?.profile_picture
                  ?
                  <Avatar style={{ width: '80px', height: '80px', position: 'absolute', top: 0 }}>
                    <AvatarImage width={35} height={35} src={`data:image;base64,${userOther?.profile_picture}`} />
                  </Avatar>
                  :
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' , zIndex: 1}}>
                    <FaCamera size={35} color='#FFFF' />
                  </div>
                }
                </Link>
                </div>
                                            
                <div
                style={{
                    marginRight: '545px'
                    }}>
                     <Label className="text-base" style={{ color: '#FF2C46'}}>@{userOther?.username}</Label>
                </div>

                <div
                style={{
                    marginRight: '10px'
                    }}>
                    <Link href='/Users'>
                        <Button className="border border-customcolor bg-transparent text-customcolor"> Usuários </Button>
                    </Link>
                </div>

                <div className="flex flex-col justify-end">
                <Link href='/Dashboard'>
                    <Button>Dashboard</Button>
                </Link>
                
                </div>
            </div>



            <div
            style={{
                width: '97.2%',
                height:'1px',
                backgroundColor:'#000',
                margin:'20px 0'
            }}></div>
            
            {userPost.length > 0 ? (
            userPost.map((post,key) => {
                
                return(
                    
                    <div className="post-container"
                    style={{
                        display: 'inline-block',
                        width: '31%',
                        height: 'auto',
                        marginRight: '20px',
                        marginBottom: '20px',
                        verticalAlign: 'top',
                        textAlign:'center',
                        backgroundColor:'#FF46'
                    }}
                    key = {key}>
                        <img style={{
                            width: '100%',
                            height: '160px',
                            margin:'0 auto'
                        }} src={`data:image;base64,${post.post_image}`}>
                        </img>
                        <div>
                            <Input
                            id="descricao"
                            defaultValue={post.descricao}
                            style={{ outline: '0', boxShadow: 'none' }}
                            placeholder="descricao" readOnly/>
                        </div>
                    </div>
                )
            })
        ) : (
            <p>Sem posts para exibir.</p>
        )
        }

        </div>
    )
    }
}