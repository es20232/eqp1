'use client'

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

import { 
    FaCamera, 
    FaUser, 
    FaHome, 
    FaSignOutAlt, 
    FaPlus, 
    FaRegComment, 
    FaRegHeart, 
    FaRegThumbsDown
  } from 'react-icons/fa';

import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from 'react'
import { getUser, get_me } from '@/actions/user'

export default function Dashboard() {
  const [userData, setUserData] = useState<getUser>();
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState(false);
  const [deslike, setDeslike] = useState(false);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await get_me();
        setUserData(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p style={{ fontSize: '2rem', textAlign: 'center', color: '#FF2C46' }}>Carregando...</p>
      </div>
    );
  }

  if (!loading) {
    return (
      <div className="flex justify-center items-center h-screen relative">
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '80px',
            height: '80px',
            textAlign: 'center',
          }}
        >

          <Link href="/Profile">
            <Avatar style={{ width: '80px', height: '80px', position: 'relative' }}>
              <AvatarFallback style={{ backgroundColor: '#FF2C46' }}></AvatarFallback>
            </Avatar>
            {userData?.profile_picture ? (
              <Avatar style={{ width: '80px', height: '80px', position: 'absolute', top: 0 }}>
                <AvatarImage width={40} height={40} src={`data:image;base64,${userData.profile_picture}`} />
              </Avatar>
            ) : (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                <FaCamera size={35} color="#FFFF" />
              </div>
            )}
          </Link>

          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%)',
            }}
          >
            <h1 style={{ color: '#FF2C46' }}>{userData?.full_name}</h1>
          </div>

          </Link>
          <h1>@username</h1>
        </div>
        <div className="flex items-center space-x-4"> {/* POST */}
          <div>
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <h1 style={{ color: '#FF2C46' }}>@username</h1>
            </div>
            <Skeleton className="h-[300px] w-[400px]" style={{ marginBottom: '16px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaRegHeart size={26} />
              <FaRegComment size={26} />
              <FaRegThumbsDown size={26} />
            </div>
            <h1>200 curtidas</h1>
            <h1>Descrição</h1>
            <input type="text" placeholder="Adicione um comentário..." style={{ marginTop: '8px' }} />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center"> {/* botão CRIAR */}
          <Button style={{ borderRadius: '50%', width: '50px', height: '50px', backgroundColor: '#FF2C46' }}>
            <FaPlus size={35} />
          </Button>
          <div style={{ marginLeft: '8px' }}>
            <h1 style={{ color: '#FF2C46', fontSize: '1rem' }}>Criar</h1>
          </div>
        </div>
        <div className="absolute top-4 right-4"> {/* MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" style={{ backgroundColor: '#FF2C46', color: '#FFFF' }}>
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" style={{ color: '#FF2C46' }}>
              <DropdownMenuLabel style={{ fontFamily: 'Linux Libertine G' }}>Nanogram</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/* 
                <Link href="/">
                  <DropdownMenuItem>
                    <FaHome size={18} style={{ marginRight: '8px' }} />
                    Página Inicial
                  </DropdownMenuItem>
                </Link>
                */}
                <Link href="/Profile">
                  <DropdownMenuItem>
                    <FaUser size={18} style={{ marginRight: '8px' }} />
                    Editar Perfil
                  </DropdownMenuItem>
                </Link>
                <Link href="/Post">
                  <DropdownMenuItem>
                   <FaUpload size={18} style={{ marginRight: '8px' }} />
                    Postar
                  </DropdownMenuItem>
                </Link>
                <Link href="/UserProfile">
                  <DropdownMenuItem>
                   <FaCamera size={18} style={{ marginRight: '8px' }} />
                    Galeria
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <Link href="/Users">
                  <DropdownMenuItem>
                    <FaUsers size={18} style={{ marginRight: '8px' }} />
                    Usuários
                  </DropdownMenuItem>
                </Link>
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
}

  
  
  