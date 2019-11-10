import React, { Component } from 'react';

class SearchBar extends Component {

    render() {
        const { onHandleSearch } = this.props;

        return (
            <div className="container" style={{width: '100%', marginTop: 15}}>
                <form className="form-inline">
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" onChange={onHandleSearch}/>
                </form>
            </div>
        );
    }
}

export default SearchBar;