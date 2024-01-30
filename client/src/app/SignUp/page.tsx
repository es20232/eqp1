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


export default function SignUp () {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center' style={{ backgroundColor: '#FF2C46' }}>
      <div className=' items-center justify-center'>
        <h1 className="text-4xl" style={{ color: '#FFFF', fontFamily: 'Linux Libertine G' }}>NANOGRAM</h1>
      </div>
      <br/><br/>
    <div className=' items-center justify-center '>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle><b>Cadastro</b></CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" placeholder="nome completo" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome de usuário</Label>
              <Input id="name" placeholder="@username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="email" />
            </div>
            <div>
                <Label htmlFor="name">Senha</Label>
                <Input type="password" id="name" placeholder="********" />
            </div>
            <div>
                <Label htmlFor="name">Confirmar senha</Label>
                <Input type="password" id="name" placeholder="********" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-1.5">
            <Link href='/Login'>
                  <Button className="border border-customcolor bg-transparent text-customcolor">Cancelar</Button>
            </Link>
            <Link href='/Login'>
                  <Button style={{ backgroundColor: '#FF2C46' }}>Cadastrar</Button>
            </Link>
      </CardFooter>
    </Card>
    </div>
    </div>
  )
}

