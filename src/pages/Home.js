import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import Navbar from '../components/Navbar';
import Tour from '../components/Tour';
import tourService from '../lib/tour-service'
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';



class Home extends Component {
  state = {
    tours: []
  }

  componentDidMount() {
    this.getTours(); // get data the first time
  }
 
  getTours = () => {
    tourService.getTours()
    // console.log('tours front end', this.state)
    .then(( data ) => {
      this.setState({
        tours: data
      })
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render() {
    const { user } = this.props;
    const { tours } = this.state;
    return (
      <div>
        <Navbar data='data' />
        <h1>Welcome {user.username}</h1>
        <div>
         {tours.map((tour, id) => {
           console.log(tours)
         return (
           <Link to={`/tour/${tour._id}`}>
           <Tour
             key={id}
             image={tour.image}
             name={tour.name}
           /></Link>
          );
          })}
        </div>
      </div>
    )
  }
}

export default withAuth(Home);

// export default class List extends Component {
//   state = {
//     beers: []
//   }
//   componentDidMount() {
//     this.getSomething(); // get data the first time
//   }
 
//   getSomething = () => {
//     api.getBeers()
//       .then(( data ) => {
//         console.log(data);
//         this.setState({
//           beers:data
//         })
//       })
//       .catch((error) => {
//         console.log('error', error);
//       })
//   }
//   render() {
 
//     return (
//       <div>
//           {this.state.beers.map((item, id) => {
//           return (
//             <Beer
//               key={id}
//               image={item.image_url}
//               name={item.name}
//               id={item._id}
//             />
//           );
//         })}
//       </div>
//     )
//   }
//  }