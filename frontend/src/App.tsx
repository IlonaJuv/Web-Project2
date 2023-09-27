import React from 'react';
import { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';

const SearchBar = (props: any ) => {
  return (
    <div>
      <form className="col-20 col-lg-auto mb-3 mb-lg-0 me-lg-3 mt-3" role="search" id="search-form" onSubmit={props.handleSearchSubmit}>
        <input type="search" value={props.searchQuery} className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" id="search-input" onChange={props.handleSearchChange}/>
      </form>
    </div>
  );
}

const SongCard = (props: {title: string}) => {
  return(
    <div className="song-card">
      <h1>{props.title}</h1>
    </div>
  )
}


function App() {


  const [searchQuery, setSearchQuery] = useState("");
  const [songList, setSongList] = useState([""]);

  useEffect(() => {
    setSongList(songList)
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
    console.log(songList)
  }
  
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/deezer/${searchQuery}`)
      .then((res) => res.json())
      .then((response) => {
        let result = [""];
        for (let i = 0; i < response.data.length; i++) {
          result.push(response.data[i].title);
        }
        setSongList(result);
        setSearchQuery("");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <div className="App">
      <SearchBar handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} setSearchQuery={setSearchQuery}/>
      <div className="song-list">
        <ul className="list-unstyled">
          {songList.map((song) => (
            <li>
              <SongCard key={song} title={song}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
