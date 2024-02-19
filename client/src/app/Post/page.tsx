'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {loginUser, lUser} from '@/actions/auth';
import React, { useEffect, useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
  import { Textarea } from "@/components/ui/textarea"
import { get_me } from "@/actions/user";
import { FaCamera } from "react-icons/fa";
import { create, createpost } from "@/actions/Posts";

const schemaForm = z.object({
    address: z.object({
        descricao: z.string().nonempty('Digite uma descricao').max(1024,'Quantidade de caracteres excede o máximo permitido')
    })
}).transform((field) => ({
    address: {
        descricao: field.address.descricao
    }
}));

type FormProps = z.infer<typeof schemaForm>

export default function Post() {
    const [inputValue, setInputValue] = useState('');
    const [imageSrc, setImageSrc] = useState(null);
    const [selectedImage, setSelectedImage] = useState<File>();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (f) => {
        setImageSrc(f.target.result);
        };
        
        reader.readAsDataURL(file);
        if (e.target.files?.length) {
            const file = e.target.files[0];
            setSelectedImage(file);
        }
  };


    const [errorMessage, setErrorMessage] = useState("");

    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(schemaForm),
        defaultValues: {
            address: {
                descricao: ''
            }
        }
    })

    const [userData,setUserData]= useState<getUser>()
    const [loading, setLoading] = useState(true);

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

    },[])

    const handleInputChange = (event) => {
        
    };

    async function post(post: createpost, image:FormData) {
        try {
            const response = await create(post,image);
        }
        catch (error) {
            console.error(error.message);
            if(error.message === "Error: The image should be either jpeg, png, or jpg."){
                setErrorMessage("A imagem deve ser do formato jpeg, png ou jpg");
            }
        }
    }

    const handleFormSubmit = (data: FormProps) => {
        const image = new FormData();
        
        if(selectedImage){
            image.append("postimage",selectedImage);
        }

        const poste = data.address;
        post({
            descricao: poste.descricao
        },
        image
        )
        
    }

    if (loading ) {
        return <p>Carregando...</p>; // Componente de carregamento a ser adicionado depois
    }
      
    if(loading==false){
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center'>
            <div className=' items-center justify-center '>
                <div ></div>
                <Card className="w-[1000px] h-[600px]">
                    <CardHeader>
                        <CardTitle style={{ color: '#ff0033' }}><b>Crie seu post</b></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="grid w-full items-center gap-4">
                            <div className="flex w-full">

                                <div className="w-1/2 flex justify-center">
                                <div className="grid grid-cols-1 items-center flex justify-center">
                                    <br/><br/>
                                    <div className="items-center flex justify-center" style={{ width: '400px', height: '200px' }}>
                                    {imageSrc && <img src={imageSrc} alt="Imagem carregada" style={{borderRadius: '10px', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto'}}/>}
                                    </div>
                                    <div className="flex justify-center">
                                    <Label htmlFor="picture" className="text-base border border-customcolor bg-transparent text-customcolor" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF2C46', height: '50px', width: '200px', borderRadius: '10px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#fff' }}>Selecionar Imagem</Label>
                                    <Input required value={inputValue} placeholder="Selecionar Imagem" onChange={(e) => handleImageUpload(e)} className="hidden" id="picture" type="file" accept="image/*" />
                                    </div>
                                    <div>
                                    {errorMessage && <p className="text-xs" style={{ color: '#ff0033' }}>{errorMessage}</p>}
                                    </div>
                                </div>
                                </div>
                                

                                <div className="w-1/2 space-y-8">
                                    <div className="flex w-full space-x-9">
                                        <div  style={{ position: 'relative', width: '80px', height: '80px', marginTop: '15px' }}>
                                        <Avatar style={{ position: 'relative', width: '80px', height: '80px' }}>
                                        {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                            <AvatarFallback style={{ backgroundColor: '#FF2C46' }}></AvatarFallback>
                                        </Avatar>
                                        {userData?.profile_picture
                                        ?
                                        <Avatar style={{ position:'absolute', width: '80px', height: '80px', top: 0 }}>
                                            <AvatarImage width={35} height={35} src={`data:image;base64,${userData.profile_picture}`} />
                                        </Avatar>
                                        :
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' , zIndex: 1}}>
                                            <FaCamera size={35} color='#FFFF' />
                                        </div>
                                        }
                                        </div>
                                            
                                        <div  className="flex w-full space-y-9 items-center text-base">
                                        <Label className="text-base" style={{ color: '#FF2C46'}} >@{userData?.username}</Label>
                                        </div>           
                                    </div>

                                {/* DESCRIÇÃO */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="descricao"><b>Descrição</b></Label>
                                        {/* <Input className="h-[200px]" id="descricao" type="text" placeholder="Escreva uma legenda" /> */}
                                         <Textarea {...register('address.descricao')} className="h-[200px]" id="descricao" type="text" placeholder="Escreva uma legenda" /> 
                                    </div>

                                    {/* BOTÕES */}
                                    <div className="flex justify-end space-x-1.5">
                                        <Link href='/Dashboard'>
                                            <Button className="border border-customcolor bg-transparent text-customcolor">Cancelar</Button>
                                        </Link>

                                        <Button disabled={!inputValue.trim()} type="submit" style={{ backgroundColor: '#FF2C46' }}>Compartilhar</Button>
                                        
                                    </div>
                                    <div className="flex justify-end">
                                        {errors.address?.descricao?.message && (
                                        <p className="text-xs" style={{ color: '#ff0033' }}> {errors.address?.descricao?.message} </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
  }
}