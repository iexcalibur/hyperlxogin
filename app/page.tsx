"use client"

import Container from './components/Container';
import SignIn from './components/Signin';
import SignUp from './components/SignUp';
import { useState } from 'react';
import Navbar from './components/navbar/NavBar';

export default function Home() {
  
  const [activeComponent, setActiveComponent] = useState('SignUp');
  const handleSignInClick = () => {
    setActiveComponent('SignIn');
  };
  const handleSignUpClick = () => {
    setActiveComponent('SignUp');
  };
  return (
      <>
      <Navbar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        <div className="flex justify-center items-center h-screen bg-rose-100">
          <Container>
            {activeComponent ==="SignUp" ? <SignUp onSignInClick={handleSignInClick} /> : <SignIn onSignUpClick={handleSignUpClick}/>}
          </Container>
        </div>
      </>
      
  );  
}
