import React from 'react'
import Post from './Post.js'
import authContext from '../authentication-context.js'

class Trending extends React.Component{
  constructor(props){
    super(props);
    this.state = {posts:null, postQuantity: 0};
  }
  callPostsAPI (){
    fetch("https://us-central1-simp-nation.cloudfunctions.net/postsAPI?duration="+this.props.duration) //"https://us-central1-simp-nation.cloudfunctions.net/postsAPI?duration="
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
      posts.push(<div style = {{padding: '0vw 20vw 0vw 20vw'}}> <Post key={i} content = {this.state.posts[i]} /> </div>);
    }
    // display: 'flex',
    // margin: 'auto', textAlign: 'center'
    return(
      <div  style = {{backgroundColor: '#fe0000'}} >
      <section style = {{backgroundColor: '#fe0000', color: '#1d00fe', fontFamily: 'Playfair Display',
    paddingLeft: '5vw', height: '9.5vh', lineHeight:'8.5vh'}}>
    <h1 style = {{display: 'inline-block', verticalAlign: 'middle',
     lineHeight: 'normal', border: '1px', borderStyle: 'solid', padding: '1.5vh 20.5vh 1.5vh 10.5vh', margin: 0}}>
    Posts from the last {this.props.duration/(60*60*1000)} hrs </h1>
      </section>
      <div style = {{paddingBottom: '5vh'}} >
    {posts}
    </div>
  </div>
    );
  }
}
Trending.contextType = authContext;

export default Trending;
