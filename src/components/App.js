import '../style/App.css';
import React, { useEffect, useState } from 'react';
import { FormControl, Input, IconButton } from '@material-ui/core';
import Message from './Message';
import db from '../firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); // an array of objects
  const [username, setUsername] = useState('');

  // useState = variables in React
  // useEffect = run code based on condition

  // anytime database changes
  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))) // doc.data() returns an array of objects w/ message & username
    });
  }, [])

  useEffect(() => {
    // code to run
    setUsername(prompt('Please enter your name'));
  }, []) // condition: empty array, only run once when app component loads


  // when enter/click send message button
  const sendMessage = (event) => {
    event.preventDefault(); // don't refresh page when submit since in a form, which (auto-submit/refreshes page)

    db.collection('messages').add({
      text: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput(''); // clear input field after hitting the send message button

    // setMessages([
    //   ...messages,  // add new message object (username + message) from the input field to all previous messages
    //   {username: username, text: input} 
    // ]) 
    // setInput(''); // clear input field after hitting the send message button
  }

  return (
    <div className="App">
      <img className="logo" src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" alt="Messenger logo" />
      <h2>Welcome {username}</h2>
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input className="app_input" placeholder='Enter a message...' aria-describedby="write a message" value={input} onChange={event => setInput(event.target.value)} />
          {/* add type='submit' to allow users to also press enter to submit button and not just click*/}
          <IconButton className="app_iconBtn" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
