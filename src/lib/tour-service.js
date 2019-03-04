import axios from 'axios';

class TourService {
  constructor() {
    this.tour = axios.create({
      baseURL: 'http://localhost:5000/tour',
      withCredentials: true
    })
  }

  create(tour) {
    return this.tour.post('/create', tour)
      .then(({ data }) => data);
  }

  getTours()  {
    return this.tour.get('/')
    .then(({ data }) => data);
  }

  showTour(id) {
    return this.tour.get(`/showTour/${id}`)
    .then(({ data }) => data);
  }

  edit(id, tour) {
    return this.tour.put(`/${id}/edit`, {tour})
      .then(({ data }) => data);
  }

  comment(id, comment){
    return this.tour.put(`/${id}`, {comment})
      .then(({ data }) => data);
  }

  delete(id) {
    return this.tour.delete(`/${id}/delete`)
      .then(({ data }) => data);
  }

}

const tourService = new TourService();

export default tourService;
