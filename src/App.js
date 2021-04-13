import React, { useState } from 'react'
import './App.css'
import Modal from 'react-modal'
import ReactGA from 'react-ga'

ReactGA.initialize('G-2RHDEB92L4');
ReactGA.pageview(window.location.pathname + window.location.search)

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function handleDMX(ui, author, quote) {
  if (author === 'dmx') {
    ui({
      response: 'Nice!',
      pal: 'green',
      quote: quote,
      dialogue: 'Thats right! DMX said it',
      modalIsOpen: true
    })
  } else {
    ui({
      response: 'Oops!',
      pal: 'red',
      quote: quote,
      dialogue: 'Nope, Jesus said that',
      modalIsOpen: true
    })
  }
}

function handleJesus(ui, author, quote) {
  if (author === 'jesus') {
    ui({
      response: 'Nice!',
      pal: 'green',
      quote: quote,
      dialogue: 'Thats right, Jesus said it',
      modalIsOpen: true
    })
   
  } else {
    ui({
      response: 'Oops!',
      pal: 'red',
      quote: quote,
      dialogue: 'Nope, that was DMX',
      modalIsOpen: true
    })
  }
}

function App() {
  var subtitle
  const [ui, setui] = useState({ color: 'black'})
  const [modalIsOpen,setIsOpen] = React.useState(false)

  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
 
  function closeModal(){
    setIsOpen(false);
  }

  const quizData = [
    {author: "dmx", quote: "You gave us power in our words, so I think before I speak, and that way when I speak, they know I'm here to teach."},
	  {author: "dmx", quote: "I don't like anything about Drake."},
	  {author: "dmx", quote: "You can't speak for the people unless you're able to walk amongst the people"},
	  {author: "dmx", quote: "I'm not going to disrespect you, don't disrespect me."},
	  {author: "dmx", quote: "I don't recall being excited about a new rapper, ever."},
    {author: "jesus", quote: "With man this is impossible, but with God all things are possible."},
    {author: "jesus", quote: "For those who exalt themselves will be humbled, and those who humble themselves will be exalted."},
    {author: "jesus", quote: "Don’t worry about tomorrow, for tomorrow will bring its own worries. Today’s trouble is enough for today."},
    {author: "jesus", quote: "And know that I am with you always; yes, to the end of time"},
    {author: "jesus", quote: "For what shall it profit a man, if he gain the whole world, and suffer the loss of his soul?"}
  ]

  // assign an id
  for (let item in quizData) {
    quizData[item].id = quizData.indexOf(item)
  }

  const num = getRandomInt(quizData.length)

  return (
    <div className="App">
      <header className="App-header">
        <img src='dmx-or-jesus.jpg' className="DMX or Jesus" alt="logo" />
        <h1>
          DMX or Jesus?
        </h1> 
          { !ui.modalIsOpen && <p>&ldquo;{quizData[num].quote }&rdquo;</p> }
          <table>
            <tbody>
              <tr>
                <td><button className='optionButton' onClick={() => handleDMX(setui, quizData[num].author, quizData[num].quote)}>DMX</button></td>
                <td><button className='optionButton' onClick={() => handleJesus(setui, quizData[num].author, quizData[num].quote)}>Jesus</button></td>
              </tr>
            </tbody>
          </table>
         
          <Modal
            isOpen={ui.modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Who said it?"
          >
 
          <h2 style={{ color: ui.pal }}>{ui.response}</h2>
          <p>"{ui.quote}"</p>
          <span className={ui.animation}>{ ui.dialogue }</span><br/><br/>
          <button onClick={() => { setui({ modalIsOpen: false })}}>close</button>
        </Modal>
          {/* <button className='navButton' onClick={() => handleNext(setui)}>Next</button> */}
      </header>
    </div>
  );
}

export default App;
