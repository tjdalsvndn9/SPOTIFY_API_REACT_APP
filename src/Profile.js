import React,{Component} from 'react';
import './Profile.css';

class PROFILE extends Component {

    render() {
        const {artistData, loading} = this.props;
        if(!artistData){
            return <div>{loading}</div>
        }
        return (
            <div className="Profile">
                <div className='ProfileImg'>
                    <img src={artistData.images[1].url}/>
                </div>
                <div className='ProfileInfo'>
                  <h4>{artistData.name}</h4>
                  <p>Type: {artistData.type}</p>
                  <ul>{artistData.genres.map((value,index)=> {
                    value = value !== artistData.genres[artistData.genres.length -1] ? `${value}, `: ` &${value}`
                    return <li key={index}>{value}</li>
                  })}</ul>
                  <p>followers: {artistData.followers.total}</p>
                </div>
            </div>
        );
    }
}
export default PROFILE;
