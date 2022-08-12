import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import './firebase/firebase'
import { SignedInStack, SignedOutStack } from './navigation'


const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const userHandler = user => 
    user ? setCurrentUser(user) : setCurrentUser(null)
    const auth = getAuth()
    useEffect(() => 
        onAuthStateChanged(auth, user => userHandler(user))
    ,[])
  return <>
    {
        currentUser ? <SignedInStack /> : <SignedOutStack />
    }
  </>
}

export default AuthNavigation