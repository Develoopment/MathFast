import { useState, createContext } from "react";

// This context holds the name and score pair of the most recent player (local to each player) so we can higlight it in the leaderboard locally (and not touch anything with the database)
export const RecentPlayerContext = createContext();

export const RecentPlayerContextProvider = ({children}) => {

    const [recentPlayerInfo, setRecentPlayerInfo] = useState({name:"NOX", score:72.646});

    return(
        <RecentPlayerContext.Provider value={{recentPlayerInfo, setRecentPlayerInfo}}>
            {children}
        </RecentPlayerContext.Provider>
    );
}

