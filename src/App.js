import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkFrom from './components/ImageLinkFrom/ImageLinkFrom';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';


//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'b6bbb3a92b874660a3100b54b9cc8d7b'
});

const initalState = {
   input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
    constructor() {
      super()
      this.state = initalState;
       
      
    }

    loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }



    
    claculateFaceLocation = (data) => {
console.log(data);
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
     //  debugger;
      console.log(width,height);
      return {
        topBox: clarifaiFace.top_row * width,
        leftBox: clarifaiFace.left_col * height,
        rightBox: width - (clarifaiFace.right_col * width),
        bottomBox: height - (clarifaiFace.bottom_row * height) 
      }
    }

    displayBox = (box) => {
      console.log(box);
     this.setState({box: box});
    }


    onInputChange = (event) => {
     this.setState({input: event.target.value});
  }

  onButtonSubmit = (event) => {

     this.setState({imageUrl:this.state.input});
     console.log(this.state.input);
    
         app.models.predict( Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}));
            })

        }
        this.displayBox(this.claculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }
     onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initalState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
         



    render(){
        const { isSignedIn, imageUrl, route, box } = this.state;

     return(
    <div>
       <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
     { route === 'home'
      ?
     <div>
      <Logo />
      <Rank   name={this.state.user.name}  entries={this.state.user.entries}/> 
      <ImageLinkFrom inputChange ={this.onInputChange } buttonSubmit = {this.onButtonSubmit}/>
      <FaceRecognition box = {box} imageUrls = {imageUrl} />
      </div>
       :
      (<div>
       {route=== 'signin'
             ?
             <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :
             <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
       }
      </div> )
           }
    </div>
       );
   }
}

export default App;
