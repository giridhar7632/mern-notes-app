import React, { useState } from 'react' // importing useState hook
import { ChakraProvider, Flex, theme } from '@chakra-ui/react'

import Notes from './components/Notes'
import Login from './components/Login'

const App = () => {
  const [isLogin, setIsLogin] = useState(true) // using state variables

  return (
    <ChakraProvider theme={theme}>
      <Flex p={8} h="100vh" flexDirection="column" textAlign="center">
        <Flex maxW="100%" justifyContent="center" mt={4}>
          {isLogin ? <Notes /> : <Login setIsLogin={setIsLogin} />}
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default App
