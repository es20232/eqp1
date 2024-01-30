import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';

export default function EditProfile() {
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
                <FaPencilAlt size={35} color='#FFFF' />
          </div>
        </div>
      </div>
      <CardHeader>
        <CardTitle>Editar Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" placeholder="nome completo"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Nome do usuário</Label>
              <Input id="username" placeholder="@username"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="email"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input type="password" id="password" placeholder="********"/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href='/Profile'>
            <Button className="border border-customcolor bg-transparent text-customcolor hover:bg-red-500 hover:text-white">Cancelar</Button>
        </Link>
        <Link href='/Profile'>
            <Button style={{ backgroundColor: '#FF2C46' }}>Salvar Alterações</Button>
        </Link>
      </CardFooter>
    </Card>
  </div>
  </div>
)
}
