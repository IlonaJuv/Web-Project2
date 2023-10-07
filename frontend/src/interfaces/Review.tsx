interface Review {
    id: string,
    title: string,
    comment: string
    rating: number,
    song : {
        song_name: string,
        thumbnail: string,
        genres: string[],
        album: string,
        artist: string
    }
}

export default Review;