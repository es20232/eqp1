'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import React, { useState } from 'react';
import { Email, requestPassword } from "@/actions/auth"
import { useRouter } from 'next/navigation';

const findUserFormSchema = z.object({
    email: z.string().nonempty('O email é obrigatório').email('Formato de email inválido')
})

export default function ResetPassword() {

    const [errorMessage, setErrorMessage] = useState("");

    const [output, setOutput] = useState('')
    const { register,
        handleSubmit,
        formState: { errors } }
        = useForm({
            resolver: zodResolver(findUserFormSchema)
        })
    
    async function request(email: Email) {
        try {
            const responde = await requestPassword(email);
        } catch (error) {
            // Email not registered
            // Error in code generation
            // Unexpected error
            console.log(error.message);
            if(error.message === "Error: Email not registered"){
                setErrorMessage("Email não cadastrado");
            } else if(error.message.toString() === "Error: Error in code generation") {
                setErrorMessage("Não foi possível gerar um código");
            }else if(error.message.toString() === "Error: Unexpected error") {
                setErrorMessage("Erro inesperado");
            }    
        }
    }

    //Requisição
    function getUser(data: any) {
        console.log(data)
        request(data);
    }


    const router = useRouter();

    function handleKeyPress(event) {
        // 13 é o código da tecla Enter
        if (event.keyCode === 13) {
            event.preventDefault(); // Impede o comportamento padrão do Enter
            handleSubmit(getUser)(); // Submete o formulário manualmente
        }
    }

    return (
        <div style={{ alignItems: 'center', height: '100vh' }} className="w-full h-full flex justify-center">
            <div className='w-full min-h-screen flex flex-col items-center justify-center' style={{ backgroundColor: '#FFFF' }}>
                <div className=' items-center justify-center'>
                    <h1 className="text-4xl" style={{ color: '#FF2C46', fontFamily: 'Linux Libertine G' }}>NANOGRAM</h1>
                </div>
                <br /><br />
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Redefinir senha</CardTitle>
                        <CardDescription>Enviaremos um email com um código de confirmação.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit(getUser)}>
                            <div className="grid w-full items-center gap-4">
                            
                            {errorMessage && <p className="text-xs" style={{ color: '#ff0033' }}>{errorMessage}</p>}
                            
                                <div className="flex flex-col space-y-1.5">
                                  
                                    <Label htmlFor="Email">Email</Label>
                                    <Input

                                        placeholder="seunome@email.com"
                                        {...register('email')}
                                        onKeyDown={handleKeyPress} // Adiciona o evento para detectar a tecla Enter
                                    />
                                    {errors.email && (<span className="text-xs" style={{ color: '#ff0033' }}>{errors.email.message}</span>)}
                                </div>
                                <div className="flex justify-end space-x-1.5">
                                <Link href='/Login'>
                                    <Button className="border border-customcolor bg-transparent text-customcolor">Voltar</Button>
                                </Link>
                                    <Button type='submit' style={{ backgroundColor: '#FF2C46' }}>Avançar</Button> 
                                </div>
                            </div>
                        </form>
                        
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-1.5">
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
