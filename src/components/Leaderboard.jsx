import React from 'react'
import { useState, useEffect, useContext, useRef } from 'react'
import "../App.css"
import {fetchScores} from "../utilities/firebase"
import Crown from "../assets/Crown.jsx"

import { RecentPlayerContext } from '../contexts/RecentPlayerContext.jsx'
import {Link} from "react-router-dom"

function Leaderboard() {

  const [scoresRankings, setScoresRankings] = useState([])

  // get the local player from the context provider info so we can higlight
  const {recentPlayerInfo, setRecentPlayerInfo} = useContext(RecentPlayerContext);

  // this is to get the element of the local user score, so we can scroll to it when this page (/leaderboard) loads
  const targetRef = useRef(null);
  const scrollToTarget = () =>{
    targetRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  useEffect(()=>{

    const setFetchedData = async () => {
      try{
        const result = await fetchScores();
        setScoresRankings(result)
      }catch (error){
        console.log(error);
      }
    }

    setFetchedData();
    // console.log(recentPlayerInfo);

  }, [])

  return (
    <div className='font-player text-white h-full flex justify-center py-30'>
      
      <div className='md:w-[80%] space-y-8 md:space-y-15 flex flex-col items-center'>

        <div className='md:space-x-5 text-center'>
          <Link to="/" className='border p-3 hover:text-black hover:bg-white'>Play Again!</Link>
          <button className='bg-white text-black p-2 border hover:text-white hover:bg-black cursor-pointer' onClick={scrollToTarget}>See Your Score</button>
        </div>


        <h1 className='text-xl md:text-4xl text-center'>LEADERBOARD</h1>
        
        {/* holds all the scores read from the database */}
        <div className='space-y-4 md:space-y-8 md:w-[75%]'>

        {scoresRankings.map((score, index) => {

          // defining font colors for first three people on the leaderboard
          const colorClass =
          index === 0 ? 'text-red-500' :
          index === 1 ? 'text-green-500' :
          index === 2 ? 'text-blue-500' : 
          score.score === recentPlayerInfo.score ? 'text-amber-300':
          'text-white';

          return(
            // the ref attribute on the div sets this div as the element stored in the useRef so that when the button to see user score is clicked, the webpage scrolls to that element
            <div 
            key={index} 
            ref={score.score === recentPlayerInfo.score && score.name === recentPlayerInfo.name ? targetRef : null} 
            className={`${colorClass} md:flex justify-between text-md md:text-3xl`}>
              <h1>{score.name}</h1>
              <h1>{score.score} secs</h1>
            </div>
          )

          })}

        </div>
      </div>
      
    </div>
  )
}

export default Leaderboard