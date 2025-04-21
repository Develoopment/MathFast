import React, { useState, useEffect, useRef } from 'react';
import { generateRandomQuestion } from '../utilities/generateRandomQuestion';
import { useAccuracyContext } from '../contexts/accuracyContext';

const useGetRandQuestions = () => {

    // getting the input field so we can clear it whenever a new question loads
    const [inputField, setInputField] = useState("");

    const [questionLabel, setQuestionLabel] = useState();
    const [userAnswer, setUserAnswer] = useState("");

    // will need to delete this later (this was used for debugging purposes only)
    const [answerLabel, setAnswerLabel] = useState(0);

    // this state controls the text that prompts if the user solved the problem correctly or not
    const [isCorrect, setIsCorrect] = useState("");
    const [yourSpeed, setYourSpeed] = useState(0);

    // start timer when people start practicing
    const startTime = useRef(0);
    useEffect(() => {
        startTime.current = Date.now()
        // console.log("starttime: " + startTime);
    }, [])

    // gives access to vars keeping track of accuracy
    const { 
        questionsAnswered, 
        noOfQuestionsCorrect, 

        setQuestionsAnswered, 
        setnoOfQuestionsCorrect
    } = useAccuracyContext();

    const loadRandomQuestion = () => {
        const {question, answer} = generateRandomQuestion();
        setAnswerLabel(answer);
        // console.log("psst answer is: " + answer)
        setQuestionLabel(question);
    }

    useEffect(() => {
        // sets the number of question to be answered
        if (questionsAnswered < 10){
            // console.log("q answer: " + questionsAnswered)
            loadRandomQuestion();
        }else{
            // get the time the user took complete all 10 questions
            const endTime = Date.now();
            const timeTaken = (endTime - startTime.current)/1000;
            //console.log("time taken: " + timeTaken)
            setIsCorrect("Finished!");
            setYourSpeed(timeTaken);

            //send score to the dataase with a placeholder number and name for now
        }

    }, [questionsAnswered])


    const handleChange = (event) => {
        setUserAnswer(event.target.value);
        setInputField(event.target.value);

        // evaluate the accuracy of the answer
        if(answerLabel == event.target.value){
            setIsCorrect("Correct!");
            setnoOfQuestionsCorrect(noOfQuestionsCorrect + 1);
            setQuestionsAnswered(questionsAnswered + 1)

            // after that clear input, load new question and start counting how long the user takes to answer the question
            setInputField("");
            setUserAnswer("");
            
        }else{
            setIsCorrect("Wrong.");
        }

        
    }

    const handleNumberButtonClicked = (event) => {
        // since the user can manually type in an answer
        // or use the buttons
        // this function handles the buttons

        // the input field value is controlled by the inputField state
        // so adding the new value to any already rendered characters
        // console.log(event.target.value);

        setUserAnswer(userAnswer + event.target.value);
        setInputField(userAnswer + event.target.value);
        
        
    }

    return {questionLabel, handleChange, userAnswer, inputField, handleNumberButtonClicked, isCorrect, yourSpeed};
}

export default useGetRandQuestions;