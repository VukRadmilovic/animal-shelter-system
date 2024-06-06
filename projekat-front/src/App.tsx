import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserService} from "./services/UserService.ts";
import {PetSuggestionLandingPage} from "./components/PetSuggestionLandingPage/PetSuggestionLandingPage.tsx";
import {PetSuggestionsService} from "./services/PetSuggestionsService.ts";
import {LoginRegistration} from "./components/LoginRegistration/LoginRegistration.tsx";

function App() {
 const userServiceSingleton = new UserService();
 const suggestionServiceSingleton = new PetSuggestionsService();
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PetSuggestionLandingPage suggestionService={suggestionServiceSingleton}/>}/>
                <Route path="/Shelter" element={<LoginRegistration userService={userServiceSingleton}/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
