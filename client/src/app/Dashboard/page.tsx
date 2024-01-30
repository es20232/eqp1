import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { FaCamera, FaUser, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { Skeleton } from "@/components/ui/skeleton"

export default function Dashboard() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '80px',
            height: '80px',
          }}
        >
            <Link href="/Profile">
                <Avatar style={{ width: '80px', height: '80px', position: 'relative' }}>
                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                <AvatarFallback style={{ backgroundColor: '#FF2C46' }}></AvatarFallback>
                </Avatar>
            </Link>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
            }}
          >
            <FaCamera size={35} color="#FFFF" />
          </div>
          <h1>@username</h1>
        </div>
          <div className="flex items-center space-x-4">
            <div>
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2">
                    <h1>@username</h1>
                </div>
                <Skeleton className="h-[300px] w-[400px]" />
            </div>
        </div>
          <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" style={{ color: '#FF2C46'}}>
              <DropdownMenuLabel style={{fontFamily: 'Linux Libertine G' }}>Nanogram</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/">
                  <DropdownMenuItem>
                    <FaHome size={18} style={{ marginRight: '8px' }} />
                    Página Inicial
                  </DropdownMenuItem>
                </Link>
                <Link href="/Profile">
                  <DropdownMenuItem>
                    <FaUser size={18} style={{ marginRight: '8px' }} />
                    Perfil
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <Link href="/Login">
                <DropdownMenuItem>
                  <FaSignOutAlt size={18} style={{ marginRight: '8px' }} />
                  Sair
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }
  
  
  