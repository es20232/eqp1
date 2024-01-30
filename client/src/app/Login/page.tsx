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


export default function Login() {
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
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome de usuário</Label>
              <Input type="password" id="name" placeholder="@username" />
            </div>
            <div>
                <Label htmlFor="name">Senha</Label>
                <Input type="password" id="name" placeholder="********" />
            </div>
            <div className="mt-4 text-xs flex justify-end">
                <Link className="underline" href='/ResetPassword'>
                    Esqueci minha senha
                </Link>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-1.5">
            <Link href='/SignUp'>
                  <Button className="border border-customcolor bg-transparent text-customcolor">Cadastre-se</Button>
            </Link>
            <Link href='/Dashboard'>
                  <Button style={{ backgroundColor: '#FF2C46' }}>Login</Button>
            </Link>
      </CardFooter>
    </Card>
    </div>
    </div>
  )
}

