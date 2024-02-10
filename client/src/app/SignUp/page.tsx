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
import { createUser, cUser } from '@/actions/auth';

const schemaForm = z.object({
    address: z.object({
        name: z.string().nonempty('Digite seu nome completo'),
        username: z.string().nonempty('Digite um nome de usuário'),
        email: z.string().nonempty('Digite um email').email('Formato de email inválido'),
        password: z.string().nonempty('Digite uma senha').min(6, 'Quantidade de caracteres inválida'),
        confirm_password: z.string().nonempty('Digite a confirmação da senha')
    })
}).transform((field) => ({
    address: {
        name: field.address.name,
        username: field.address.username,
        email: field.address.email,
        password: field.address.password,
        confirm_password: field.address.confirm_password
    }
})).refine(({ address }) => address.password === address.confirm_password, {
    message: "As senhas não são iguais",
    path: ["address", "confirm_password"]
});


type FormProps = z.infer<typeof schemaForm>

export default function SignUp() {

    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(schemaForm),
        defaultValues: {
            address: {
                name: '',
                username: '',
                email: '',
                password: '',
                confirm_password: ''
            }
        }
    })
    
    async function create(user: cUser) {
        
        try {
            const response = await createUser(user);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const handleFormSubmit = (data: FormProps) => {
        const user = data.address;

        create({
            full_name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
        })

    }

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center' style={{ backgroundColor: '#FF2C46' }}>
            <div className=' items-center justify-center'>
                <h1 className="text-4xl" style={{ color: '#FFFF', fontFamily: 'Linux Libertine G' }}>NANOGRAM</h1>
            </div>
            <br /><br />
            <div className=' items-center justify-center '>
                <Card className="w-[350px]">

                    <CardHeader>
                        <CardTitle><b>Cadastro</b></CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="grid w-full items-center gap-4">

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Nome Completo</Label>
                                    <Input {...register('address.name')} type="text" id="name" placeholder="Nome completo" />
                                    {errors.address?.name?.message && (
                                        <p className="text-xs" style={{ color: '#ff0033' }}> {errors.address?.name?.message} </p>
                                    )}
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="username">Nome de usuário</Label>
                                    <Input {...register('address.username')} type="text" id="username" placeholder="@username" />
                                    {errors.address?.username?.message && (
                                        <p className="text-xs" style={{ color: '#ff0033' }}> {errors.address?.username?.message} </p>
                                    )}
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input {...register('address.email')} type="text" id="email" placeholder="email" />
                                    {errors.address?.email?.message && (
                                        <p className="text-xs" style={{ color: '#ff0033' }}> {errors.address?.email?.message} </p>
                                    )}
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input {...register('address.password')} type="password" id="password" placeholder="********" />
                                    {errors.address?.password?.message && (
                                        <p className="text-xs" style={{ color: '#ff0033' }}> {errors.address?.password?.message} </p>
                                    )}
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="confirm_password">Confirmar senha</Label>
                                    <Input {...register('address.confirm_password')} type="password" id="confirm_password" placeholder="********" />
                                    {errors.address?.confirm_password?.message && (
                                        <p className="text-xs" style={{ color: '#ff0033' }}> {errors.address?.confirm_password?.message} </p>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-1.5">
                                    <Link href='/Login'>
                                        <Button className="border border-customcolor bg-transparent text-customcolor">Cancelar</Button>
                                    </Link>
                                    <Button type="submit" style={{ backgroundColor: '#FF2C46' }}>Cadastrar</Button>
                                </div>

                            </div>
                        </form>
                    </CardContent>

                </Card>
            </div>
        </div>
    )
}

