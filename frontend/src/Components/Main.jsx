import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from '../App';
import { addChannel } from '../store/chanelSlices';
import {Form, FloatingLabel, Button} from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3000/");

export const Main = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const channels = useSelector((state) => state.channel.channels);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    axios.get('/api/v1/data', { headers: {"Authorization" : `Bearer ${user.token}`} }).then((response) => {
      dispatch(addChannel(response.data));
    });
  }, []);

  useEffect(() => {
    
  }, []);

  const submit = (e) => {
    e.preventDefault();
    socket.emit('newMessage',  { body: value, channelId: 1, username: 'admin' });
    socket.on('newMessage',  (payload) => {
      console.log(payload);
    });
    setValue("");
  }

  const changeValue = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-2'>
          {channels.map(({id, name}) => <div key={id}><a href='#'>{name}</a></div>)}
        </div>
        <Form className='col' onSubmit={submit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Control
                className='md'
                type='text'
                onChange={changeValue}
                value={value}
              />
            </FloatingLabel>
            <Button type="submit">Enter</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default Main;
