import Review from "../interfaces/Review";
import { gql, GraphQLClient } from "graphql-request";
export async function getReviews(userId: string): Promise<Review[]> {
    try {
        const API_URL = process.env.REACT_APP_API_URL
        const loginUserMutation = gql`
            query reviewsByUser($userId: ID!) {
                reviewsByUser(userId: $userId) {
                    id
                    title
                    comment
                    rating
                    song {
                        song_name
                        thumbnail
                        genres
                        album
                        artist
                    }
                }
            }
        `;
        const graphQLClient = new GraphQLClient(API_URL || "", {});
        const variables = {
            userId: userId
        };
        const data: any = await graphQLClient.request(loginUserMutation, variables);
        console.log(data)
        const reviews: Review[] = data.reviewsByUser;
        return reviews;

    }catch(error) {
        console.error(error)
    }
    return {} as Review[];
}