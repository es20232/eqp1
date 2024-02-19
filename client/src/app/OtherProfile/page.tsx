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
import { getUser, get_me } from "@/actions/user";
import { deletepost, getposts, getuserposts, update, updatepost } from "@/actions/Posts";
import { postcss } from "tailwindcss";
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

const schemaForm = z.object({
    address: z.object({
        desc: z.string()
    })
}).transform((field) => ({
    address: {
        desc: field.address.desc    
    }
}));

type FormProps = z.infer<typeof schemaForm>

export default function UserProfile() {

    const [userData,setUserData]= useState<getUser>()
    const [loading, setLoading] = useState(true)
    const [id,setId] = useState<number>()
    const [errorMessage, setErrorMessage] = useState("")
    const [userPost,setUserPost] = useState<getuserposts[]>([])
    const [descricao, setDescricao] = useState('');

    const { handleSubmit, setValue, register, formState: { errors } } = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(schemaForm),
        defaultValues: {
            address: {
                desc:''
            }
        }
    })

    useEffect(()=>{
        const get=async () => {
        try{
            const response=await get_me();
            setUserData(response) 
            setLoading(false)
        }catch(error){
            console.log(error);
        }
        }
        get()

        const getpost=async () => {
            try{
                const response=await getposts();
                setUserPost(response)
                setLoading(false)
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

    async function deletePostApiCall(id: deletepost) {
        try {
            const response = await deletepost(id);
            await refreshPosts();
        }
        catch (error) {
            console.error(error.message);
            if(error.message === "Error: Credentials incorrect"){
                setErrorMessage("Credenciais incorretas");
            }
        }
    }

    const handleDeletePost = async (id: number) => {
        setLoading(true);
        try {
            await deletePostApiCall({postid: id});
            // Atualize userPost após a exclusão bem-sucedida (se necessário)
        } catch (error) {
            console.error(error);
            // Lidar com erros, se necessário
        }
        setLoading(false);
    };
    

    
    async function editDescription(postToUpdate: updatepost) {
        try {
            const response = await update(postToUpdate);
            await refreshPosts();
        }
        catch (error) {
            console.error(error.message);
            if(error.message === "Error: Credentials incorrect"){
                setErrorMessage("Credenciais incorretas");
            }
        }
    }

    const handleEditPost = async (id: number, desc: string) => {
        console.log(id, desc);
        setLoading(true);
        try {
            await editDescription(
                {postid: id,
                descricao:desc}
                );
            // Atualize userPost após a exclusão bem-sucedida (se necessário)
        } catch (error) {
            console.error(error);
            // Lidar com erros, se necessário
        }
        setLoading(false);
    };

    {/*
    const handleFormSubmit = (data: FormProps) => {
        const postToEdit = data.address;
        setId(postToEdit.id);

        editDescription({
            postid: id,
            descricao : postToEdit.desc
        });

    }
    */}
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
                {userData?.profile_picture
                  ?
                  <Avatar style={{ width: '80px', height: '80px', position: 'absolute', top: 0 }}>
                    <AvatarImage width={35} height={35} src={`data:image;base64,${userData.profile_picture}`} />
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
                    marginRight: '640px'
                    }}>
                     <Label className="text-base" style={{ color: '#FF2C46'}}>@{userData?.username}</Label>
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