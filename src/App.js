import React, { useState } from 'react';
import Title from './components/title'
import Grid from './components/grid'
import Modal from 'react-modal';
// import Sound from 'react-sound';
import music from './components/audio/7Mars.mp3';


import './App.css';

function App() {

  const [boxes, setBoxes] = useState(Array(9).fill(null));
  let [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [countXPlayer, setCountXPlayer] = useState(0);
  const [countOPlayer, setCountOPlayer] = useState(0);

  const handleClick = (index) => {
    const boxesCopy = [...boxes];
    boxesCopy[index] = xIsNext ? 'X' : 'O';
    setBoxes(boxesCopy);
    setXIsNext(prev => !prev)

    // Chercher le gagnant

    const winner = calculateWinner(boxesCopy);

    if (winner) {
      setWinner(winner);
      if (winner === 'X') {
        setCountXPlayer(countXPlayer + 1);
      } else {
        setCountOPlayer(countOPlayer + 1);
      }
      openModal();
      setBoxes(Array(9).fill(null));
    } else if (!boxesCopy.includes(null)) {
      openModal();
      setWinner(false);
      setBoxes(Array(9).fill(null));
    }
  }
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }
  // const [message, setMessage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true)

  }
  const closeModal = () => {
    setModalIsOpen(false);
  }

  let playerMessage;
  if (winner === false) {
    playerMessage = 'Match nul !';
  } else if (winner) {
    playerMessage = `Player ${winner} won !`;
  }

  function play() {
    new Audio(music).play()
  }

  return (
    <div style={{ backgroundImage: `url("https://images.unsplash.com/photo-1492446190781-58ac4285911d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1405&q=80")`, height: `100vh` }}>
      <Title />

      <div className='player'>
        <span>
          {xIsNext ? 'Player 1 use X' : 'Player 2 use O'}
        </span>
      </div>

      <div className="app">
        {
          boxes.map((elt, index) => (
            <Grid key={index} onClick={() => handleClick(index)} value={elt} disabled={!!elt} />
          ))
        }
      </div>

      <div className='audio'>
        <button onClick={play}>PLAY SOUND</button>
      </div>

      <div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>{playerMessage}</h2>
          <div className='score'>
            <h3>Player X has <br /> {countXPlayer}</h3>
            <button className='btn-win' onClick={closeModal}>Close</button>
            <h3>Player O has <br />{countOPlayer}</h3>
          </div>
        </Modal>
      </div>



    </div>

  );
}


export default App;
