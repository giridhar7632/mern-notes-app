import React, { useState, useEffect } from 'react'
import { ChakraProvider, Flex, theme } from '@chakra-ui/react'
import axios from 'axios'

import Notes from './components/Notes'
import Login from './components/Login'

const App = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('userToken')
      if (token) {
        const verified = await axios.get('/users/verify', {
          headers: { Authorization: token },
        })
        setIsLogin(verified.data)
        if (verified.data === false) return localStorage.clear()
      } else {
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Flex p={8} h="100vh" flexDirection="column" textAlign="center">
        <Flex maxW="100%" justifyContent="center">
          {isLogin ? (
            <Notes setIsLogin={setIsLogin} />
          ) : (
            <Login setIsLogin={setIsLogin} />
          )}
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default App
