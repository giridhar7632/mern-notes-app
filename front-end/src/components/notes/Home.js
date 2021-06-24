import React, { useState } from 'react'
import { IconButton } from '@chakra-ui/button'
import {
  Flex,
  Grid,
  Box,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/layout'
import { format } from 'timeago.js'
import { FaTrashAlt } from 'react-icons/fa'
import EditNote from './EditNote'

const Home = () => {
  const [notes, setNotes] = useState([])

  const deleteNote = id => {
    console.log('Notes deleted')
  }

  return (
    <Flex w="100%" flexDirection="column" mb={8}>
      {!notes.length ? (
        <Flex
          h={['30vh', '50vh']}
          w="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize={['2xl', '3xl']} opacity="0.2">
            No Notes Added
          </Text>
        </Flex>
      ) : (
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
          ]}
          gap={6}
          m="0 auto"
          w={['100%', '90%', '85%']}
        >
          {notes.map(note => (
            <Box
              w="100%"
              p={5}
              shadow="md"
              borderWidth="1px"
              flex="1"
              borderRadius="md"
              key={note._id}
            >
              <Heading size="md" isTruncated>
                {note.title}
              </Heading>
              <Text my={4} noOfLines={[3, 4, 5]}>
                {note.content}
              </Text>
              <Stack spacing={4}>
                <HStack justifyContent="space-between">
                  <Text color="purple.500">{note.name}</Text>
                  <Text>{format(note.date)}</Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <EditNote noteId={note._id}>Edit</EditNote>
                  <IconButton
                    onClick={() => deleteNote(note._id)}
                    colorScheme="red"
                    variant="solid"
                    size="md"
                    icon={<FaTrashAlt />}
                  ></IconButton>
                </HStack>
              </Stack>
            </Box>
          ))}
        </Grid>
      )}
    </Flex>
  )
}

export default Home
