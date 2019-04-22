import React, { Component } from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import IItem from '../../models/IItem';
import ICommentsState from '../../models/ICommentsState';
import HackerNewsService from '../../services/api';
import Utils from '../../utilities/utils';

import './comments.scss';


class Comments extends Component<RouteComponentProps, ICommentsState> {

    private hackerNewsService: HackerNewsService;


    constructor(props: any) {
        super(props);

        this.hackerNewsService = new HackerNewsService();
        this.loadChildComments = this.loadChildComments.bind(this);
        this.state = this.props.location.state;
        console.log(this.state);
    }

    async loadChildComments(childCommentIds: Array<number>, firstChildIndex: number, secondChildIndex?: number) {
        const comments = await this.hackerNewsService.getComments(childCommentIds);
        this.setComments(comments, firstChildIndex, secondChildIndex);
    }

    setComments(comments: IItem[], firstChildIndex: number, secondChildIndex?: number) {
        let story  = Object.assign({}, this.state.story);
        if (firstChildIndex != null && secondChildIndex == undefined) {
            story.comments[firstChildIndex].comments = comments;

        } else if (firstChildIndex != null && secondChildIndex !== undefined) {
            story.comments[firstChildIndex].comments[secondChildIndex].comments = comments;
        }
        this.setState(state => ({ story: story }))
    }


    //TODO: Fix the "<li> cannot appear as a descendant of <li>"" error => use divs i suppose
    render() {
        return (
            <div className="comments">
                <h2>Comments for story {this.state.story.title}</h2>
                <h3>by {this.state.story.by}</h3>
                <ul>
                    {/* First row of comments */}
                    {this.state.story.comments.map((comment, index) => (
                        <li key={comment.id}>
                            <p><b>{comment.by}</b> on {Utils.unixTimeToString(comment.time)}</p>
                            <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                            <div className="comments__load" onClick={() => this.loadChildComments(comment.kids, index, undefined)}>
                                <i>
                                    {comment.kids ? ('Load ' + comment.kids.length + ' comments') : ('')}
                                </i>
                            </div>
                            {/* Second row of comments */}
                            {comment.comments ? (comment.comments.map((childComment, secondIndex) => (
                                <li key={childComment.id}>
                                    <p><b>{childComment.by}</b> on {Utils.unixTimeToString(childComment.time)}</p>
                                    <div dangerouslySetInnerHTML={{ __html: childComment.text }}></div>
                                    <div className="comments__load" onClick={() => this.loadChildComments(childComment.kids, index, secondIndex)}>
                                        <i>
                                            {childComment.kids ? ('Load ' + childComment.kids.length + ' comments') : ('')}
                                        </i>
                                    </div>

                                    {/* Third row of comments */}
                                    {childComment.comments ? (childComment.comments.map((childComment2, secondIndex) => (
                                        <li key={childComment2.id}>
                                            <p><b>{childComment2.by}</b> on {Utils.unixTimeToString(childComment2.time)}</p>
                                            <div dangerouslySetInnerHTML={{ __html: childComment2.text }}></div>
                                       </li>))) : ('')}
                                </li>
                            ))) : ('')}

                        </li>
                    ))}
                </ul>
            </div >
        )
    }
}

export default Comments;
