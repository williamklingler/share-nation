import React from 'react';
import firebase from '../firebaseConfig'
import authContext from '../authentication-context.js'

const db = new firebase.firestore();

var som = db.collection('posts').doc('Lf7Knc7WOR8RVvoVcGyb').get()
.then(doc =>{
  if(!doc.exists){
    console.log('no such doc exists');
  }
  else{
    console.log('we sucessfully got the doc');
  }
})
.catch(err => console.log(err));

class Post extends React.Component{
  constructor(props){
    super(props);
      this.state = {likes: this.props.content.likes, liked:false};
  }
  like = () => {
    db.collection('users').doc(this.context.user.uid)
    .update({likedPosts: firebase.firestore.FieldValue.arrayUnion(
      db.collection('posts').doc(this.props.content.postID)
    )});
    this.setState({likes: this.props.content.likes++, liked: true});
  }
  render(){
    var h = {name: 1}
    h.sign = 3;
    return(
      <div>
      <p> {Date(this.props.content.date).toString()} </p>
      <h2> {this.props.content.title} </h2>
      <br/><br/>
      <p> {this.props.content.main} </p>
      <button onClick = {this.like}> ❤️ Likes: {this.state.likes} </button>
      </div>
    );
  }
}
Post.contextType = authContext;

export default Post;
