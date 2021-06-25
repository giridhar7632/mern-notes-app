import React from 'react'
import { Flex } from '@chakra-ui/layout'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './notes/Home'
import CreateNote from './notes/CreateNote'
import EditNote from './notes/EditNote'
import Header from './notes/Header'

const Notes = ({ setIsLogin }) => {
  return (
    <Router>
      <Flex flexDirection="column" alignItems="center" w="100%">
        <Header setIsLogin={setIsLogin} />
        <Route path="/" component={Home} exact />
        <Route path="/create" component={CreateNote} exact />
        <Route path="/edit/:id" component={EditNote} exact />
      </Flex>
    </Router>
  )
}

export default Notes
