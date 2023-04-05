import React, {useEffect, useState} from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Timer } from '@mui/icons-material';
import { keyframes } from "@emotion/react";


interface MoleProps {
    top: string;
    left: string;
    onClick: () => void;
  }
  
  const Mole = styled(Box)<MoleProps>`
  background-color: #6d4c41;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transition: top 0.3s ease-in-out, left 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px #3e2723;
  cursor: pointer;
  &:hover {
    background-color: #8d6e63;
  }
`;

interface HoleProps {
    onClick: () => void;
  }
  
  const Hole = styled(Box)<HoleProps>`
    position: relative;
    width: 70px;
    height: 70px;
    margin: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  `;

  const Board = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const scoreAnimation = keyframes`
  0% {transform: scale(1);}
  50% {transform: scale(1.5);}
  100% {transform: scale(1);}
`;

const Score = styled(Box)`
  font-size: 24px;
  font-weight: bold;
  animation: ${scoreAnimation} 0.5s ease;
`;




const MiniWhackAMole: React.FC = () => {
    const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [moleLocation, setMoleLocation] = useState<{
    top: string;
    left: string;
  }>({ top: "-100px", left: "-100px" });


  const molePositions = [
    { top: "0px", left: "0px" },
    { top: "0px", left: "90px" },
    { top: "0px", left: "180px" },
    { top: "80px", left: "0px" },
    { top: "80px", left: "90px" },
    { top: "80px", left: "180px" },
  ];

  const randomizeMoleLocation = (): void => {
    const newLocation =
      molePositions[Math.floor(Math.random() * molePositions.length)];
    setMoleLocation(newLocation);
  };


  const startGame = (): void => {
    setScore(0);
    setTimeLeft(10);
    randomizeMoleLocation();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      randomizeMoleLocation();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

//   useEffect(() => {
//     if (timeLeft === 0) {
//         clearInterval(interval);
//         setMoleLocation({ top: "-100px", left: "-100px" });
//         alert(`Time's up! Your score is ${score}`);
//       }}, [timeLeft, score]);

      const handleWhack = (): void => {
        setScore((prevScore) => prevScore + 1);
        randomizeMoleLocation();
      };
      return (
        <Box textAlign="center">
        <Button variant="contained" onClick={startGame}>
        Start Game
        </Button>
        <Score>Score: {score}</Score>
        <Score>Time Left: {timeLeft}</Score>
        <Board>
        {[...Array(6)].map((_, index) => (
        <Hole key={index} onClick={handleWhack}>
        {moleLocation.top === molePositions[index].top &&
        moleLocation.left === molePositions[index].left ? (
        <Mole
                     top={moleLocation.top}
                     left={moleLocation.left}
                     onClick={handleWhack}
                   >
        🍔
        </Mole>
        ) : null}
        </Hole>
        ))}
        </Board>
        </Box>
        );
}

export default MiniWhackAMole