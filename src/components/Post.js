import React from 'react';

class Post extends React.Component{
  constructor(props){
    super(props);
      this.state = {likes: this.props.content.likes};
  }
  like = () => {
    this.setState({likes: this.props.content.likes++});
  }
  render(){
    return(
      <div>
      <p> {this.props.content.date} </p>
      <h2> {this.props.content.title} </h2>
      <br/><br/>
      <p> {this.props.content.main} </p>
      <button onClick = {this.like}> ❤️ Likes: {this.state.likes} </button>
      </div>
    );
  }
}

export default Post;
