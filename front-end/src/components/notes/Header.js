import React from 'react'
import { Flex, Button, Text } from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'

const Header = ({ setIsLogin }) => {
  const logOut = () => {
    localStorage.clear()
    setIsLogin(false)
  }

  return (
    <Flex justifyContent="space-between" w="100%" flexDirection="row">
      <Flex justifyContent="center" alignItems="center" mb={4}>
        <FaEdit size="24px" />
        <Text ml={4} textAlign="center" fontWeight="bold" fontSize="2xl">
          <Link to="/">Notes App</Link>
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Button variant="outline" mx={3} size="md">
          <Link to="/create">Add Note</Link>
        </Button>
        <Button onClick={logOut} mx={3} variant="solid" size="md">
          Logout
        </Button>
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  )
}

export default Header
