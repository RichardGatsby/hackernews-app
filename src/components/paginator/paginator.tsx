import React, { Component } from 'react';
import './paginator.scss';

interface PaginatorProps {
    pageNumber: number;
    decrementPageNumber: () => void;
    incrementPageNumber: () => void;
}

//TODO: Use react-infinite-scroll-component to implement infinite scrolling which would way be cooler
export default class Paginator extends Component<PaginatorProps, any> {
    render() {
        return (
            <div className="paginator">
                <button onClick={this.props.decrementPageNumber} className="paginator__button"
                disabled={this.props.pageNumber === 0} >
                 Prev page
                </button>
                <div className="paginator__info">
                Page: {this.props.pageNumber + 1}:
                News: {this.props.pageNumber * 30} to {this.props.pageNumber * 30 + 30}
                </div>

                <button onClick={this.props.incrementPageNumber} className="paginator__button"
                disabled={this.props.pageNumber == 7} 
                >
                    Next Page
                </button>
            </div>
        );
    }
}