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
import { Code, verifyCode } from "@/actions/auth"
import { useRouter } from 'next/navigation';

const getCodeFormSchema = z.object({
  code: z.string().refine(
    value => {
      // Verifica se o valor é uma string
      if (typeof value !== 'string') {
        return false;
      }
  
      // Remove espaços em branco e verifica se o comprimento é 6
      const trimmedValue = value.trim();
      return trimmedValue.length === 6 && !isNaN(Number(trimmedValue));
    },
    {
      message: 'O código deve ser um número com exatamente 6 dígitos.'
    }
  )
})

export default function GetCode() {

  const [errorMessage, setErrorMessage] = useState("");

  const [output, setOutput] = useState('')
  const { register, 
    handleSubmit, 
    formState: { errors } } 
    = useForm({
    resolver: zodResolver(getCodeFormSchema)
  })

  async function verify(code: Code) {
    try {
        const responde = await verifyCode(code);
    } catch (error) {
        // There is no request
        // Old code
        // Invalid code
        // Unauthorized
        // Unexpected error
        console.log(error.message);
        if(error.message === "Error: There is no request"){
          setErrorMessage("Não existe requisição");
        } else if(error.message.toString() === "Error: Old code") {
          setErrorMessage("Código expirado");
        }else if(error.message.toString() === "Error: Invalid code") {
          setErrorMessage("Código inválido");
        }else if(error.message.toString() === "Error: Unauthorized") {
          setErrorMessage("Navegador não autorizado");
        }else if(error.message.toString() === "Error: Unexpected error") {
          setErrorMessage("Erro inesperado");
        }     
    }
}
  //Requisição
  function getCode(data: any) {
      console.log(data)
      verify(data)
  }

  const router = useRouter();

  function handleKeyPress(event) {
      // 13 é o código da tecla Enter
      if (event.keyCode === 13) {
          event.preventDefault(); // Impede o comportamento padrão do Enter
          handleSubmit(getCode)(); // Submete o formulário manualmente
      }
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
        <CardTitle>Código</CardTitle>
        <CardDescription>Digite o código de confirmação.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
        onSubmit={handleSubmit(getCode)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              
            {errorMessage && <p className="text-xs" style={{ color: '#ff0033' }}>{errorMessage}</p>}

              <Input id="Code" placeholder="Ex:123456" 
              {...register('code')}
              onKeyDown={handleKeyPress}
              />
              {errors.code && (<span className="text-xs" style={{ color: '#ff0033' }}>{errors.code.message}</span>)}
            </div>
            <div className="flex justify-end space-x-1.5">
            <Link href='/ResetPassword'>
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