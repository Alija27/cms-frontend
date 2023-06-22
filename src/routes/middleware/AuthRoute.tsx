import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'

const AuthRoute = () => {
    const authState=useAppSelector((store)=>store.AuthSlice)
  
}

export default AuthRoute