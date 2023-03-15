import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {

  const [query, setQuery] = useState('pizza');
  const [information, setInformation] = useState([]);
  const [getNewData, setGetNewData] = useState('')

  const fetchMe = () => {
  axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=31dace75&app_key=9cd62b13eb316c80a16402c3ba4d23a8`)
  .then(res => {
    setInformation(res.data.hits);
  })
}

  useEffect(() => {
    fetchMe();
  }, [getNewData]);
  

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setGetNewData(query);
  };

  const onChangeHandler = (e) => {
    setQuery(e.target.value)
  };

  return (
    <div className='screen'>
      <div className='form'>
      <form onSubmit={onSubmitHandler}>
        <input className='input' type='text' value={query} onChange={onChangeHandler} placeholder="Enter Value" />
        <button className='button' type='submit'>Submit</button>        
      </form>
      </div>
      <div className='result' >
        {information.map((item, index) => {
              return(
              
                <div className='data' key={index}>
                <img src={item.recipe.image} alt={item.recipe.label} />
                <p>{item.recipe.label}</p>
                </div>)
            }
          )
        }
      </div>
    </div>
  );
}

export default App;
