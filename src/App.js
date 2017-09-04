import React, { Component } from 'react';
import { Header ,Input,Button,Dimmer, Loader, Image, Segment} from 'semantic-ui-react'
import _ from 'underscore';
import './App.css';
import PROFILE from './Profile'
import GALLERY from './Gallery'

class App extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      artist:'',
      artistData:'',
      loading:'',
      topTracks:''
  }
    this.search = this.search.bind(this);
  }
  onChange(e){
    this.setState({artist:e.target.value})
  }
  onClick(){
    this.search(this.state.artist)
  }
  search(){
    var access_token ='Bearer BQB94ufsByYuERftmv0dPVhIhW9hPa0y981vpPaib5XiyeKv4PTrdzRPATuEv7nh1oBXjCY1AYfCyHDG_rNhC_Uh4ug4Xdzj_1oU1PGhfHZKCPLmpvO3EDmjgR-GNxG1AsxrsTJdAeeaxRwEXmc0IEj7D7Zb4AE&refresh_token=AQDi8GqRiUb7LkTVzvXQwO-SUPI7rJ_vXGlmNAnPkQnEh-1OxpL72v9H3KN0BvKnnXuPrGijpVRdc01m4Q0FxVFRhk4SpTjj-cKgTDJSYsh1aMLG4SeIrjq4joYfqyspMjI'
    const httpheader = {
      'Accept':'application/json',
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':access_token
    }
    const myHeaders = new Headers(httpheader)
    const fetchArtist = async (artist) => {
      let response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`,{
        method:'GET',
        headers:myHeaders,
        mode:'cors',
        cache:'default'
      });
      return await response.json();
     }

     const fetchTopTrack = async (id) => {
       let response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,{
         method:'GET',
         headers:myHeaders,
         mode:'cors',
         cache:'default'
       })
       return await response.json();
     }

     fetchArtist(this.state.artist)
     .then(data => {
       if(data.artists.items.length === 0){
         this.setState({loading:`${this.state.artist} is not found`})
       }
       this.setState({artistData:data.artists.items[0]})
       return data.artists.items[0].id;
     })
     .then(id => {
       fetchTopTrack(id)
       .then(data => this.setState({topTracks:data.tracks}))
       .catch(err => console.warn(err))
     })
     .catch(data => console.warn(data))
  }

  render() {
    return (
      <div className="App">
          <Header as='h1' block>
            Music Master
          </Header>
          <Input
          fluid
          value={this.state.artist}
          placeholder='search an artist'
          onChange={this.onChange.bind(this)}
          />
           <Button content='Click Here'
           onClick={this.onClick.bind(this)}
           />
          <div className='Profile'>
            <PROFILE artistData={this.state.artistData} loading={this.state.loading}/>
          </div>
          <div className='Gallery'>
            <GALLERY topTracks={this.state.topTracks}/>
          </div>
      </div>
    );
  }
}

export default App;
