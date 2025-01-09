import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

const Controls = ({ showPercentages, setShowPercentages }) => (
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
  
  function CombinedChart({ data, showPercentages }) {
    const formatValue = (value, type) => {
      if (showPercentages) {
        return `${value.toFixed(1)}%`;
      }
      return `${value} kg${type === 'co2' ? ' CO₂-eq' : ''}`;
    };
  
    return (
      <div style={{ height: '500px', marginBottom: '20px' }}>
        <h3 style={{ 
          marginBottom: '20px', 
          fontSize: '18px', 
          fontWeight: '500' 
        }}>
          Gecombineerde CO₂ en Afval Impact
        </h3>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 50, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              yAxisId="co2"
              orientation="left"
              label={{ value: showPercentages ? 'CO₂ (%)' : 'CO₂-equivalent (kg)', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="waste"
              orientation="right"
              label={{ value: showPercentages ? 'Afval (%)' : 'Afval (kg)', angle: 90, position: 'insideRight' }}
            />
            <Tooltip 
              formatter={(value, name, props) => {
                const type = props.dataKey.includes('Waste') ? 'waste' : 'co2';
                return formatValue(value, type);
              }}
              labelFormatter={(label) => `Meetmoment: ${label}`}
            />
            <Legend />
            
            {/* CO2 Bars */}
            <Bar 
              yAxisId="co2"
              dataKey={showPercentages ? "disposablePerc" : "disposable"}
              stackId="co2" 
              fill="#000000" 
              name="CO₂ Disposable"
            />
            <Bar 
              yAxisId="co2"
              dataKey={showPercentages ? "reusablePerc" : "reusable"}
              stackId="co2" 
              fill="#808080" 
              name="CO₂ Herbruikbaar"
            />
            <Bar 
              yAxisId="co2"
              dataKey={showPercentages ? "gainPerc" : "gain"}
              stackId="co2" 
              fill="#4CAF50" 
              name="CO₂-winst"
            />
  
            {/* Waste Bars with pattern/transparency */}
            <Bar 
              yAxisId="waste"
              dataKey={showPercentages ? "disposableWastePerc" : "disposableWaste"}
              stackId="waste" 
              fill="#000000" 
              name="Afval Disposable"
              fillOpacity={0.5}
            />
            <Bar 
              yAxisId="waste"
              dataKey={showPercentages ? "reusableWastePerc" : "reusableWaste"}
              stackId="waste" 
              fill="#808080" 
              name="Afval Herbruikbaar"
              fillOpacity={0.5}
            />
            <Bar 
              yAxisId="waste"
              dataKey={showPercentages ? "wasteGainPerc" : "wasteGain"}
              stackId="waste" 
              fill="#4CAF50" 
              name="Afvalreductie"
              fillOpacity={0.5}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  function CO2ImpactCombined() {
    const [showPercentages, setShowPercentages] = useState(false);
  
    return (
      <div style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <Controls showPercentages={showPercentages} setShowPercentages={setShowPercentages} />
        <CombinedChart data={data} showPercentages={showPercentages} />
      </div>
    );
  }
  
  export default CO2ImpactCombined;