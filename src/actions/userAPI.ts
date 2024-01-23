

export async function updateUser(token: string) {
    const res = await fetch(
      `http://localhost:3001/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
      },
    )
  
    return res.json()
}

export async function deleteUser(token: string) {
    const res = await fetch(
      `http://localhost:3001/users/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      },
    )
  
    return res.json()
}