import {Document} from 'mongoose';

interface Song extends Document {
    song_name: string;
    thumbnail: string;
    artist: string;
    album: string;
}

export {Song}