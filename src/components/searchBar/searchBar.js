import React from 'react';
import './searchBar.css';



class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match',
        };
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.sortByOptions = {
            'Best Match': 'best-match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        }; 
    }
    
    getSortByClass(sortByOption) {
        if( this.state.sortBy === sortByOption) {
            return 'active'
        } else {
            return ''
        }
    }
    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption });
    }
    handleTermChange(event) {
        this.setState({ term: event.target.value });
    }
    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    }
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            if(this.state.location) {
                this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            }
        }
    }
    handleSearch(event) {
        if(this.state.term || this.state.location) {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            event.preventDefault();
        }
    }
    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionsValue = this.sortByOptions[sortByOption];
            return <li onClick={this.handleSortByChange.bind(this, sortByOptionsValue)} className={this.getSortByClass(sortByOptionsValue)} key={sortByOptionsValue}>{sortByOption}</li>;
        });
    }
    render() {
        return (
            <div className="SearchBar">
                <span>
                    <h1>Dine Around</h1>
                    <div className="SearchBar-sort-options">
                        <ul>
                            {this.renderSortByOptions()}
                        </ul>
                    </div>
                    <div className="SearchBar-fields">
                        <input onKeyPress={this.handleKeyPress} onChange={this.handleTermChange} placeholder="What are you hungry for?" />
                        <input onKeyPress={this.handleKeyPress} onChange={this.handleLocationChange} placeholder="Where are you located?" />
                    </div>
                    <div className="SearchBar-submit">
                        <button onClick={this.handleSearch}>Let's Go</button>
                    </div>
                </span>
            </div>
        );
    }
}

export default SearchBar;