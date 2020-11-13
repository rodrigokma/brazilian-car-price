import { useEffect, useState } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import './style.css';
import { ChooseBrand } from './ChooseBrand';
import { ChooseModel } from './ChooseModel';
import { ChooseYear } from './ChooseYear';


function App() {
  const [ brands, setBrands ] = useState([]);
  const [ models, setModels ] = useState([]);
  const [ years, setYears ] = useState([]);
  const [ price, setPrice ] = useState([]);
  const [ brandCode, setBrandCode] = useState("");
  const [ modelCode, setModelCode] = useState("");
  const [ yearCode, setYearCode ] = useState("");
  const [ loadingPrices, setLoadingPrices ] = useState(true);


  // useEffect to get motorcycles brands from API 
  useEffect(() => {
    fetch('https://parallelum.com.br/fipe/api/v1/motos/marcas')
      .then(response => response.json())
      .then(response => setBrands(response))
  }, []);

  // useEffect to get the motorcycles models from API
  useEffect(() => {
    if(brandCode){
      fetch(`https://parallelum.com.br/fipe/api/v1/motos/marcas/${brandCode}/modelos`)
        .then(response => response.json())
        .then(response => setModels(response.modelos))
    }
  }, [brandCode]);

  // useEffect to get the motorcycles models years from API
  useEffect(() => {
    if(modelCode){
      fetch(`https://parallelum.com.br/fipe/api/v1/motos/marcas/${brandCode}/modelos/${modelCode}/anos`)
        .then(response => response.json())
        .then(response => setYears(response))
    }
  }, [modelCode]);

  // useEffect to get the motorcycles prices from API
  useEffect(() => {
    if(yearCode){      
      fetch(`https://parallelum.com.br/fipe/api/v1/motos/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`)
        .then(response => response.json())
        .then(response => {
          setPrice(response);
          setLoadingPrices(false);
        })
    }
  }, [yearCode]);


  return (
    <div className="App">
      <div className="all">
        <div className="header">
          <h1>What's your bike price in Brazil?</h1>
        </div>

        <div className="select-infos">

          <ChooseBrand 
            value={brandCode}
            onChange={(e) => setBrandCode(e.target.value)}
            brands={brands}
            models={models}
          />

          <ChooseModel
          brandCode={brandCode}
          value={modelCode}
          models={models}
          onChange={(e) => setModelCode(e.target.value)}
          />

          <ChooseYear
          modelCode={modelCode}
          value={yearCode}
          onChange={(e) => setYearCode(e.target.value)}
          years={years}
          />
          
        </div>
          
        {yearCode ? (
          loadingPrices ? <Loader /> : (
            <div className="final-information">
              <p><strong>Brazilian currency price:</strong> {price.Valor}</p>
              <p><strong>Brand:</strong> {price.Marca}</p>
              <p><strong>Model:</strong> {price.Modelo}</p>
              <p><strong>Year:</strong> {price.AnoModelo}</p>
            </div>
          )
        ) : null }
      </div>
    </div>
  );
}

export default App;