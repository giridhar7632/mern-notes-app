import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Flex, Heading, Link, Stack, Text } from '@chakra-ui/layout'

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [show, setShow] = useState(false)
  const [isRegistered, setIsRegistered] = useState(true)

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const handlePassword = () => setShow(!show)
  const handleResigter = () => setIsRegistered(!isRegistered)
  const handleLogin = () => setIsRegistered(!isRegistered)

  return (
    <Stack direction="column">
      {isRegistered ? (
        <Flex
          className="login"
          p="6"
          flexDirection="column"
          justifyContent="center"
        >
          <form>
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
          <form>
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
