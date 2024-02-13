'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from "react";
import { edit_profile } from '@/actions/user';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  address: z.object({
    name: z.string().nonempty('Digite seu nome completo'),
    username: z.string().nonempty('Digite um nome de usuário'),
    email: z.string().nonempty('Digite um email').email('Formato de email inválido'),
    password: z.string().nonempty('Digite uma senha').min(6, 'Quantidade de caracteres inválida')
  })
});

type FormProps = z.infer<typeof schema>

export default function EditProfile() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      address: {
        name: '',
        username: '',
        email: '',
        password: '',
      }
    }
  });

  const handleUploadFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setSelectedImage(file);
    }
  };

  // const onSubmit = async (data: updtUser, selectedImage: any) => {
  const onSubmit = async (data: any) => {
     try{
      await edit_profile(data, selectedImage);
     }catch(error){
        throw error;
     }
      };

  return (
    <div style={{ alignItems: 'center', height: '100vh' }} className="w-full h-full flex justify-center">
      <div className='w-full min-h-screen flex flex-col items-center justify-center' style={{ backgroundColor: '#FFFF' }}>
        <div className=' items-center justify-center mb-5'>
          <h1 className="text-4xl" style={{ color: '#FF2C46', fontFamily: 'Linux Libertine G' }}>NANOGRAM</h1>
        </div>
        <Card className='w-[350px]'>
          <div className='flex justify-center'>
            <div style={{ position: 'relative', width: '80px', height: '80px', marginTop: '15px' }}>
              <input
                hidden
                accept="image/*"
                type="file"
                style={{ height: 50 }}
                onChange={(e) => handleUploadFile(e)}
                id="avatarInput"
              />
              <label htmlFor="avatarInput" style={{ cursor: 'pointer' }}>
                <Avatar style={{ width: '80px', height: '80px', position: 'relative' }}>
                  <AvatarFallback style={{ backgroundColor: '#FF2C46' }}></AvatarFallback>
                </Avatar>
                {selectedImage
                  ?
                  <Avatar style={{ width: '80px', height: '80px', position: 'absolute', top: 0 }}>
                    <AvatarImage width={35} height={35} src={URL.createObjectURL(selectedImage)} />
                  </Avatar>
                  :
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <FaPencilAlt size={35} color='#FFFF' />
                  </div>
                }
              </label>
            </div>
          </div>
          <CardHeader>
            <CardTitle>Editar Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" placeholder="nome completo" {...register('address.name')} />
                  {errors.address?.name && <p>{errors.address?.name?.message}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Nome do usuário</Label>
                  <Input id="username" placeholder="@username" {...register('address.username')} />
                  {errors.address?.username && <p>{errors.address?.username.message}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="email" {...register('address.email')} />
                  {errors.address?.email && <p>{errors.address?.email.message}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Senha</Label>
                  <Input type="password" id="password" placeholder="********" {...register('address.password')} />
                  {errors.address?.password && <p>{errors.address?.password.message}</p>}
                </div>
              </div>
              <div className="flex justify-end space-x-1.5">
              
              <Button type="submit" style={{ backgroundColor: '#FF2C46' }} >Salvar Alterações</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href='/Profile'>
              <Button className="border border-customcolor bg-transparent text-customcolor hover:bg-red-500 hover:text-white">Cancelar</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}