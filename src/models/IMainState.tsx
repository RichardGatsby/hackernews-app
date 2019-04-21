import IItem from './IItem';

export default interface IState {
    storieIds: number[],
    stories: IItem[],
    pageNumber: number,
    postsPerpage: number,
    loading: boolean,
  }