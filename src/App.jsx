import "./App.css"
import QuestionSpam from './components/QuestionSpam'
import Leaderboard from "./components/Leaderboard.jsx"
import HomePage from "./components/HomePage.jsx"

import { AccuracyProvider } from "./contexts/accuracyContext"
import { RecentPlayerContextProvider } from "./contexts/RecentPlayerContext.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// defining routes and their corresponding pages
const router = createBrowserRouter([
  {path: "/challenge", element: <QuestionSpam/>},
  {path:"/leaderboard", element: <Leaderboard/>},
  {path:"/", element: <HomePage/>}
])

function App() {

  return (
    <AccuracyProvider>

    <RecentPlayerContextProvider>
    <div className="h-screen">
      <RouterProvider router={router}/>
    </div>
    </RecentPlayerContextProvider>
    
    </AccuracyProvider>
  )
}

export default App
