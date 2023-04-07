import './App.css';
import HomePage from "../HomePage/HomePage";
import PlanetInfoPage from "../PlanetInfoPage/PlanetInfoPage"
import NavBar from "../../components/NavBar"
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/PlanetInfo" element={<PlanetInfoPage />} />
      </Routes>
    </main>
  );
}
