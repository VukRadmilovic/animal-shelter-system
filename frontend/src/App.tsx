import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserService} from "./services/UserService.ts";
import {PetSuggestionLandingPage} from "./components/PetSuggestionLandingPage/PetSuggestionLandingPage.tsx";
import {PetSuggestionsService} from "./services/PetSuggestionsService.ts";
import {LoginRegistration} from "./components/LoginRegistration/LoginRegistration.tsx";
import {ShelterMain} from "./components/ShelterMain/ShelterMain.tsx";
import {ShelterService} from "./services/ShelterService.ts";
import {ShelterInitialization} from "./components/ShelterInitialization/ShelterInitialization.tsx";

function App() {
 const userServiceSingleton = new UserService();
 const suggestionServiceSingleton = new PetSuggestionsService();
 const shelterServiceSingleton = new ShelterService();
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PetSuggestionLandingPage suggestionService={suggestionServiceSingleton}/>}/>
                <Route path="/Shelter" element={<LoginRegistration userService={userServiceSingleton} shelterService={shelterServiceSingleton}/>}/>
                <Route path="/ShelterMain" element={<ShelterMain shelterService={shelterServiceSingleton}/>}/>
                <Route path="/ShelterInit" element={<ShelterInitialization shelterService={shelterServiceSingleton}/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
