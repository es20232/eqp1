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

    const handleImageUpload = (event) => {
        setInputValue(event.target.value);
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
                descricao: ''
            }
        }
    })

    

    const handleInputChange = (event) => {
        
    };

    async function post(user: lUser) {
        
    }

    const handleFormSubmit = (data: FormProps) => {
        
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
                                    <Input required value={inputValue} placeholder="Selecionar Imagem" onChange={handleImageUpload} className="hidden" id="picture" type="file" accept="image/*" />
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