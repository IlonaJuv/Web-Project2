import React from 'react';
import { useEffect, useState } from 'react'
import logo from './logo.svg';
import '../css/App.css'

import { useAppDispatch } from '../hooks/appHooks';
import { logout } from '../redux/userReducer';
import { getSongs } from '../hooks/getSongs';
import Song from '../interfaces/Song';
import User from '../interfaces/User';
import { createSong } from '../hooks/createSong';
import { useNavigate } from 'react-router-dom';



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
interface SongCardProps {
  title: string;
  picture: string;
  artist: string;
  album: string;
  api_id: string;
  genres: string[];
  databaseSongs: Song[];
}
const SongCard: React.FC<SongCardProps> = (props) => {
  const { title, picture, artist, album, api_id, genres, databaseSongs } = props;

  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const songExistsInDatabase = (apiId: string, songs: Song[]) => {
    return songs.some((song) => song.api_id.toString() === apiId);
  };

  const getDatabaseSongId = (apiId: string, songs: Song[]) => {
    console.log("songssit: ", songs)
    const foundSong = songs.find((song) => song.api_id.toString() === apiId);
    console.log("foundSong: ", foundSong);
    return foundSong ? foundSong.id : null;
  };

  const handleSongCardClick = () => {
    console.log("api_id of the song: ", api_id);
    console.log("songExistsInDatabase: ", songExistsInDatabase(api_id, databaseSongs));
    console.log("databaseSongs api_id: ", getDatabaseSongId(api_id, databaseSongs));
    if (songExistsInDatabase(api_id, databaseSongs)) {
      console.log("Exists");
      const songId = getDatabaseSongId(api_id, databaseSongs);
      if (songId) {
        // Use the navigate function to navigate to the song page
        navigate(`/song/${songId}`);
      }
    } else {
      createSongAndRedirect();
    }
  };

  const createSongAndRedirect = async () => {
    try {
      const response = await createSong(title, picture, artist, album, ["Test"], api_id);

      if (response.id) {
        // Use the navigate function to navigate to the newly created song
        navigate(`/song/${response.id}`);
      } else {
        console.error('Failed to create the song in the database.');
      }
    } catch (error) {
      console.error('Error creating the song:', error);
    }
  };

  return (
    <div className="song-card" onClick={handleSongCardClick}>
      <h1>{title}</h1>
      <img src={picture} alt={title} />
      <p>Artist: {artist}</p>
    </div>
  );
};

export type DeezerSong = {
  id: string;
  title: string;
  picture: string;
  artist: string;
  album: string;
  api_id: string;
  genres: string[];
};




const SongSearch = () => {


  const [searchQuery, setSearchQuery] = useState("");
  const [songList, setSongList] = useState<DeezerSong[]>([]);
  const [databaseSongs, setDatabaseSongs] = useState<Song[]>([]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
    console.log(songList)
  }
  
  
  useEffect(() => {
    async function fetchSongs() {
      try {
        const songData = await getSongs();
        console.log("biisit databeissis: ", songData)
        setDatabaseSongs(songData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchSongs();
  }, []);
  console.log(databaseSongs)
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_DEEZER_URL}/deezer/${searchQuery}`)
      .then((res) => res.json())
      .then((response) => {
        const result = response.data.map((song: any) => ({
          id: song.id.toString(),
          title: song.title,
          picture: song.album.cover_medium,
          artist: song.artist.name,
          album: song.album.title,
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
                  <SongCard
      title={song.title}
      picture={song.picture}
      album={song.album}
      artist={song.artist}
      api_id={song.id}
      genres={song.genres}
      databaseSongs={databaseSongs}
    ></SongCard>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SongSearch;
