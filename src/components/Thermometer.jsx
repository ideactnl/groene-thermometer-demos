import React, { useState, useEffect } from 'react';

function Thermometer() {
  const [fillPercentage, setFillPercentage] = useState(0);
  const maxHeight = 300; // Hoogte van de thermometer
  const maxReduction = 200; // Maximum CO2-reductie in kg
  const totalReduction = 85; // Huidige CO2-reductie in kg

  // Bereken het percentage van de totale reductie
  const calculatedFillPercentage = (totalReduction / maxReduction) * 100;

  useEffect(() => {
    setTimeout(() => {
      setFillPercentage(calculatedFillPercentage);
    }, 500);
  }, [calculatedFillPercentage]);

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '250px', height: `${maxHeight + 100}px` }}>
        <svg width="250" height={maxHeight + 100} viewBox={`0 0 250 ${maxHeight + 100}`}>
          {/* Thermometer Outline */}
          <path
            d="M115,350 L115,50 C115,40 135,40 135,50 L135,350 C135,360 115,360 115,350"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          {/* Bulb */}
          <circle cx="125" cy="350" r="20" fill="none" stroke="#000" strokeWidth="2" />

          {/* Fill */}
          <rect
            x="116"
            y={350 - (fillPercentage / 100 * maxHeight)}
            width="18"
            height={(fillPercentage / 100) * maxHeight}
            fill="#4CAF50"
            style={{
              transition: 'height 1s ease-out, y 1s ease-out',
            }}
          />
          <circle
            cx="125"
            cy="350"
            r="19"
            fill="#4CAF50"
            style={{
              transition: 'fill 1s ease-out',
            }}
          />

          {/* Scale markers */}
          {[0, 25, 50, 75, 100].map((mark) => (
            <g key={mark}>
              <line
                x1="135"
                y1={350 - (mark / 100 * maxHeight)}
                x2="145"
                y2={350 - (mark / 100 * maxHeight)}
                stroke="#000"
                strokeWidth="1"
              />
              <text
                x="150"
                y={350 - (mark / 100 * maxHeight)}
                dominantBaseline="middle"
                style={{ fontSize: '12px' }}
              >
                {mark}%
              </text>
            </g>
          ))}
        </svg>

        {/* Text overlay */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '75%',
          transform: 'translate(0, -30%)',
          textAlign: 'left',
          paddingLeft: '20px',
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>Totale CO2 Reductie</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>
            {totalReduction} kg CO2-eq
          </div>
          <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '14px' }}>
            ten opzichte van meest vervuilende scenario
          </p>
        </div>
      </div>
    </div>
  );
}

export default Thermometer;
