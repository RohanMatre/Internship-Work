"use client";
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Ripple } from 'react-css-spinners';

// Define keyframes for the slide-up animation with a duration of 10 seconds
const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Define keyframes for the fade-out animation
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// Define keyframes for the pulse animation
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Create a styled div for the loader container
const LoaderContainer = styled.div<{ $isLoaded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000; /* Background color for the loader */
  color: #fff; /* Text color for any loader content */
  animation: ${slideUp} 10s ease-out forwards, /* Slide-up animation for 10 seconds */
    ${(props) =>
      props.$isLoaded &&
      css`
        ${fadeOut} 0.5s ease-in-out forwards
      `};
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999; /* Ensure the loader is above other content */
  pointer-events: none; /* Allow interactions with the content below once loader is faded out */
`;

// Create a styled div for the main content container
const MainContent = styled.div<{ $isLoaded: boolean }>`
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

// Create a styled component for the loading text with pulse animation
const LoadingText = styled.h1`
  animation: ${pulse} 2s infinite ease-in-out;
`;

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time with a timeout
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 10500); // 10 seconds slide-up time + 0.5 seconds for fade-out

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoaderContainer $isLoaded={isLoaded}>
        <Ripple
          data-testid="loading-animation"
          color="rgba(0,255,213,1)"
          size={100}
          thickness={7}
        />
      </LoaderContainer>
      <MainContent $isLoaded={isLoaded}>
        <h1>Main Content</h1>
        <p>Your main application content goes here.</p>
      </MainContent>
    </>
  );
}
