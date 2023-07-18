import React, { useState } from 'react';
import 'https://kit.fontawesome.com/ec79f0a95b.js';
import Header from '../components/Header';
import '../css/style.css';
import MainContent from '../components/MainContent/MainContent';

const Main = () => {
  const [textInput, setText] = useState('');

  return (
    <div style={{ height: '100vh' }}>
      <Header textInput={textInput} setText={setText} />
      <MainContent textInput={textInput} />
    </div>
  );
};

export default Main;
