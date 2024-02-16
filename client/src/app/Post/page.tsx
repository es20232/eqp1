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
import React, { useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
  import { Textarea } from "@/components/ui/textarea"

const schemaForm = z.object({
    address: z.object({
        username: z.string().nonempty('Digite um nome de usuário'),
        password: z.string().nonempty('Digite uma senha').min(6, 'Quantidade de caracteres inválida')
    })
}).transform((field) => ({
    address: {
        username: field.address.username,
        password: field.address.password
    }
}));

type FormProps = z.infer<typeof schemaForm>

export default function Login() {

    const [imageSrc, setImageSrc] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
    
    reader.readAsDataURL(file);
  };


    const [errorMessage, setErrorMessage] = useState("");

    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(schemaForm),
        defaultValues: {
            address: {
                username: '',
                password: ''
            }
        }
    })

    async function login(user: lUser) {
        try {
            const response = await loginUser(user);
        }
        catch (error) {
            console.error(error.message);
            if(error.message === "Error: Credentials incorrect"){
                setErrorMessage("Credenciais incorretas");
            }
        }
    }

    const handleFormSubmit = (data: FormProps) => {
        const user = data.address;

        login ({
            username: user.username,
            password: user.password
        });
    }

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center'>
            <div className=' items-center justify-center '>
                <div ></div>
                <Card className="w-[1000px] h-[600px]">
                    <CardHeader>
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
                                    <Input placeholder="Selecionar Imagem" onChange={handleImageUpload} className="hidden" id="picture" type="file" accept="image/*" />
                                    </div>
                                </div>
                                </div>
                                

                                <div className="w-1/2 space-y-8">
                                    <div className="flex w-full space-x-9">
                                        <div>
                                        <Avatar style={{ width: '80px', height: '80px' }}>
                                        {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                            <AvatarFallback style={{ backgroundColor: '#FF2C46' }}></AvatarFallback>
                                        </Avatar>
                                        </div>
                                            
                                        <div  className="flex w-full space-y-9 items-center text-base">
                                        <Label className="text-base" style={{ color: '#FF2C46'}}>@username</Label>
                                        </div>           
                                    </div>

                                {/* DESCRIÇÃO */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="descricao"><b>Descrição</b></Label>
                                        <Textarea className="h-[200px]" id="descricao" type="text" placeholder="Escreva uma legenda" />
                                    </div>

                                    {/* BOTÕES */}
                                    <div className="flex justify-end space-x-1.5">
                                        <Link href='/Dashboard'>
                                            <Button className="border border-customcolor bg-transparent text-customcolor">Cancelar</Button>
                                        </Link>

                                        <Button type="submit" style={{ backgroundColor: '#FF2C46' }}>Compartilhar</Button>
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