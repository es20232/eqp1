// 'use client'

// import { Button } from '@/components/ui/button'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import Link from 'next/link';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
//   } from "@/components/ui/dropdown-menu"

// import { 
//     FaCamera, 
//     FaUser, 
//     FaHome, 
//     FaSignOutAlt, 
//     FaPlus, 
//     FaRegComment, 
//     FaRegHeart, 
//     FaRegThumbsDown,
//     FaUpload,
//     FaUsers
//   } from 'react-icons/fa';

// import { Skeleton } from "@/components/ui/skeleton"
// import { useEffect, useState } from 'react'
// import { getUser, get_me } from '@/actions/user'
// import { feedinfos, Feed } from '@/actions/Posts'

// export default function Dashboard() {
//   const [userData, setUserData] = useState<getUser>();
//   const [loading, setLoading] = useState(true);
//   const [like, setLike] = useState(false);
//   const [comment, setComment] = useState(false);
//   const [deslike, setDeslike] = useState(false);
//   const [dataFeed, setDataFeed] = useState<feedinfos[]>([]);

//   useEffect(() => {
//     const get = async () => {
//       try {
//         const response = await get_me();
//         setUserData(response);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     get();
    
//     const feed = async () => {
//       try {
//         const response = await Feed();
//         setDataFeed(response);
//         setLoading(false);
//       } catch (error) {
//         console.log('Error Feed', error)
//       }
//     };
//     feed();

//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p style={{ fontSize: '2rem', textAlign: 'center', color: '#FF2C46' }}>Carregando...</p>
//       </div>
//     );
//   }
  
//   if (!loading) {
    
//     return (
//       <div className="flex justify-center items-center h-screen relative">
//         <div
//           style={{
//             position: 'absolute',
//             top: '10px',
//             left: '10px',
//             width: '80px',
//             height: '80px',
//             textAlign: 'center',
//           }}
//         >

//           <Link href="/Profile">
//             <Avatar style={{ width: '80px', height: '80px', position: 'relative' }}>
//               <AvatarFallback style={{ backgroundColor: '#FF2C46' }}></AvatarFallback>
//             </Avatar>
//             {userData?.profile_picture ? (
//               <Avatar style={{ width: '80px', height: '80px', position: 'absolute', top: 0 }}>
//                 <AvatarImage width={40} height={40} src={`data:image;base64,${userData.profile_picture}`} />
//               </Avatar>
//             ) : (
//               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
//                 <FaCamera size={35} color="#FFFF" />
//               </div>
//             )}
//           </Link>

//           <div
//             style={{
//               position: 'absolute',
//               top: '100%',
//               left: '50%',
//               transform: 'translate(-50%)',
//             }}
//           >
//             <h1 style={{ color: '#FF2C46' }}>{userData?.full_name}</h1>
//           </div>
//       </div>
          
//           {dataFeed.length > 0 ? (
            
//             dataFeed.map((post, key) => {
              
//               return (
//                 <div className="flex items-center space-x-4" key = {key}> {/* POST */}
//                 <div >

//                     {post.user.profile_picture ? (
//                       <Avatar style={{ width: '80px', height: '80px', position: 'absolute', top: 0 }}>
//                         <AvatarImage width={40} height={40} src={`data:image;base64,${post.user.profile_picture}`} />
//                       </Avatar>
//                     ) : (
//                       <Skeleton className="h-20 w-20 rounded-full" />
//                     )}
//                   <div className="space-y-2">
//                     <h1 style={{ color: '#FF2C46' }}>{post.user.username}</h1>
//                   </div>
//                  {/* <Skeleton className="h-[300px] w-[400px]" style={{ marginBottom: '16px' }} />*/}
//                  <img className="h-[300px] w-[400px]" style={{ marginBottom: '16px' }} src={`data:image;base64,${post.post.post_image}`}></img>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <FaRegHeart size={26} />
//                     <FaRegComment size={26} />
//                     <FaRegThumbsDown size={26} />
//                   </div>
//                   <h1>200 curtidas</h1>
//                   <h1>{post.post.descricao}</h1>
//                   <input type="text" placeholder="Adicione um comentário..." style={{ marginTop: '8px' }} />
//                 </div>
//               </div>
//               )
//             })
//             ) : (
//               <p>Sem Postagem</p>
//             )
//           }

