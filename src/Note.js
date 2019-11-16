import React,{useRef} from 'react'
import {Col,Card,Button,Form} from 'react-bootstrap'

function Note(props){
    const refs = {
      title:useRef(null),
      note:useRef(null),
      author:useRef(null)
    }
    const publishDraft = () => {
      props.note.title = refs.title.current.value
      props.note.note = refs.note.current.value
      props.note.author = refs.author.current.value 
      props.note.draft = false
      props.setNotes([...props.notes])
    }
    return(
      <Col lg={4} sm={12} mb={2} className="mb-3">               
        <Card>   
          <Card.Header>  
            <span key={props.note.id+1} className="float-right" >
              <Form.Check
                  custom
                  label=""
                  type="checkbox"
                  id={props.note.id+1}
                  onChange={()=>{
                    props.note.isChecked=!props.note.isChecked
                    props.setEnableDelete(props.note.isChecked || props.notes.some(note => note.isChecked))
                  }}     
              />
            </span>
            {
              props.note.draft ? 
                (
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" ref={refs.title} defaultValue={props.note.title}/>
                  </Form.Group>
                ):props.note.title
            }
          </Card.Header>
          <Card.Body>
             {
                props.note.draft ? 
                  (
                    <>
                      <Form.Group>
                       <Form.Label>Author</Form.Label>
                        <Form.Control  type="text" placeholder="Author" ref={refs.author} defaultValue={props.note.author}/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Note</Form.Label>
                        <Form.Control   as="textarea" rows="3" ref={refs.note} defaultValue={props.note.note}/>
                      </Form.Group>
                      <Button variant="primary" onClick={publishDraft}>Publish Draft</Button>
                    </>
                ):(
                  <>
                    <Card.Subtitle className="mb-2 text-muted">{props.note.author}</Card.Subtitle>
                    <Card.Text>{props.note.note}</Card.Text>
                  </>
                )
              }
          </Card.Body>
        </Card>
      </Col>
    )
  }

  export default Note