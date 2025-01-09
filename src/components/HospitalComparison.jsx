import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'; // Cell toegevoegd

const hospitalData = [
 { id: 'h1', rank: 1, co2Reduction: 15, category: 'other' },
 { id: 'h2', rank: 2, co2Reduction: 22, category: 'other' },
 { id: 'h3', rank: 3, co2Reduction: 25, category: 'average', label: 'Gemiddelde' },
 { id: 'h4', rank: 4, co2Reduction: 28, category: 'self', label: 'Uw ziekenhuis' },
 { id: 'h5', rank: 5, co2Reduction: 30, category: 'other' },
 { id: 'h6', rank: 6, co2Reduction: 35, category: 'other' },
].sort((a, b) => a.co2Reduction - b.co2Reduction);

function HospitalComparison() {
 const [measurementType, setMeasurementType] = useState('0-meting');
 const [hospitalSize, setHospitalSize] = useState('all');

 const stats = {
   total: hospitalData.length,
   average: hospitalData.reduce((acc, curr) => acc + curr.co2Reduction, 0) / hospitalData.length,
   yourPosition: hospitalData.findIndex(h => h.category === 'self') + 1
 };

 return (
   <div style={{ padding: '20px' }}>
     <h2>Vergelijking met andere ziekenhuizen</h2>
     
     <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
       <select 
         value={measurementType}
         onChange={(e) => setMeasurementType(e.target.value)}
         style={{ padding: '5px' }}
       >
         <option value="0-meting">0-meting</option>
         <option value="tussentijds">Tussentijdse meting (6mnd)</option>
         <option value="eind">Eindmeting (18mnd)</option>
       </select>
       <select 
         value={hospitalSize}
         onChange={(e) => setHospitalSize(e.target.value)}
         style={{ padding: '5px' }}
       >
         <option value="all">Alle ziekenhuizen</option>
         <option value="small">Kleine ziekenhuizen</option>
         <option value="medium">Middelgrote ziekenhuizen</option>
         <option value="large">Grote ziekenhuizen</option>
       </select>
     </div>

     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
       <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
         <p style={{ margin: 0, color: '#666' }}>Aantal ziekenhuizen</p>
         <p style={{ margin: '5px 0', fontSize: '20px', fontWeight: 'bold' }}>{stats.total}</p>
       </div>
       <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
         <p style={{ margin: 0, color: '#666' }}>Gemiddelde reductie</p>
         <p style={{ margin: '5px 0', fontSize: '20px', fontWeight: 'bold' }}>{stats.average.toFixed(1)}%</p>
       </div>
       <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
         <p style={{ margin: 0, color: '#666' }}>Uw positie</p>
         <p style={{ margin: '5px 0', fontSize: '20px', fontWeight: 'bold' }}>{stats.yourPosition} van {stats.total}</p>
       </div>
     </div>

     <div style={{ height: '400px' }}>
       <ResponsiveContainer width="100%" height="100%">
         <BarChart data={hospitalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis dataKey="rank" label={{ value: 'Rangschikking', position: 'bottom' }} />
           <YAxis label={{ value: 'CO₂-reductie (%)', angle: -90, position: 'insideLeft' }} />
           <Tooltip 
             formatter={(value) => `${value}%`}
             labelFormatter={(value) => `Positie ${value}`}
           />
           <Bar dataKey="co2Reduction" name="CO₂-reductie">
             {hospitalData.map((entry, index) => (
               <Cell
                 key={`cell-${index}`}
                 fill={entry.category === 'self' ? '#4CAF50' :
                       entry.category === 'average' ? '#FFC107' :
                       '#808080'}
               />
             ))}
           </Bar>
         </BarChart>
       </ResponsiveContainer>
     </div>

     <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
       <div style={{ display: 'flex', alignItems: 'center' }}>
         <div style={{ width: '20px', height: '20px', backgroundColor: '#4CAF50', marginRight: '8px' }}></div>
         <span>Uw ziekenhuis</span>
       </div>
       <div style={{ display: 'flex', alignItems: 'center' }}>
         <div style={{ width: '20px', height: '20px', backgroundColor: '#FFC107', marginRight: '8px' }}></div>
         <span>Gemiddelde</span>
       </div>
       <div style={{ display: 'flex', alignItems: 'center' }}>
         <div style={{ width: '20px', height: '20px', backgroundColor: '#808080', marginRight: '8px' }}></div>
         <span>Andere ziekenhuizen</span>
       </div>
     </div>
   </div>
 );
}

export default HospitalComparison;