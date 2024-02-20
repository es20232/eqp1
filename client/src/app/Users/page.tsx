'use client'

import * as React from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { findAll, UserList } from "@/actions/user"



export default function CardWithForm() {

    const [list, setUserData] = useState<UserList[]>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const get = async () => {
            try {
                const response = await findAll();
                setUserData(response)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }

        get()

    }, [])

    if (loading) {
        return <p>Carregando...</p>; // Componente de carregamento a ser adicionado depois
    }

    if (loading == false && list) {

        return (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
                <Card className="w-full h-full max-w-[550px] mx-auto">
                    <CardHeader>
                        <CardTitle style={{ color: '#ff0033' }}>Usuários</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name" className="w-full h-full flex items-center justify-center">Lista de usuários do Nanogram</Label>
                                    <ScrollArea className="h-full w-full rounded-md border">
                                    {list?.length > 0 ? (
                                        list?.map((user) => (
                                            <div key={user?.id} className="mb-4">
                                                <Link href={`/OtherProfile?id=${user?.id}`} passHref className="flex items-center justify-center space-x-2 cursor-pointer">
                                                    <img src={`data:image;base64,${user?.profile_picture}`} alt="User profile" className="w-10 h-10 rounded-full" />
                                                    <span className="text-lg">{user?.username}</span>
                                                </Link>
                                                <Separator className="my-2" />
                                            </div>
                                        ))
                                        
                                    ) : (
                                        <p>Sem usuários para exibir.</p>
                                    )
                                    }
                                    </ScrollArea>
                                    <div className="flex justify-center">
                                        <Link href='/Dashboard'>
                                            <Button className="border border-customcolor bg-transparent text-customcolor">Voltar</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

