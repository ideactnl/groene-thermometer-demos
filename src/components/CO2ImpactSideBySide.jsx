import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Meest vervuilende scenario',
    disposable: 300,
    reusable: 0,
    gain: 0,
    disposableWaste: 1000,
    reusableWaste: 0,
    wasteGain: 0,
    totalExams: 1000
  },
  {
    name: '0-meting',
    disposable: 270,
    reusable: 13,
    gain: 17,
    disposableWaste: 900,
    reusableWaste: 50,
    wasteGain: 50,
    totalExams: 1000
  },
  {
    name: 'Tussentijdse meting',
    disposable: 200,
    reusable: 43,
    gain: 57,
    disposableWaste: 650,
    reusableWaste: 200,
    wasteGain: 150,
    totalExams: 1000
  },
  {
    name: 'Eindmeting',
    disposable: 150,
    reusable: 65,
    gain: 85,
    disposableWaste: 500,
    reusableWaste: 300,
    wasteGain: 200,
    totalExams: 1000
  }
].map(item => {
  // Calculate percentages
  const totalCO2 = item.disposable + item.reusable + item.gain;
  const totalWaste = item.disposableWaste + item.reusableWaste + item.wasteGain;
  return {
    ...item,
    disposablePerc: (item.disposable / totalCO2) * 100,
    reusablePerc: (item.reusable / totalCO2) * 100,
    gainPerc: (item.gain / totalCO2) * 100,
    disposableWastePerc: (item.disposableWaste / totalWaste) * 100,
    reusableWastePerc: (item.reusableWaste / totalWaste) * 100,
    wasteGainPerc: (item.wasteGain / totalWaste) * 100
  };
});

const Controls = ({ showPercentages, setShowPercentages, indicator, setIndicator }) => (
  <div style={{
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
    padding: '20px',
    background: '#f5f5f5',
    borderRadius: '8px',
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    }}>
      <label style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>Indicatoren</label>
      <select 
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          background: 'white',
          minWidth: '150px',
          fontSize: '14px',
        }}
        value={indicator}
        onChange={(e) => setIndicator(e.target.value)}
      >
        <option value="co2">CO₂ Impact</option>
        <option value="waste">Afval Impact</option>
        <option value="both">Beide</option>
      </select>
    </div>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    }}>
      <label style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>Eenheid</label>
      <select 
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          background: 'white',
          minWidth: '150px',
          fontSize: '14px',
        }}
        value={showPercentages ? 'percentage' : 'absolute'}
        onChange={(e) => setShowPercentages(e.target.value === 'percentage')}
      >
        <option value="absolute">Absolute waardes</option>
        <option value="percentage">Percentages</option>
      </select>
    </div>
  </div>
);

const ImpactChart = ({ data, isWaste, showPercentages }) => {
  const getDataKeys = () => {
    if (showPercentages) {
      return isWaste 
        ? ['disposableWastePerc', 'reusableWastePerc', 'wasteGainPerc']
        : ['disposablePerc', 'reusablePerc', 'gainPerc'];
    }
    return isWaste 
      ? ['disposableWaste', 'reusableWaste', 'wasteGain']
      : ['disposable', 'reusable', 'gain'];
  };

  const formatValue = (value) => {
    if (showPercentages) {
      return `${value.toFixed(1)}%`;
    }
    return `${value} kg${isWaste ? '' : ' CO₂-eq'}`;
  };

  const [disposable, reusable, gain] = getDataKeys();

  return (
    <div style={{ height: '400px', marginBottom: '20px' }}>
      <h3 style={{ 
        marginBottom: '20px', 
        fontSize: '18px', 
        fontWeight: '500' 
      }}>
        {isWaste ? 'Afval Impact' : 'CO₂ Impact'}
      </h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            label={{ 
              value: showPercentages ? 'Percentage (%)' : (isWaste ? 'Afval (kg)' : 'CO₂-equivalent (kg)'), 
              angle: -90, 
              position: 'insideLeft' 
            }}
          />
          <Tooltip 
            formatter={formatValue}
            labelFormatter={(label) => `Meetmoment: ${label}`}
          />
          <Bar dataKey={disposable} stackId="a" fill="#000000" name="Disposable" />
          <Bar dataKey={reusable} stackId="a" fill="#808080" name="Herbruikbaar" />
          <Bar dataKey={gain} stackId="a" fill="#4CAF50" name={isWaste ? 'Afvalreductie' : 'CO₂-winst'} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

function ImpactVisualization() {
  const [showPercentages, setShowPercentages] = useState(false);
  const [indicator, setIndicator] = useState('both');

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <Controls 
        showPercentages={showPercentages} 
        setShowPercentages={setShowPercentages}
        indicator={indicator}
        setIndicator={setIndicator}
      />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}>
        {(indicator === 'co2' || indicator === 'both') && (
          <ImpactChart data={data} isWaste={false} showPercentages={showPercentages} />
        )}
        {(indicator === 'waste' || indicator === 'both') && (
          <ImpactChart data={data} isWaste={true} showPercentages={showPercentages} />
        )}
      </div>
    </div>
  );
}

export default ImpactVisualization;