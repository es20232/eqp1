'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import Link from 'next/link';
// import React from 'react';
import { FaCamera } from 'react-icons/fa';

export default function Profile() {
    return (
      <div style={{alignItems:'center', height:'100vh'}} className="w-full h-full flex justify-center">
      <div className='w-full min-h-screen flex flex-col items-center justify-center' style={{ backgroundColor: '#FFFF' }}>
        <div className=' items-center justify-center mb-5'>
          <h1 className="text-4xl" style={{ color: '#FF2C46', fontFamily: 'Linux Libertine G' }}>NANOGRAM</h1>
        </div>
      <Card className='w-[350px]'>
        <div className='flex justify-center'>
          <div style={{ position: 'relative', width: '80px', height: '80px', marginTop: '15px' }}>
            <Avatar style={{ width: '80px', height: '80px', position: 'relative' }}>
              {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
              <AvatarFallback style={{ backgroundColor: '#FF2C46'}}></AvatarFallback>
            </Avatar>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', cursor: 'pointer' }}>
                  <FaCamera size={35} color='#FFFF' />
            </div>
          </div>
        </div>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" placeholder="nome completo" readOnly/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Nome do usuário</Label>
                <Input id="username" placeholder="@username" readOnly/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="email" readOnly/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" placeholder="********" readOnly/>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href='/Dashboard'>
              <Button className="border border-customcolor bg-transparent text-customcolor hover:bg-red-500 hover:text-white">Voltar</Button>
          </Link>
          <Link href='/EditProfile'>
              <Button style={{ backgroundColor: '#FF2C46' }}>Editar perfil</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
    </div>  
    )
}