import React from 'react';

export function ChooseYear(props){

  return(
          <div className="chose-year">
            {props.modelCode ? (
              <select 
                value={props.value} 
                onChange={props.onChange}>
                  <option value="">Select a year</option>
                  
                  {props.years.map(year => (
                    <option 
                      key={`yearOption-${year.codigo}`} 
                      value={year.codigo}
                    >
                      {year.nome}
                    </option>
                  ))}
              </select>
            ): null}
          </div>
  )
}




