

interface Criador{
    fullName?: string, 
    username?: string,
    email?: string,
    password?: string
}

export async function createUser(criador : Criador) {
    const res = await fetch(
      `http://localhost:3000/auth/sigup/`,
      {
        method: 'POST',
        body: JSON.stringify(criador),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      console.log(res);
      
    return res.json()
}

export async function loginAPI(data : Criador) {
    const res = await fetch(
      `http://localhost:3000/auth/sigin/`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
  
    return res.json()
}

export async function resetPassword(data : Criador) {
    const res = await fetch(
      `http://localhost:3000/auth/reset-password/request`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
  
    return res.json()
}

export async function verifyResetPassword(code : string) {
    const res = await fetch(
      `http://localhost:3000/auth/reset-password/verify`,
      {
        method: 'POST',
        body: JSON.stringify(code),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
  
    return res.json()
}

export async function updateResetPassword(password : string) {
    const res = await fetch(
      `http://localhost:3000/auth/reset-password/update`,
      {
        method: 'POST',
        body: JSON.stringify(password),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
  
    return res.json()
}