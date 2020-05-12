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
  constructor(props,context){
    super(props,context);
      if(this.props.content.likedUsers.find((element) =>{
        return element === this.context.user.uid;
      }) === undefined){
        this.state = {liked: false, likes: this.props.content.likes};
      }
      else{
        this.state = {liked: true, likes: this.props.content.likes};
      }
  }
  like = () => {
  if (!this.state.liked) {
    this.setState({
      likes: ++this.state.likes,
      liked: true
    });
    db.collection('users').doc(this.context.user.uid)
      .update({
        likedPosts: firebase.firestore.FieldValue.arrayUnion(
          this.props.content.postID
        )
      });
    db.collection('posts').doc(this.props.content.postID)
      .update({
        likes: this.state.likes,
        likedUsers: firebase.firestore.FieldValue.arrayUnion(
          this.context.user.uid
        )
      });

  }
  else{
    this.setState({
      likes: --this.state.likes,
      liked: false
    });
    db.collection('users').doc(this.context.user.uid)
      .update({
        likedPosts: firebase.firestore.FieldValue.arrayRemove(
          this.props.content.postID
        )
      });
    db.collection('posts').doc(this.props.content.postID)
      .update({
        likes: this.state.likes,
        likedUsers: firebase.firestore.FieldValue.arrayRemove(
          this.context.user.uid
        )
      });
  }
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
      {this.state.liked && <button style = {{backgroundColor: 'pink'}} onClick = {this.like}> ❤️ Likes: {this.state.likes} </button>}
      {!this.state.liked && <button onClick = {this.like}> ❤️ Likes: {this.state.likes} </button>}
      </div>
    );
  }
}
Post.contextType = authContext;

export default Post;
