"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const SignOut = () => {
  return (
    <Button onClick={()=> signOut({
        redirect: true,
        callbackUrl: `${process.env.NEXTAUTH_URL}/sign-in`

    })}>Sign Out</Button>
        
  )
}

export default SignOut