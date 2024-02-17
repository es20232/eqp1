'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import React, { useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";


export default function UserProfile() {
    return (
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
            }}>
                <div className="item-center" >
                <Avatar
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius:'50%',
                    marginRight: '20px'
                    }}>
                    <AvatarFallback style={{ backgroundColor: '#FF2C46' }}></AvatarFallback>
                </Avatar>
                </div>
                                            
                <div>
                     <Label className="text-base" style={{ color: '#FF2C46'}}>@username</Label>
                </div>
            </div>



            <div
            style={{
                width: '97.2%',
                height:'1px',
                backgroundColor:'#000',
                margin:'20px 0'
            }}></div>
            
            

            <div
            style={{
                display: 'inline-block',
                width: '31%',
                marginRight: '20px',
                marginBottom: '20px',
                verticalAlign: 'top',
                textAlign:'center',
                backgroundColor:'#FF46'
            }}>
                <Avatar style={{
                    width: '50%',
                    height: '50%',
                    margin:'0 auto'
                }}>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback style={{ backgroundColor: '#FF2C46' }}></AvatarFallback>
                </Avatar>
                <div className="space-x-1.5 space-y-1.5" style={{backgroundColor:'#fff'}}>
                <Button>Editar</Button>
                <Button style={{ backgroundColor: '#FF2C46' }}>Excluir</Button>
                </div>
            </div>


            <div 
            style={{
                display: 'inline-block',
                width: '31%',
                marginRight: '20px',
                marginBottom: '20px',
                verticalAlign: 'top',
                textAlign:'center',
                backgroundColor:'#FF46'
            }}>
                <Avatar style={{
                    width: '50%',
                    height: '50%',
                    margin:'0 auto'
                }}>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback style={{ backgroundColor: '#FF2C46' }}></AvatarFallback>
                </Avatar>
                <div className="space-x-1.5 space-y-1.5" style={{backgroundColor:'#fff'}}>
                <Button>Editar</Button>
                <Button style={{ backgroundColor: '#FF2C46' }}>Excluir</Button>
                </div>
            </div>


            <div 
            style={{
                display: 'inline-block',
                width: '31%',
                marginRight: '20px',
                marginBottom: '20px',
                verticalAlign: 'top',
                textAlign:'center',
                backgroundColor:'#FF46'
            }}>
                <img src="favicon.ico"
                style={{
                    width: '50%',
                    height: '50%',
                    margin:'0 auto'
                }} />
                <div className="space-x-1.5 space-y-1.5" style={{backgroundColor:'#fff'}}>
                <Button>Editar</Button>
                <Button style={{ backgroundColor: '#FF2C46' }}>Excluir</Button>
                </div>
            </div>

            <div 
            style={{
                display: 'inline-block',
                width: '31%',
                marginRight: '20px',
                marginBottom: '20px',
                verticalAlign: 'top',
                textAlign:'center',
                backgroundColor:'#FF46'
            }}>
                <img src="favicon.ico"
                style={{
                    width: '50%',
                    height: '50%',
                    margin:'0 auto'
                }} />
                <div className="space-x-1.5 space-y-1.5" style={{backgroundColor:'#fff'}}>
                <Button>Editar</Button>
                <Button style={{ backgroundColor: '#FF2C46' }}>Excluir</Button>
                </div>
            </div>
        </div>
    )
}