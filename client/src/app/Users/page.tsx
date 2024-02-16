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

// Simulando uma lista de usuários com nomes e imagens de perfil
const users = Array.from({ length: 50 }, (_, i) => ({
  name: `User${i}`,
  image: `https://randomuser.me/api/portraits/thumb/women/${i}.jpg`, // URL de uma API de usuário aleatório
}));

export default function CardWithForm() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: '#ffffff'}}>
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
                  {users.map((user) => (
                    <div key={user.name} className="mb-4">
                      <Link href={`/users/${user.name}`} className="flex items-center justify-center space-x-2 cursor-pointer">
                        <img src={user.image} alt="User profile" className="w-10 h-10 rounded-full" />
                        <span className="text-lg">{user.name}</span>
                      </Link>
                      <Separator className="my-2" />
                    </div>
                  ))}
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
