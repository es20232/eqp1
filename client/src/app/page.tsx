import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function Home(){
return (
    <main>
       <h1>Dashboard</h1> 
       <br/>
       <Link href="/EditProfile" scroll={false}></Link>
       <br/>
       <Link href='/Profile'>Screen - editar perfil</Link>
       <br/>
       <h1>Redefinição de senha</h1>
       <br/> 
       <Link href='/ResetPassword'>Screen - editar senha email</Link>
       <br/>
       <h1> Login & Cadastro </h1>
       <br/>
       <Link href='/Login'>Login</Link>
       <br/>
       <Link href='/SignUp'>Cadastre-se</Link>
       <br/>
       <Link href='/Post'>Fazer Upload</Link>
       <br/>
       <Link href='/UserProfile'>Perfil de usuário</Link>
    </main>
  )
}
