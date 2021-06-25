import React, { useRef, useState } from 'react'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Flex, Heading, Link, Stack, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [show, setShow] = useState(false)
  const [isRegistered, setIsRegistered] = useState(true)

  const toast = useToast()
  const toastIdRef = useRef()
  const addToast = (text, type) => {
    toastIdRef.current = toast({
      title: `${text}`,
      status: `${type}`,
      isClosable: true,
      duration: 30000,
    })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const handlePassword = () => setShow(!show)
  const handleResigter = () => setIsRegistered(!isRegistered)
  const handleLogin = () => setIsRegistered(!isRegistered)

  const registerUser = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/users/register', {
        username: user.name,
        email: user.email,
        password: user.password,
      })
      setUser({ name: '', email: '', password: '' })
      console.log(res.data)
      addToast(res.data.msg, res.data.type)
      setIsRegistered(true)
    } catch (error) {
      error.response.data.msg &&
        addToast(error.response.data.msg, error.response.data.type)
    }
  }

  const userLogin = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/users/login', {
        email: user.email,
        password: user.password,
      })
      setUser({ name: '', email: '', password: '' })
      addToast(res.data.msg, 'success')
      localStorage.setItem('userToken', res.data.token)
      setIsLogin(true)
    } catch (error) {
      error.response.data.msg && addToast(error.response.data.msg, 'error')
    }
  }

  return (
    <Stack direction="column">
      {isRegistered ? (
        <Flex
          className="login"
          p="6"
          flexDirection="column"
          justifyContent="center"
        >
          <form onSubmit={userLogin}>
            <Heading as="h2" size="lg" textAlign="center" mb={6}>
              Login
            </Heading>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </FormControl>
            <FormControl id="password" mt="2" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handlePassword}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button mt={6} type="submit" colorScheme="purple" variant="solid">
              Login
            </Button>
          </form>
          <Text mt={6}>
            Don't have an account?{' '}
            <Link color="purple.500" onClick={handleResigter}>
              Register now
            </Link>
          </Text>
        </Flex>
      ) : (
        <Flex
          className="register"
          p="6"
          flexDirection="column"
          justifyContent="center"
        >
          <form onSubmit={registerUser}>
            <Heading as="h2" size="lg" textAlign="center" mb={6}>
              Register
            </Heading>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                value={user.name}
                name="name"
                onChange={handleChange}
                placeholder="Username"
              />
            </FormControl>
            <FormControl id="email" mt="2" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </FormControl>
            <FormControl id="password" mt="2" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  value={user.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handlePassword}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button mt={6} type="submit" colorScheme="purple" variant="solid">
              Register
            </Button>
          </form>
          <Text mt={6}>
            Already have an account?{' '}
            <Link color="purple.500" onClick={handleLogin}>
              Sign in
            </Link>
          </Text>
        </Flex>
      )}
    </Stack>
  )
}

export default Login
