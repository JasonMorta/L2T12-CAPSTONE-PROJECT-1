import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import '../App.css'



export default function Guide(props) {
  return (
<>
<Modal {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          How to play <em>Match Your Animals</em>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>CLICK START</h4>
        <ul>
           <li> Select a card then find it's matching card within the time limit.</li>
           <li>After matching all the cards, you can proceed to the next level or restart the game.</li>
           <li>Click RESTART GAME to restart the game from level 1</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button className='modal-close-btn myBtn' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}
