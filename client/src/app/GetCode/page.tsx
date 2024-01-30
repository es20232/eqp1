import * as React from "react"


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

export default function GetCode() {
  return (
    <div style={{alignItems:'center', height:'100vh'}} className="w-full h-full flex justify-center">
    <div className='w-full min-h-screen flex flex-col items-center justify-center' style={{ backgroundColor: '#FFFF' }}>
      <div className=' items-center justify-center'>
        <h1 className="text-4xl" style={{ color: '#FF2C46', fontFamily: 'Linux Libertine G' }}>NANOGRAM</h1>
      </div>
      <br/><br/>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Código</CardTitle>
        <CardDescription>Digite o código de confirmação.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              
              <Input id="Code" placeholder=" " />
            </div>
            <div className="flex flex-col space-y-1.5">
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-1.5">
      <Link href='/ResetPassword'>
      <Button className="border border-customcolor bg-transparent text-customcolor">Voltar</Button>
      </Link>
        <Link href='/NewPassword'>
        <Button style={{ backgroundColor: '#FF2C46' }}>Avançar</Button>
      </Link>
      </CardFooter>
    </Card>
    </div>
    </div>
  )
}