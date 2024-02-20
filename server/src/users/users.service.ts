import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { profile_picDto, usersupdateDto, userReturnDto, userImagemDto } from './users_dto';
import * as argon from 'argon2';
import { Buffer } from 'buffer';
import { bufferToBase64 } from 'src/images';
import { userInfo } from 'os';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async get(id: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id,
                },

            });

            delete user.password;
            const updatedUser = new userReturnDto()
            updatedUser.id = user.id
            updatedUser.email = user.email
            updatedUser.full_name = user.full_name
            updatedUser.username = user.username
            if (user.profile_picture?.buffer.byteLength > 0) {
                const buffertoconvert = Buffer.from(user.profile_picture.buffer);
                const profile_picture = bufferToBase64(buffertoconvert);
                updatedUser.profile_picture = profile_picture
                return updatedUser;
            }            
            updatedUser.profile_picture = ''
            return updatedUser;
        }
        catch (error) {
            console.error(`Error : ${error.message}`);
            throw new NotFoundException('User not found.');
        }

    }

    async update(dto: usersupdateDto, id: number, image?: Express.Multer.File,) {
        this.get(id);

        if (dto.password) {
            dto.password = await argon.hash(dto.password);
        }
        try {
            if (!image) {
                const user = await this.prisma.user.update({
                    where: {
                        id,
                    },
                    data: {
                        ...dto,

                    },
                });
                delete user.password
                if (user.profile_picture?.buffer.byteLength > 0) {
                    const buffertoconvert = Buffer.from(user.profile_picture.buffer);
                    const profile_picture = bufferToBase64(buffertoconvert);
                    delete user.profile_picture

                    const updatedUser = new userReturnDto()
                    updatedUser.id = user.id
                    updatedUser.email = user.email
                    updatedUser.full_name = user.full_name
                    updatedUser.username = user.username
                    updatedUser.profile_picture = profile_picture
                    return updatedUser;
                }
                return user;
            }
            else {
                const user = await this.prisma.user.update({
                    where: {
                        id,
                    },
                    data: {
                        ...dto,
                        profile_picture: image.buffer,
                    },
                });

                const buffertoconvert = Buffer.from(user.profile_picture.buffer);
                const profile_picture = bufferToBase64(buffertoconvert);
                delete user.password;
                delete user.profile_picture;

                const updatedUser = new userReturnDto()
                updatedUser.id = user.id
                updatedUser.email = user.email
                updatedUser.full_name = user.full_name
                updatedUser.username = user.username
                updatedUser.profile_picture = profile_picture

                return updatedUser;
            }

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    if (error.meta.target === 'User_username_key')
                        throw new ForbiddenException({
                            message: 'Username already registered',
                            statuscode: 403,
                        });
                    if (error.meta.target === 'User_email_key')
                        throw new ForbiddenException({
                            message: 'Email already registered',
                            statuscode: 403,
                        });
                }
            }
            throw error;

        }
    }

    async delete(id: number) {
        this.get(id);
        try {
            const user = await this.prisma.user.delete(
                {
                    where: {
                        id,
                    }
                }
            )

            delete user.password;
            return user;

        } catch (error) {
            console.error(`Error: ${error.message}`);
            throw error;

        }
    }

    async findAll() {
        try {
            const users = await this.prisma.user.findMany({
                select: {
                    id:true,
                    username: true,
                    profile_picture: true
                }
            });

            const upUsers = []
            for (let i = 0; i < users.length; i++) {
                const upUser = new userImagemDto()
                let profile_picture;
                if (users[i].profile_picture?.buffer.byteLength > 0) {
                    const buffertoconvert = Buffer.from(users[i].profile_picture.buffer);
                    profile_picture = bufferToBase64(buffertoconvert);
                }
                upUser.id = users[i].id
                upUser.username = users[i].username
                upUser.profile_picture = profile_picture

                upUsers.push(upUser)
            }

            return upUsers;
        }
        catch (error) {
            console.error(`Error : ${error.message}`);
            throw new NotFoundException('Problem listing users');
        }
    }

}