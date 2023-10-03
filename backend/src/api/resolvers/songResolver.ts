import { Song } from "../../interfaces/song";
import songModel from "../models/songModel";

export default {
 Query: {
    songs: async () => {
     try {
        console.log("songs")
        return await songModel.find();
     } catch (error) {
        throw new Error(error);
     }
    },
    songById: async (_parent: undefined, args: {id: string}) => {
     try {
        return await songModel.findById(args.id);
     } catch (error) {
        throw new Error(error);
     }
    },
     },
    Mutation: {
        addSong: async (_parent: undefined, args: Song) => {
        try {
            const newSong = new songModel(args);
            return await newSong.save();
        } catch (error) {
            throw new Error(error);
        }
        },
        updateSong: async (_parent: undefined, args: Song) => {
            return await songModel.findByIdAndUpdate(args.id, args, { new: true });
        },
        deleteSong: async (_parent: undefined, args: {id: string}) => {
            return await songModel.findByIdAndRemove(args.id);
        },
    },
};
