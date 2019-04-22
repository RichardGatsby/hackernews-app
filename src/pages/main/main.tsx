import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import NewsList from '../../components/news-list/news-list';
import Paginator from '../../components/paginator/paginator';
import HackerNewsService from '../../services/api';
import IItem from '../../models/IItem';
import IMainState from '../../models/IMainState';

import logo from './logo.svg';
import './main.scss';


class Main extends Component<RouteComponentProps, IMainState> {

  private hackerNewsService: HackerNewsService;

  constructor(props: any) {
    super(props);

    this.hackerNewsService = new HackerNewsService();

    this.state = {
      storieIds: [],
      stories: [],
      pageNumber: 0,
      postsPerpage: 30,
      loading: false,
    };

    //Bind the methods that are going to be passed to child components
    this.incrementPageNumber = this.incrementPageNumber.bind(this);
    this.decrementPageNumber = this.decrementPageNumber.bind(this);
    this.showStoriesByPage = this.showStoriesByPage.bind(this);
    this.showComments = this.showComments.bind(this);

  }

  componentDidMount() {
    this.getBestStoriesIdList();
  }

  async getBestStoriesIdList() {

    //Download the list of best storie Ids
    this.setLoading(true);
    const storieIds = await this.hackerNewsService.getBestStoryIds();
    this.setLoading(false);

    //Update state with the list
    this.setState({ ...this.state, storieIds: storieIds });

    // Now download the actual news posts according to the current page
    this.getStoriesByPageNumber(this.state.pageNumber);
  }

  // Allthough the default storieId list with 200 seems to download pretty fast
  // we better use pagination with a default postPerPage count of 30 for better user experience
  // TODO: Allow user to manually set postsPerPage count
  // TODO: This does not take into account that the "best list" might be updated (it just adds the stories by page number as we go)
  async getStoriesByPageNumber(pageNumber: number) {
    const start = (pageNumber == 0) ? 0 : pageNumber * this.state.postsPerpage;

    if (this.state.stories && this.state.stories.length <= start) {
      let spliceArray = [...this.state.storieIds];
      const storyIdList = spliceArray.splice(start, this.state.postsPerpage);

      this.setLoading(true);
      const stories = await this.hackerNewsService.getStories(storyIdList);
      this.setLoading(false);

      this.setStories(stories);
    }
  }

  //Set state is async so pass a function to prevent accessing wrong state
  setLoading(loading: boolean) {
    this.setState(state => ({ loading: loading }));
  }
  setStories(stories: IItem[]) {
    this.setState(state => ({ stories: state.stories.concat(stories) }))
  }

  decrementPageNumber() {
    if (this.state.pageNumber > 0) {
      //setState is async so use a callback function to make sure state has changed before going forward
      this.setState({ pageNumber: this.state.pageNumber - 1 }, () => {
        //After updating the pagenumber download the stories
        this.getStoriesByPageNumber(this.state.pageNumber);
      });
    }
  }
  incrementPageNumber() {
    if ((this.state.pageNumber + 1) * this.state.postsPerpage < this.state.storieIds.length) {
      //setState is async so use a callback function to make sure state has changed before going forward
      this.setState({ pageNumber: this.state.pageNumber + 1 }, () => {
        //After updating the pagenumber download the stories
        this.getStoriesByPageNumber(this.state.pageNumber);
      });
    }
  }

  showStoriesByPage(): IItem[] {
    const start = (this.state.pageNumber == 0) ? 0 : this.state.pageNumber * this.state.postsPerpage;
    let spliceArray = [...this.state.stories];

    //Add index property to every story to be visible for user
    spliceArray.map((row, index) => { row.index = index + 1; })

    return spliceArray.splice(start, this.state.postsPerpage);
  }


  async showComments(storyId: number) {
    //TODO: In a real application add null validation, but with this current solution it should always return just a one value
    const selectedStory = this.state.stories.filter(row => row.id == storyId)[0];

    //Download the first row of comments here and the rest in comments component if wanted
    this.setLoading(true)
    const comments = await this.hackerNewsService.getComments(selectedStory.kids);
    this.setLoading(false)
    selectedStory.comments = comments;

    this.props.history.push({ pathname: `/comments/`, state: { story: selectedStory } });
  }


  render() {

    //Show loading symbol for the user if loading data
    let content;
    if (this.state.loading) {
      //TODO: Create a real loading component because this is no way acceptable in a real application
      //TODO: Find out what is the equivalent of Angular httpsInterceptors for react
      content = <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
    } else {
      content = <NewsList showComments={(id) => this.showComments(id)} stories={this.showStoriesByPage()} />;
    }

    return (
      <div className="main">
         {content}
         <Paginator pageNumber={this.state.pageNumber} decrementPageNumber={this.decrementPageNumber}
          incrementPageNumber={this.incrementPageNumber} /> 
      </div>
    );
  }
}

export default Main;
