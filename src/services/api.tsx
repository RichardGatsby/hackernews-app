import axios from 'axios';
import IItem from '../models/IItem';

const PATH_BASE = 'https://hacker-news.firebaseio.com/v0';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';


const PATH_CUSTOM_API = 'https://localhost:44330/api/'


//
export default class HackerNewsService {


    constructor() {};


    public async getBestStoryIds() : Promise<Array<number>>{
      return await axios.get(`${PATH_BASE}/beststories.json?print=pretty` )
        .then(result => {
            return result.data;
        });
    }

    public async getItem(id: number) : Promise<IItem>{
        return axios.get(`${PATH_BASE}/item/${id}.json?print=pretty` )
          .then(result => {
              return result.data;
          });
      }

    public async getStories(storieIds: Array<number>){
        const storiesPromise = storieIds.map(id => this.getItem(id));
        return Promise.all(storiesPromise);
    }

    public async getComments(commentIds: Array<number>){
        const commentsPromise = commentIds.map(id => this.getItem(id));
        return Promise.all(commentsPromise);
    }

    // public async ahihi(postId: number){
    //     const result = axios.get("https://localhost:44330/api/hackernews/" + postId);
    // }

}

// export default HackerNewsService;