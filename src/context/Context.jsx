import { createContext, useState } from 'react';
import runChat from "../config/gemini"

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompts, setPreviosPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    }

    const newChat = () =>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData('');
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
        } else {
            setPreviosPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }
        let responseArray = response.split('**');
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 != 1) {
                newResponse = responseArray[i];
            } else {
                newResponse += '<br>' + responseArray[i] + '</br>';
            }
        }
        let FinalResult = newResponse.split("*").join('<br>');
        let newResponseArray = FinalResult.split(' ');
        for (let i = 0; i < newResponseArray.length; i++) {
            delayPara(i, newResponseArray[i] + ' ');
        }
        setLoading(false);
        setInput('');
    }

    const contextValue = {
        prevPrompts,
        setPreviosPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;