import axios from 'axios';

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: 'http://localhost:5000/user',
      withCredentials: true
    })
  }


  getMyTours(){
    return this.user.get('/profile')
    .then(({ data }) => data);
  }

  showUser(id) {
    return this.user.get(`/profile/${id}`)
    .then(({ data }) => data);
  }

  edit(id, user) {
    return this.user.put(`/profile/${id}/edit`, {user})
    .then(({ data }) => data);
  }  

}

const userService = new UserService();

export default userService;
