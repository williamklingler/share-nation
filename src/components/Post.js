import React from 'react';
import firebase from '../firebaseConfig'
import authContext from '../authentication-context.js'

const db = new firebase.firestore();

/*var som = db.collection('posts').doc('Lf7Knc7WOR8RVvoVcGyb').get()
.then(doc =>{
  if(!doc.exists){
    console.log('no such doc exists');
  }
  else{
    console.log('we sucessfully got the doc');
  }
})
.catch(err => console.log(err));*/



class Post extends React.Component{
  constructor(props, context) {
  super(props, context);
  if (this.props.content.likedUsers.find((element) => {
      return element === this.context.user.uid;
    }) === undefined) {
    this.state = {
      liked: false,
      likes: this.props.content.likes
    };
  } else {
    this.state = {
      liked: true,
      likes: this.props.content.likes
    };
  }
}
like = () => {
  var payload = {
    userIDToken: this.context.userIDToken,
    likedPostID: this.props.content.postID,
    action: 'toggle like on a post'
  };
  fetch('https://us-central1-simp-nation.cloudfunctions.net/postsAPI', { //'https://us-central1-simp-nation.cloudfunctions.net/postsAPI'
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then((res) => {
  });
  if (!this.state.liked) {
    this.setState({
      likes: ++this.state.likes,
      liked: true
    });
  } else {
    this.setState({
      likes: --this.state.likes,
      liked: false
    });
  }
}
  render(){
    var date = new Date(this.props.content.date);
    return(
      <div style = {{backgroundColor: '#fe7400', border: '1px', borderStyle: 'solid', paddingLeft: '3vw'}}>
      <p style = {{padding: '0px', margin: '0px', fontFamily: 'Playfair Display'}}> {date.toLocaleString()} </p>
      <h2 style = {{padding: '10px,10px,10px,0px', margin: '0px',
       color: '#1d00fe', fontFamily: 'Playfair Display'}}> {this.props.content.title} </h2><br/>
      <p style = {{padding: '0px', margin: '0px', color: '#fe0000', fontFamily: 'Montserrat'}}> {this.props.content.main} </p>
      {this.state.liked && <button style = {{backgroundColor: 'pink'}} onClick = {this.like}> ❤️ Likes: {this.state.likes} </button>}
      {!this.state.liked && <button onClick = {this.like}> ❤️ Likes: {this.state.likes} </button>}
      <br/><br/>{/*<hr style ={{margin:0, padding:0}}/>*/}
      </div>
    );
  }
}
Post.contextType = authContext;

export default Post;
