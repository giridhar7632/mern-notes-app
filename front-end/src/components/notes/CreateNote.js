import React, { useRef, useState } from 'react'
import { Button } from '@chakra-ui/button'
import { useHistory } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Box,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'

const CreateNote = () => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
  })

  const history = useHistory()
  const toast = useToast()
  const toastIdRef = useRef()
  const addToast = (text, type) => {
    toastIdRef.current = toast({
      title: `${text}`,
      status: `${type}`,
      isClosable: true,
      duration: 3000,
    })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setNote({ ...note, [name]: value })
  }

  const createNote = async e => {
    console.log('create')
    e.preventDefault()
    try {
      const token = localStorage.getItem('userToken')
      if (token) {
        const { title, content, date } = note
        const newNote = { title, content, date }

        const res = await axios.post('/api/notes', newNote, {
          headers: { Authorization: token },
        })
        console.log(res)
        addToast(res.data.msg, res.data.type)
        return history.push('/')
      }
    } catch (error) {
      window.location.href = '/'
    }
  }

  return (
    <div>
      <Box w="30vw">
        <Heading my={4}> Create Note</Heading>
        <form onSubmit={createNote}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="Untitled"
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Content</FormLabel>
            <Textarea
              name="content"
              value={note.content}
              onChange={handleChange}
              placeholder="Content of the note"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Date</FormLabel>
            <Input
              name="date"
              value={note.date}
              onChange={handleChange}
              type="date"
            />
          </FormControl>
          <Button type="submit" colorScheme="purple" mt={3}>
            Add Note
          </Button>
        </form>
      </Box>
    </div>
  )
}

export default CreateNote
