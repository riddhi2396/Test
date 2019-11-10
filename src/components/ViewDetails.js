import React, { Component } from 'react';

class ViewDetails extends Component {
    render() {
        const { clicked, personDetails } = this.props;
        return (
            clicked && (
                <div className="card" style={{ position: 'fixed', top: 80, marginLeft: '50%' }}>
                <h6 className="card-title">Hair Color: {personDetails.hair_color}</h6>
                <h6 className="card-title">Skin Color: {personDetails.skin_color}</h6>
                <h6 className="card-title">Eye Color: {personDetails.eye_color}</h6>
                <h6 className="card-title">Birth Year: {personDetails.birth_year}</h6>
                </div>
            )
        );
    }
}

export default ViewDetails;