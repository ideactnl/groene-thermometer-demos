import React, { useState } from "react";
import CO2ImpactSideBySide from "./components/CO2ImpactSideBySide";
import CO2ImpactCombined from "./components/CO2ImpactCombined";
import HospitalComparison from "./components/HospitalComparison";
import Thermometer from "./components/Thermometer";

function App() {
  const [activePage, setActivePage] = useState('co2-side');

  return (
    <div>
      <h1>Groene Thermometer Demos</h1>
      <div>
        <button onClick={() => setActivePage('co2-side')}>CO₂/Afval Impact - Side by side</button>
        <button onClick={() => setActivePage('co2-combined')}>CO₂/Afval Impact - Gecombineerd</button>
        <button onClick={() => setActivePage('compare')}>Vergelijking</button>
        <button onClick={() => setActivePage('thermo')}>Thermometer</button>
      </div>
      
      {activePage === 'co2-side' && <CO2ImpactSideBySide />}
      {activePage === 'co2-combined' && <CO2ImpactCombined />}
      {activePage === 'compare' && <HospitalComparison />}
      {activePage === 'thermo' && <Thermometer />}
    </div>
  );
}

export default App