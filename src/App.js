import React,{useState,useRef} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Row,Col,Navbar,Button,Modal,Form} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus,faTrashAlt,faStickyNote,faCaretDown,faCaretUp } from '@fortawesome/free-solid-svg-icons'

import Note from "./Note"

import defaultNotes from './notes.json'

import './App.css'

function App() {
  
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [searchValue,setSearchValue] = useState("");
  const [enableDelete,setEnableDelete] = useState(false)
  const [direction,setDirection] = useState("")
  const [notes,setNotes] = useState(defaultNotes)
  const [validated, setValidated] = useState(false);

  const refs = {
    title:useRef(null),
    note:useRef(null),
    author:useRef(null),
    search:useRef('')
  }
  
  const addNote = (event,draft) => {
    event.preventDefault()
    event.stopPropagation()

    setValidated(true)

    const form = event.currentTarget
    if (!form.checkValidity()) {
      return
    }

    setNotes(prevNotes => [...prevNotes, {
      id:Math.max(...notes.map(i => i.id), -1)+1,
      title:refs.title.current.value,
      note:refs.note.current.value,
      author:refs.author.current.value,
      date:new Date(),
      draft:draft
    }])
    setShow(false)
    setValidated(false)
  }
    
  const deleteNotes = () => {
    setNotes(notes.filter(note=>!note.isChecked))
    setEnableDelete(false)
  }

  const sortByDate = direction => {
    setDirection(direction)
  }

  const handleHide = () => {
    setValidated(false)
    handleClose()
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faStickyNote} color="blue" className="mr-2" />
          Notes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="ml-auto">
            <Form.Control id="search" type="text" placeholder="Search" onChange={()=>setSearchValue(refs.search.current.value)} ref={refs.search} />
          </Form>
        </Navbar.Collapse>
      </Navbar> 
      <Container>
        <Row>
          <Col lg={12} className="mt-3">
            <Button variant="primary" onClick={handleShow} className="mr-2">   
              <FontAwesomeIcon className="mr-2" icon={faPlus} />Add note
            </Button>
            <Button variant="danger" onClick={()=>deleteNotes()} disabled={!enableDelete}>
              <FontAwesomeIcon className="mr-2" icon={faTrashAlt}/>Delete
            </Button> 
            <div className="float-right">
              <FontAwesomeIcon className="mr-2" size="2x" icon={faCaretUp} onClick={()=>sortByDate('asc')}/>
              <FontAwesomeIcon icon={faCaretDown} size="2x" onClick={()=>sortByDate('desc')} />
            </div>
          </Col>
        </Row>
        <hr></hr>
        <Row id="notes-container">
          {
            notes
              .filter(note => new RegExp(searchValue,'ig').test(note.title))
              .sort((note,note1) =>
                direction==='asc' ? new Date(note1.date) - new Date(note.date) : new Date(note.date) - new Date(note1.date)  
              )
              .map(note =>
                <Note key={note.id} note={note} notes={notes} setEnableDelete={setEnableDelete} setNotes={setNotes}/>
              )
          }
         </Row>
      </Container>
       
      <Modal show={show} onHide={handleHide}>
      <Form noValidate validated={validated} onSubmit={(event)=>addNote(event,false)}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to add new note?</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title" ref={refs.title} required/>
            </Form.Group>
            <Form.Group controlId="note">
              <Form.Label>Note</Form.Label>
              <Form.Control as="textarea" rows="3" ref={refs.note} required/>
            </Form.Group>
            <Form.Group  controlId="author" >
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" placeholder="Author" ref={refs.author} required/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHide}>Close</Button>
            <Button variant="success" onClick={(event)=>addNote(event,true)}> Save as draft</Button>
            <Button variant="primary" type="submit"> Add note</Button>
          </Modal.Footer>
          </Form> 
       </Modal>
    </>
  )
}

export default App;
