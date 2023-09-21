import {Request, Response, NextFunction} from 'express';
import got from 'got';
const getDeezer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.params.query)
    const deezerApiUrl = 'https://api.deezer.com/search';
    const query = req.params.query;

    const response = await got(deezerApiUrl, {
      searchParams: {
        q: query, 
      },
      responseType: 'json',
    });
    return res.json(response.body);
    } catch (error) {
        return next(error);
    }
}

export { getDeezer };