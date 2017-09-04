import React,{Component} from 'react';
import './Gallery.css';

export default class GALLERY extends Component {
  constructor(props){
  	super(props);
  	this.state = {isplaying:false,playingURL:'',audio:null};
    this.checkingAudio = this.checkingAudio.bind(this)
  }
  checkingAudio(previewURL){
    const audio = new Audio(previewURL);
    if(!this.state.isplaying && previewURL != this.state.playingURL){
      if(this.state.audio) this.state.audio.pause()
      audio.play();
      this.setState({isplaying:true,playingURL:previewURL,audio})
    }
     else if(previewURL == this.state.playingURL){
      this.state.audio.pause();
      this.setState({isplaying:false,playingURL:'',audio:null})
    }
  }
    render() {
        const {topTracks} = this.props;
        if(topTracks === ''){
          return <div></div>
        }
        return (
            <div className="GALLERY">
              <div className='Album'>
                {topTracks
                  .sort((a,b)=> {
                    return b.popularity - a.popularity
                  })
                  .map((value,index)=> {
                  return(
                    <div className='img-item'>
                    <img key={index} src={value.album.images[1].url}
                    onClick={() => this.checkingAudio(value.preview_url)}
                    />
                    <figcaption key={99 -index}>{value.name}</figcaption>
                    </div>
                  )
                })}
              </div>
            </div>
        );
    }
}
