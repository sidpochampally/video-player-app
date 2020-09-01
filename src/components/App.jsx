import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import searchYouTube from '../lib/searchYouTube.js';
import Search from './Search.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: exampleVideoData,
      currentVideo: exampleVideoData[0],
      query: ''
    }

    this.handleClickVideoTitle = this.handleClickVideoTitle.bind(this);
    this.getVideosFromYouTube = this.getVideosFromYouTube.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }

  handleClickVideoTitle(video) {
    this.setState({
      currentVideo: video
    });
  }

  componentDidMount() {
    this.getVideosFromYouTube('react tutorials');
  }

  getVideosFromYouTube(query) {
    this.props.searchYouTube({query: query, key: this.props.YOUTUBE_API_KEY}, (videos) => {
      this.setState({videos: videos, currentVideo: videos[0]})
    });
  }

  handleSubmitButton(e) {
    e.preventDefault();
    this.setState({query: e.target.value});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search getVideosFromYouTube={this.getVideosFromYouTube}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo} />
          </div>
          <div className="col-md-5">
            <VideoList
              videos={this.state.videos}
              handleClickVideoTitle={this.handleClickVideoTitle}
            />
          </div>
        </div>
      </div>
    )
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;