import React, {useState, useContext} from 'react';

import useGetRandQuestions from "../hooks/RandomQuestions";
import useAccuracySpeedTracker from '../hooks/AccuracySpeedTracker';

import { useAccuracyContext } from '../contexts/accuracyContext';
import { RecentPlayerContext } from '../contexts/RecentPlayerContext';

import {writeScores} from "../utilities/firebase"
import { Link } from 'react-router-dom';

function QuestionSpam() {

    // the useGetRandQuestions hook is a custom hook that I wrote that handles all the logic behind handling form submissions and validating user answer
    const{questionLabel, 
        handleChange, 
        userAnswer, 
        inputField, 
        handleNumberButtonClicked, 
        yourSpeed,
        isCorrect} = useGetRandQuestions();

    //the useAccuracySpeedTracker is a custom hook that gets the speed and accuracy of the user (will need to modify this later)
    const {calculateSpeedTakenToAnswer} = useAccuracySpeedTracker();

    const{questionsAnswered, avgSpeed, noOfQuestionsCorrect} = useAccuracyContext();

    // this state is used to make all characters types appear uppercase on the screen where the user types in their nickname that will be stored in the database (leaderboard)
    const [value, setValue] = useState("");

    // consume the context of the mostRecentPlayer
    const {recentPlayerInfo, setRecentPlayerInfo} = useContext(RecentPlayerContext);

  return (

    <div className="font-player text-white h-full flex justify-center items-center">
        
        {/* if the state isCorrect is set to that string, that means the user has completed the problems */}
        {isCorrect === "Finished!" ? (
            <div>
                <h1>You're Done!</h1>
                <h3 className=''>{"You completed the questions in " + yourSpeed + " seconds"}</h3>

                <br />

                {/* where the player can input their name */}
                <div className='flex flex-col gap-3 items-center'>
                    <label htmlFor="userName">Enter your name (3 character limit)</label>
                    <input autoFocus={true} id="userName" type="text" className='border h-10' value={value} maxLength={3} onChange={(e)=>{setValue(e.target.value.toUpperCase())}}/>
                    
                    <Link className='border p-3 text-center bg-white text-black hover:bg-black hover:text-white' to="/leaderboard" onClick={()=>{
                            // enter scores in database and send user to leaderboard screen
                            writeScores(value, yourSpeed);
                            // set the local player name and score to the recentPlayer context so we can locally higlight it in the leaderboard page
                            setRecentPlayerInfo({"name":value, "score":yourSpeed});
                        }}> 
                        See Leaderboard
                    </Link>
                
                </div>
                
            </div>
        ) : (
        // if not, continue loading new questions 
        <div className={"flex"}>

                <h1 className={"text-xl md:text-3xl border-red-400"}>{questionLabel}</h1>

                <textarea autoFocus={true} className='border-b w-[90px] h-[50px] resize-none ml-8 bottom-5 text-center text-3xl' 

                onChange={(e) => handleChange(e)}

                value={inputField}
                >

                </textarea>
            
                {/* <h2>{isCorrect}</h2> */}
            
        </div>
        )}
            
            
    </div>
  )
}

export default QuestionSpam