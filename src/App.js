import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {

  const Cities =[
    {name:'Erbil'},
    {name:'Sulaymaniyah'},
    {name:'Halabja'},
    {name:'Kirkuk'},
    {name:'Kifrī'},
    {name:'Koysinceq'},
    {name:'Dahuk'},
    {name:'Zakho'},
    {name:'Ṟuwandiz'},
    {name:'Jamjamāl'},
    {name:'Samarra'},
    {name:'Baghdad'},
    {name:'Miami'},
    {name:'Dallas'},
    {name:'New york'},
  ]     

      const [data,setdata]=useState('')
      useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Erbil&units=metric&appid=de219e1e9b79346bdf33d5f1cde004f9`).then((response)=>{
          setdata(response.data)
          console.log(data);
      })
      },[])

      const handleChange = (event) => {
      const cityname = event.target.value

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=de219e1e9b79346bdf33d5f1cde004f9`).then((response)=>{
          setdata(response.data)
          console.log(data);
      })
};

  return (
    <div className="App px-5 py-10 flex flex-col justify-between">
      
          <select onChange={handleChange} className='rounded-lg bg-[rgba(121,123,126,0.3)]  ease-in-out duration-300 hover:bg-[rgba(121,123,126,0.5)] text-white  font-bold p-1 text-xl'>
               {Cities.map((city)=>{
                return <option className='bg-[rgba(28,28,29,0.7)] text-white' key={city.name} value={city.name}>{city.name}</option>
              })} 
            </select>
           
           {data &&
            <div  className='text-white'>
                <p className='text-2xl mb-5 text-left'>{data.name}</p>
              <div className='flex'>
                {data.main && <h1 className='text-5xl font-bold mr-4'>{data.main.temp} °C</h1> }
                <div className='flex items-end ml-3'>
                  {data.weather[0] && <p className='text-white font-bold text-2xl'>{data.weather[0].main}</p>}
                  {data.weather[0] && <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>}
                </div>
              </div>
            </div>
            }

          {data.name !== undefined &&
              <div className='bg-[rgba(121,123,126,0.3)] text-white font-bold flex justify-between px-5 py-1 rounded-lg '>
                  <div>
                    <h1>Feels Like</h1>
                  {data.main ?  <h1>{data.main.feels_like} °C</h1> : null}
                  </div>
                  <div>
                    <h1>Humidity</h1>
                    {data.main ? <h1>{data.main.humidity}%</h1> : null}
                  </div>
                  <div>
                    <h1>Wind Speed</h1>
                    {data.main ? <h1>{data.wind.speed} MPH</h1> : null}
                  </div>
              </div>
          }
    </div>
  );
}

export default App;
