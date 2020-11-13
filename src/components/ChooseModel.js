import React from 'react';

export function ChooseModel(props){

  return(
          <div className="chose-model">
            {props.brandCode ? (
              <select 
                value={props.value} 
                onChange={props.onChange}
              >
                <option value="">Select a model</option>

                {props.models.map(model => (
                  <option 
                    key={`modelOption-${model.codigo}`} 
                    value={model.codigo}
                  >
                    {model.nome}
                  </option>
                ))}
              </select>
            ): null}
          </div>
  )
}