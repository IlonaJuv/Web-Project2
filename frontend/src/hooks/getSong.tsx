import Song from "../interfaces/Song";
import { gql, GraphQLClient } from "graphql-request";
export async function getSong(songId: string): Promise<Song> {
    try {
        const API_URL = process.env.REACT_APP_API_URL
        const songQuery = gql`
            query SongById($songByIdId: ID!) {
                songById(id: $songByIdId) {
                    id
                    song_name
                    thumbnail
                    artist
                    album
                    genres
                    api_id
                }
            }
        `;
        const graphQLClient = new GraphQLClient(API_URL || "", {});
        console.log("bisi id",songId);
        const variables = {
            songByIdId: songId
        };
        const data: any = await graphQLClient.request(songQuery, variables);
        console.log("bisidata",data.songById);
        const song: Song = data.songById;
        return song;

    }catch(error) {
        console.error(error)
    }
    return {} as Song;
}