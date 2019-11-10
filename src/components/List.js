import React, { Component } from 'react';
import axios from 'axios';
import './List.css';
import BottomScrollListener from 'react-bottom-scroll-listener'
import ViewDetails from './ViewDetails';
import SearchBar from './SearchBar';
 
class List extends Component {
    
    personDetails = {};

    state = {
        pageCounter: 1,
        data :[],
        next: null,
        clicked: false,
        filteredArray: [],
        searchTerm: ''
    }

    componentDidMount(){
        axios.get('https://swapi.co/api/people/?page=1')
      .then(res => {
        this.setState({
            data: res.data.results,
            next: res.data.next 
        })
      })
    }

    handleSearch = event => {
        const { data } = this.state;
        const filteredArray = data.filter(item => {
            return item.name.toLowerCase().includes(event.target.value)
        });
        if (event.target.value === '') {
            this.setState({
                filteredArray: [],
                searchTerm: '',
                clicked: false 
            });
        } else {
            this.setState({
                filteredArray,
                searchTerm: event.target.value,
                clicked: false
            });
        }
    }

    clickHandler = (item) => {
        this.personDetails = item;
        this.setState({
            clicked: true
        });
    }
    
    dataItems = () => {
        const { filteredArray, data, searchTerm } = this.state;
        if (filteredArray.length !== 0 && searchTerm !== '') {
            return filteredArray.map((item, index) => (
                <div className="row" key={index} style={{marginTop: 15}}>
                    <div className="column" style={{ marginLeft: 30 }}>
                        <div className="card" onClick={() => this.clickHandler(item)}>
                            <h4 className="card-title">{item.name}</h4>
                            <h5 className="card-subtitle mb-2 text-muted">{item.gender}</h5>
                            <h5 className="card-subtitle mb-2 text-muted">{item.height}</h5>
                        </div>
                    </div>
                </div>
            ));
        } else if (filteredArray.length === 0 && searchTerm !== '') {
            return (
                <div style={{ marginTop: 20 }}>
                    <h3>No results found!</h3>
                </div>
            );
        } else {
            return data.map((item, index) => (
                <div className="row" key={index} style={{marginTop: 15}}>
                    <div className="column" style={{ marginLeft: 30 }}>
                        <div className="card" onClick={() => this.clickHandler(item)}>
                            <h4 className="card-title">{item.name}</h4>
                            <h5 className="card-subtitle mb-2 text-muted">{item.gender}</h5>
                            <h5 className="card-subtitle mb-2 text-muted">{item.height}</h5>
                        </div>
                    </div>
                </div>
            ));
        }     
    }
    

    handleOnDocumentBottom = () => {
        const { next } = this.state;
        if (next !== null) {
            axios.get(next)
            .then(res => {
                this.setState(previousState => ({
                    data: [...previousState.data, ...res.data.results],
                    next: res.data.next
                }));
            })
        }
        return; 
    }

    render() {
        const { clicked } = this.state;
        return (
            <div>
                <SearchBar onHandleSearch={this.handleSearch}/>
                {this.dataItems()}
                <BottomScrollListener onBottom={this.handleOnDocumentBottom} />
                <ViewDetails clicked={clicked} personDetails={this.personDetails}/> 
            </div>
        );
    }
}

export default List;