//         <div className="absolute bottom-4 left-4 flex items-center"> {/* botão CRIAR */}
//           <Link href="/Post">
//             <Button style={{ borderRadius: '50%', width: '50px', height: '50px', backgroundColor: '#FF2C46' }}>
//               <FaPlus size={35} />
//             </Button>
//           </Link>
//           <div style={{ marginLeft: '8px' }}>
//             <h1 style={{ color: '#FF2C46', fontSize: '1rem' }}>Criar</h1>
//           </div>
//         </div><div className="absolute top-4 right-4"> {/* MENU */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" style={{ backgroundColor: '#FF2C46', color: '#FFFF' }}>
//                 Menu
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" style={{ color: '#FF2C46' }}>
//               <DropdownMenuLabel style={{ fontFamily: 'Linux Libertine G' }}>Nanogram</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuGroup>
//                 <Link href="/Profile">
//                   <DropdownMenuItem>
//                     <FaUser size={18} style={{ marginRight: '8px' }} />
//                     Editar Perfil
//                   </DropdownMenuItem>
//                 </Link>
//                 <Link href="/Post">
//                   <DropdownMenuItem>
//                     <FaUpload size={18} style={{ marginRight: '8px' }} />
//                     Postar
//                   </DropdownMenuItem>
//                 </Link>
//                 <Link href="/UserProfile">
//                   <DropdownMenuItem>
//                     <FaCamera size={18} style={{ marginRight: '8px' }} />
//                     Galeria
//                   </DropdownMenuItem>
//                 </Link>
//               </DropdownMenuGroup>
//               <Link href="/Users">
//                 <DropdownMenuItem>
//                   <FaUsers size={18} style={{ marginRight: '8px' }} />
//                   Usuários
//                 </DropdownMenuItem>
//               </Link>
//               <DropdownMenuSeparator />
//               <Link href="/Login">
//                 <DropdownMenuItem>
//                   <FaSignOutAlt size={18} style={{ marginRight: '8px' }} />
//                   Sair
//                 </DropdownMenuItem>
//               </Link>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     );
//   }
// }

'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { 
  FaCamera, 
  FaUser, 
  FaHome, 
  FaSignOutAlt, 
  FaPlus, 
  FaRegComment, 
  FaRegHeart, 
  FaRegThumbsDown,
  FaUpload,
  FaUsers
} from 'react-icons/fa';

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from 'react';
import { getUser, get_me } from '@/actions/user';
import { feedinfos, Feed } from '@/actions/Posts';

interface PostProps {
  post: feedinfos;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="flex items-center space-x-4">
      <div>
        {/* {post.user.profile_picture ? (
          <Avatar style={{ width: '80px', height: '80px', position: 'absolute', top: 0 }}>
            <AvatarImage width={40} height={40} src={`data:image;base64,${post.user.profile_picture}`} />
          </Avatar>
        ) : (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                <Skeleton className="h-20 w-20 rounded-full" />
          </div>
        )} */}
          <Skeleton className="h-20 w-20 rounded-full" />

        <div className="space-y-2">
          <h1 style={{ color: '#FF2C46' }}>{post.user.username}</h1>
        </div>
        <img className="h-[300px] w-[400px]" style={{ marginBottom: '16px' }} src={`data:image;base64,${post.post.post_image}`} alt="post" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaRegHeart size={26} />
          <FaRegComment size={26} />
          <FaRegThumbsDown size={26} />
        </div>
        <h1>200 curtidas</h1>
        <h1>{post.post.descricao}</h1>
        <input type="text" placeholder="Adicione um comentário..." style={{ marginTop: '8px' }} />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [userData, setUserData] = useState<getUser>();
  const [loading, setLoading] = useState(true);
  const [dataFeed, setDataFeed] = useState<feedinfos[]>([]);

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
    
    const feed = async () => {
      try {
        const response = await Feed();
        setDataFeed(response);
        setLoading(false);
      } catch (error) {
        console.log('Error Feed', error)
      }
    };
    feed();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p style={{ fontSize: '2rem', textAlign: 'center', color: '#FF2C46' }}>Carregando...</p>
      </div>
    );
  }
  
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
      </div>
      
      <div style={{ maxHeight: '80vh', overflowY: 'auto' }}> {/* Container for posts */}
        {dataFeed.length > 0 ? (
          dataFeed.map((post, key) => (
            <Post post={post} key={key} />
          ))
        ) : (
          <p>Sem Postagem</p>
        )}
      </div>

      <div className="absolute bottom-4 left-4 flex items-center"> {/* botão CRIAR */}
        <Link href="/Post">
          <Button style={{ borderRadius: '50%', width: '50px', height: '50px', backgroundColor: '#FF2C46' }}>
            <FaPlus size={35} />
          </Button>
        </Link>
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

