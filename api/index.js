const cors = require('cors')({
  origin: true
});

const admin = require('firebase-admin');

let serviceAccount = require('./simp nation-59f2e3b377b6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

exports.postsAPI = (req, res) => {
  console.log('hello-1');
  console.log(req.method);
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  }

  if (req.method === 'GET') {
    console.log("inside of get")
    var postsRef = db.collection('posts');
    var duration = Date.now() - Number(req.query.duration);
    var data = {
      quantity: 1,
      posts: []
    }
    var quant = 0;

    var query = postsRef.where('date', '>=', duration).get()
      .then(snapshot => {

        snapshot.forEach(doc => {
          //res.write("" + JSON.stringify(doc.data()));
          let temp = doc.data();
          temp.postID = doc.id;
          data.posts.push(temp);
          quant++;
        });
        data.quantity = quant;
        res.json(data);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  } else if (req.method === 'POST') {
    console.log("hello0");
    console.log(typeof(req.body));
    var idToken = req.body.userIDToken;
    console.log(idToken);
    console.log("helloZ");
    var action = req.body.action
    console.log('helloY')
    var uid;
    admin.auth().verifyIdToken(idToken)
      .then(function(decodedToken) {
        uid = decodedToken.uid;
        afterDecoded();
        console.log(uid)
        // res.send(''+uid);
      }).catch(function(error) {
        //handle error
      });

    function afterDecoded() {
      console.log("hello1");
      if (action === 'toggle like on a post') {
        console.log("hello2");
        //run the code for liking a post
        //check if the user has liked this post or not
        var likedUsers;
        var liked = false;
        var likes = 0;
        var postID = req.body.likedPostID;
        db.collection('posts').doc(postID).get().then((doc) => {
          if (doc.exists) {
            likedUsers = doc.data().likedUsers;
            likes = doc.data().likes;
            console.log("hello3");
          }
          if (likedUsers.find((element) => {
              return element === uid;
            }) === undefined) {
            liked = false;
          } else {
            liked = true;
          }
          console.log("hello4");
          //now we have all the likedUsers of that post and whether this specific user liked the post
          if (!liked) {
            console.log('!liked');
            likes += 1;
            liked = true;
            db.collection('users').doc(uid)
              .update({
                likedPosts: admin.firestore.FieldValue.arrayUnion(postID)
              });
            db.collection('posts').doc(postID)
              .update({
                likes: likes,
                likedUsers: admin.firestore.FieldValue.arrayUnion(uid)
              });

          } else {
            likes -= 1;
            liked = false;
            console.log("hello5");
            db.collection('users').doc(uid)
              .update({
                likedPosts: admin.firestore.FieldValue.arrayRemove(postID)
              });
            db.collection('posts').doc(postID)
              .update({
                likes: likes,
                likedUsers: admin.firestore.FieldValue.arrayRemove(uid)
              });
          }
        });
      }
    }
    res.send('we did it okay');
  }
};
/*if(req.method === 'GET'){
    var data = firestore.collection('posts').doc()

    res.send("We got your message");
}*/
