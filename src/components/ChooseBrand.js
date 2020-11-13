import React from 'react';

export function ChooseBrand(props){

  return(
          <div className="chose-brand">
            <select 
              value={props.value} 
              onChange={props.onChange}
            >
              <option value="">Select a brand</option>

              {props.brands.map(brand => (
                <option
                  key={`brandOption-${brand.codigo}`}
                  value={brand.codigo}
                >
                  {brand.nome}
                </option>
              ))}
            </select>
          </div>
  )
}