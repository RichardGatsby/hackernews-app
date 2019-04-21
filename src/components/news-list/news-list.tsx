import React, { Component } from 'react';
import history from 'history';
import IItem from '../../models/IItem';
import Utils from '../../utilities/utils';
import { Link } from 'react-router-dom';
import './news-list.scss';


interface NewsListProps {
    stories: IItem[];
    showComments(storyId: number): void;
}
export default class NewsList extends Component<NewsListProps, any> {

    // showComments(id: number) {
    //     history.push('/comments/' + id);
    // }
    render() {
        return (
            <ul className="news-list">
                {this.props.stories.map(story =>  (
                    <li key={story.id} className="news-list__item">
                    <p className="news-list__item__index">{story.index}. </p> 
                        <a target='_blank' href={story.url}>{story.title}</a>
                        <p><b>{story.score} </b>points by <b>{story.by}</b> on {Utils.unixTimeToString(story.time)} |
                             <span onClick={() =>this.props.showComments(story.id)}> 
                             {story.kids ? (' ' +story.kids.length + 'comments'):('')}</span></p> 
                    </li>
                ))}
            </ul>
        );
    }
}