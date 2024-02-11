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
import { Password, updatePassword } from "@/actions/auth"

const newPasswordFormSchema = z.object({
    password: z.string().nonempty('O campo é obrigatório').min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmpassword: z.string().nonempty('O campo é obrigatório')
}).refine(data => data.password === data.confirmpassword, {
    message: "As senhas não coincidem",
    path: ["confirmpassword"]
})

export default function NewPassword() {

    const [errorMessage, setErrorMessage] = useState("");

    const [output, setOutput] = useState('')
    const { register,
        handleSubmit,
        formState: { errors } }
        = useForm({
            criteriaMode: 'all',
            mode: 'all',
            resolver: zodResolver(newPasswordFormSchema)
        })
   
    //Requisição
    // Password not updated
    // Unexpected error
    async function update(password: Password) {
        try {
            const responde = await updatePassword(password);
        } catch (error) {
            // Password not updated
            // Unexpected error
            console.log(error.message)
            if(error.message.toString() === "Error: Password not updated") {
                setErrorMessage("Não foi possível atuaçizar senha");
              }else if(error.message.toString() === "Error: Unexpected error") {
                setErrorMessage("Erro inesperado");
        }
    }
}
    function getPasswords(data: any) {
        console.log(data)
        update(data)
    }

    function handleSubmitOnEnter(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede o comportamento padrão da tecla Enter
            handleSubmit(getPasswords)(); // Submete o formulário manualmente
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
                        <CardTitle>Nova senha</CardTitle>
                        <CardDescription>Digite uma nova senha.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit(getPasswords)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">

                                {errorMessage && <p className="text-xs" style={{ color: '#ff0033' }}>{errorMessage}</p>}

                                    <Label htmlFor="password">Nova senha</Label>
                                    <Input {...register('password')}
                                        id="password" type="password" placeholder="********" 
                                    />
                                    {errors.password && (<span className="text-xs" style={{ color: '#ff0033' }}>{errors.password.message}</span>)}
                                </div>
                                <div className="flex flex-col space-y-1.5">


                                    <Label htmlFor="confirmassword">Confirmar nova senha</Label>
                                    <Input {...register('confirmpassword')}
                                        id="password" type="password" placeholder="********"
                                        onKeyDown={handleSubmitOnEnter} 
                                    />
                                    {errors.confirmpassword && (<span className="text-xs" style={{ color: '#ff0033' }}>{errors.confirmpassword.message}</span>)}
                                </div>


                                <div className="flex justify-end space-x-1.5">
                        <div className="flex justify-end space-x-1.5">
                                <Link href='/Login'>
                                    <Button className="border border-customcolor bg-transparent text-customcolor">Cancelar</Button>
                                </Link>
                                </div>
                        
                            <Button type='submit' style={{ backgroundColor: '#FF2C46' }}>Salvar</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end space-y-1.5">
                        
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
    }