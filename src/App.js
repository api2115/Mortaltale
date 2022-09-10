import Homepage from "./Components/Homepage";
import NormalMode from "./Components/NormalMode";
import EndlessMode from "./Components/EndlessMode";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import "./Style/App.scss"

function App() {
  return (
      <BrowserRouter>
          <div className={"content"} >
              <Routes>
                  <Route exact path="/" element={<Homepage/>}/>
                  <Route exact path="/normalmode" element={<NormalMode/>}/>
                  <Route exact path="/endlessmode" element={<EndlessMode/>}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
