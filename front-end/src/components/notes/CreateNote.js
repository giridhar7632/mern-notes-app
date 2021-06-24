import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Box,
} from '@chakra-ui/react'

const CreateNote = () => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setNote({ ...note, [name]: value })
  }

  return (
    <div>
      <Box w="30vw">
        <Heading my={4}> Create Note</Heading>
        <form>
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
