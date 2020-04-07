import React from "react";
import axios from "axios";
import "./App.css";


  /* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

class App extends React.Component {
  //initialize state
  constructor() {
    super();
    this.state = {
      name: "",
      userName: "",
      location: "",
      bio: "",
      photoUrl: "",
      blog:"",
    };
  }

  componentDidMount() {
    //get info from github api
    axios
      .get(`https://api.github.com/users/janecyyu`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          location: response.data.location,
          bio: response.data.bio,
          photoUrl: response.data.avatar_url,
          blog:response.data.blog
        });
      })
      .catch((error) => console.log("error: " + error));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({userName:""})
    axios
      .get(`https://api.github.com/users/${this.state.userName}`)
      .then((response) => {
        console.log(this.state.userName)
        this.setState({
          name: response.data.name,
          location: response.data.location,
          bio: response.data.bio,
          photoUrl: response.data.avatar_url,
          blog:response.data.blog
        });
      })
      .catch((error) => console.log("error: " + error));
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      userName: e.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <i className="fa fa-github"></i>
          <h1>Github User Search</h1>
        </header>
        <form className="search-bar">
          <input
            type="text"
            placeholder="Username here"
            onChange={this.handleChange}
            value={this.state.userName}
          />
          <button className="button" onClick={this.handleSubmit}>search</button>
        </form>
        <div className="box">
          <div className="left">
            <img src={this.state.photoUrl} alt="user photo" width="220px" />
          </div>
          <div className="right">
            <h2>{this.state.name}</h2>
            <p>location: {this.state.location}</p>
            <p>blog: <a href={this.state.blog}>{this.state.blog}</a></p>
            <p>bio: {this.state.bio}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
