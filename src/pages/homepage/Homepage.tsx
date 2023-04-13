import React, { useContext } from 'react'
import { AuthContext } from '../../store/auth-contex'

const Homepage = () => {
const {token} = useContext(AuthContext)
console.log(token);
  return (
    <>
    <div>Homepage</div>
    <p>TOKEN: {token}</p>
    </>
  )
}

export default Homepage