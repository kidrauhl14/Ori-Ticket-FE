import { BrowserRouter } from "react-router-dom"
import {RecoilRoot} from 'recoil';
import Router from "@components/Router"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App
