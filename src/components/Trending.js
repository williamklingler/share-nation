import React from 'react'
import Post from './Post.js'
import authContext from '../authentication-context.js'

class Trending extends React.Component{
  constructor(props){
    super(props);
    this.state = {posts:null, postQuantity: 0};
  }
  callPostsAPI (){
    fetch("https://us-central1-simp-nation.cloudfunctions.net/postsAPI?duration="+this.props.duration)
        .then(res => res.json())
        .then((data) => {
          this.setState({ posts: data.posts, postQuantity: data.quantity})
        })
        .catch(console.log)
  }
  componentDidMount(){
    this.callPostsAPI();
  }
  render(){
    let posts = [];
    posts.push(<div key = {-1}></div>);
    for(let i = 0; i < this.state.postQuantity; ++i){
      posts.push(<Post key={i} content = {this.state.posts[i]} />);
    }
    return(
      <div>
    <h1> Trending in the past {this.props.duration/(60*60*1000)} hrs </h1>
    {posts}
  </div>
    );
  }
}
Trending.contextType = authContext;

export default Trending;
