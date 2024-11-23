import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserService } from "./services/UserService.ts";
import { PetSuggestionLandingPage } from "./components/PetSuggestionLandingPage/PetSuggestionLandingPage.tsx";
import { PetSuggestionsService } from "./services/PetSuggestionsService.ts";
import { LoginRegistration } from "./components/LoginRegistration/LoginRegistration.tsx";
import { Dashboard } from "./components/Dashboard/Dashboard.tsx";
import { ShelterService } from "./services/ShelterService.ts";
import { ShelterRegistration } from "./components/ShelterRegistration/ShelterRegistration.tsx";

function App() {
  const userServiceSingleton = new UserService();
  const suggestionServiceSingleton = new PetSuggestionsService();
  const shelterServiceSingleton = new ShelterService();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PetSuggestionLandingPage
                suggestionService={suggestionServiceSingleton}
              />
            }
          />
          <Route
            path="/auth"
            element={
              <LoginRegistration
                userService={userServiceSingleton}
                shelterService={shelterServiceSingleton}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard shelterService={shelterServiceSingleton} />}
          />
          <Route
            path="/shelter-registration"
            element={
              <ShelterRegistration shelterService={shelterServiceSingleton} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
