import {Document, Types} from 'mongoose';
import {Song} from './song';
import {User} from './user';
interface Review extends Document {
    likes: number;
    song: Song | Types.ObjectId;
    user: User | Types.ObjectId;
    rating: number;
    comment: string;
    date: Date;
}

export {Review}