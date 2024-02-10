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

const newPasswordFormSchema = z.object({
  password: z.string().nonempty('O campo é obrigatório').min(6 ,'A senha deve ter no mínimo 6 caracteres'),
  confirmpassword: z.string().nonempty('O campo é obrigatório')
}).refine(data => data.password === data.confirmpassword, {
  message: "As senhas não coincidem",
  path: ["confirmpassword"]
})

export default function NewPassword() {
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
  function getPasswords(data: any) {
      console.log(data)
      setOutput(JSON.stringify(data, null, 2))
  }

  
  return (
    <div style={{alignItems:'center', height:'100vh'}} className="w-full h-full flex justify-center">
    <div className='w-full min-h-screen flex flex-col items-center justify-center' style={{ backgroundColor: '#FFFF' }}>
      <div className=' items-center justify-center'>
        <h1 className="text-4xl" style={{ color: '#FF2C46', fontFamily: 'Linux Libertine G' }}>NANOGRAM</h1>
      </div>
      <br/><br/>
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


                  <Label htmlFor="password">Nova senha</Label>
                  <Input {...register('password')}
                   placeholder="Nova senha"
                  />
                  {errors.password && (<span className="text-xs" style={{ color: '#ff0033' }}>{errors.password.message}</span>)}
                </div>
                <div className="flex flex-col space-y-1.5">


                  <Label htmlFor="confirmassword">Confirmar nova senha</Label>
                  <Input {...register('confirmpassword')}
                   placeholder="Digite novamente a senha"
                  />
                  {errors.confirmpassword && (<span className="text-xs" style={{ color: '#ff0033' }}>{errors.confirmpassword.message}</span>)}
                </div>


            <div className="flex flex-col space-y-1.5">
            </div>
          </div>
        </form>
        <pre>{output}</pre>
      </CardContent>
      <CardFooter className="flex justify-end space-x-1.5">
      <Link href='/Login'>
      <Button className="border border-customcolor bg-transparent text-customcolor">Cancelar</Button>
      </Link>
      <Link href='/Login'>
      <Button style={{ backgroundColor: '#FF2C46' }}>Salvar</Button>
      </Link>
      </CardFooter>
    </Card>
    </div>
    </div>
  )
}