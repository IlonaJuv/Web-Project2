import React from 'react';
import { useEffect, useState } from 'react'
import logo from './logo.svg';
import '../css/App.css'

import { useAppDispatch } from '../hooks/appHooks';
import { logout } from '../redux/userReducer';



const SearchBar = (props: any ) => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div>
      <form className="col-20 col-lg-auto mb-3 mb-lg-0 me-lg-3 mt-3" role="search" id="search-form" onSubmit={props.handleSearchSubmit}>
        <input type="search" value={props.searchQuery} className="form-control form-control-dark text-bg-dark" placeholder="Search..."
         aria-label="Search" id="search-input" onChange={props.handleSearchChange}/> 
      </form>
      <button onClick={handleLogOut}> Log Out
        </button>
    </div>
  );
}

const SongCard = (props: {title: string, picture: string, artist: string}) => {
  return (
    <div className="song-card">
      <h1>{props.title}</h1>
      <img src={props.picture} alt={props.title} />
      <p>Artist: {props.artist}</p>
    </div>
  );
};

export type Song = {
  title: string;
  picture: string;
  artist: string;
};




const SongSearch = () => {


  const [searchQuery, setSearchQuery] = useState("");
  const [songList, setSongList] = useState<Song[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
    console.log(songList)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_DEEZER_URL}/deezer/${searchQuery}`)
      .then((res) => res.json())
      .then((response) => {
        const result = response.data.map((song: any) => ({
          title: song.title,
          picture: song.album.cover_medium,
          artist: song.artist.name,
        }));
        setSongList(result);
        setSearchQuery('');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  return (
    <div className="App">
      <SearchBar handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} setSearchQuery={setSearchQuery}/>
      <div className="song-list">
        <ul className="list-unstyled">
          {songList.map((song) => (
            <li>
              <SongCard key={song.title} title={song.title} picture={song.picture} artist={song.artist}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SongSearch;
