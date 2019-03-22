import axios from 'axios';

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  getMyTours(){
    return this.user.get('/user/profile')
    .then(({ data }) => data);
  }

  showUser(id) {
    return this.user.get(`/user/profile/${id}`)
    .then(({ data }) => data);
  }

  edit(id, user) {
    return this.user.put(`/user/profile/${id}/edit`, {user})
    .then(({ data }) => data);
  }  
}

const userService = new UserService();

export default userService;
