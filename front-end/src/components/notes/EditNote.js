import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@chakra-ui/button'
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
import { useHistory } from 'react-router-dom'

const EditNote = ({ match }) => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    id: '',
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

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem('userToken')
      if (match.params.id) {
        const res = await axios.get(`/api/notes/${match.params.id}`, {
          headers: { Authorization: token },
        })
        console.log(res.data.date)
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id,
        })
      }
    }
    getNote()
  }, [match.params.id])

  const editNote = async e => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('userToken')
      if (token) {
        const { title, content, date, id } = note
        const newNote = { title, content, date }

        const res = await axios.put(`/api/notes/${id}`, newNote, {
          headers: { Authorization: token },
        })
        addToast(res.data.msg, res.data.type)
        history.push('/')
      }
    } catch (error) {
      window.location.href = '/'
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setNote({ ...note, [name]: value })
  }

  return (
    <Box w="30vw">
      <Heading my={4}> Edit Note</Heading>
      <form onSubmit={editNote}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input name="title" value={note.title} onChange={handleChange} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Content</FormLabel>
          <Textarea
            name="content"
            value={note.content}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Date: {note.date}</FormLabel>
          <Input
            name="date"
            value={note.date}
            onChange={handleChange}
            type="date"
          />
        </FormControl>
        <Button type="submit" colorScheme="purple" mt={3}>
          Save
        </Button>
      </form>
    </Box>
  )
}

export default EditNote
