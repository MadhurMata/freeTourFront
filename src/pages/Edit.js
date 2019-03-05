// import React, { Component } from 'react';
// import tourService from '../lib/tour-service';
// import {Redirect} from 'react-router';

// export default class Edit extends Component {
//   state = {
//     id: this.props.match.params.id,
//     tour: {},
//     name: "",
//     image: "",
//     city: "",
//     description: "",
//     location: "",
//     duration: "",
//     POI: [],
//     redirect: false,
//   }

//   componentDidMount(){
//     this.showTour();
//   }
//   showTour = () => {
//     tourService.showTour(this.state.id)
//     .then((tour) => {
//       this.setState( {
//         tour: tour
//       })
//     })
//   }

//   handleFormSubmit = event => {
//     event.preventDefault();
//     // Pasamos aqui las dos varibles al back end por separada ya que sino el id pasa como objeto.
//     tourService.edit(this.state.id, this.state)
//     .then((data) => {
//       return data
//     })
//     .catch(error => console.log(error.response));
//   };
 
//    handleChange = event => {
//     let { name, value } = event.target;
//     this.setState({ [name]: value });
//   }

//    handleDelete = () => {
//     tourService.delete(this.state.id)
//     .then((data) => {
      
//       this.setState({ redirect: true})
//       console.log('deletennnnn', this.state.redirect)
//       return data

//     })
//     .catch(error => console.log(error.response));
//   };
  

//   render() {
//     const { redirect } = this.state;
//     if(redirect){
//       return <Redirect to='/user/profile'></Redirect>
//     }else{
//     return (
//       <div>
//         <h1>Edit Tour</h1>
//         <div>
//         <form onSubmit={this.handleFormSubmit}>
//           <label >Name:</label>
//           <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder={this.state.tour.name}/>
//           <label >Image:</label>
//           <input type="text" name="image" value={this.state.image} onChange={this.handleChange}/>
//           <label >City:</label>
//           <input type="text" name="city" value={this.state.city} onChange={this.handleChange}/>
//           <label >Description:</label>
//           <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
//           <label >Duration:</label>
//           <input type="text" name="duration" value={this.state.duration} onChange={this.handleChange}/>
//           <label >POI:</label>
//           <input type="text" name="POI" value={this.state.POI} onChange={this.handleChange}/>
//           <button type="submit" value="submit">Add tour</button>
//           <button type="submit" onClick={this.handleDelete}>Delete</button>

//         </form>
//       </div>
        
//       </div>
//     )
//    }
//   }
// }

