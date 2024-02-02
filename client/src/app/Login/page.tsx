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

  const { handleSubmit, register, formState: { errors }} = useForm<FormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      address:{
        username:'',
        password:''
      }
    }
  })

  const handleFormSubmit = (data: FormProps) => {
    console.log(data);
  }

  return ( 
    <div className='w-full min-h-screen flex flex-col items-center justify-center' style={{ backgroundColor: '#FF2C46' }}>
      <div className=' items-center justify-center'>
        <h1 className="text-4xl" style={{ color: '#FFFF', fontFamily: 'Linux Libertine G' }}>NANOGRAM</h1>
      </div>
      <br/><br/>
    <div className=' items-center justify-center '>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle><b>Login</b></CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit = {handleSubmit(handleFormSubmit)}>

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor = "username">Nome de usuário</Label>
                <Input {... register('address.username')} id="username" type="text" placeholder="@username" />
                {errors.address?.username?.message && (
                  <p className="text-xs" style={{ color: '#ff0033'}}> {errors.address?.username?.message} </p>
                )}

            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor = "password">Senha</Label>
                <Input {... register('address.password')} id="password" type="password" placeholder="********" />
                {errors.address?.password?.message && (
                  <p className="text-xs" style={{ color: '#ff0033'}}> {errors.address?.password?.message} </p>
                )}
            </div>

            <div className="text-xs flex justify-end">
                <Link className="underline" href='/ResetPassword'>
                    Esqueci minha senha
                </Link>
            </div>

            <div className="flex justify-end space-x-1.5">
              <Link href='/SignUp'>
                    <Button className="border border-customcolor bg-transparent text-customcolor">Cadastre-se</Button>
              </Link>
              
                    <Button type="submit" style={{ backgroundColor: '#FF2C46' }}>Login</Button>
             
            </div>
          </div>

        </form>
      </CardContent>
    </Card>
    </div>
    </div>
  )
}