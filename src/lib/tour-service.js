import axios from 'axios';

class TourService {
  constructor() {
    this.tour = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  create(tour) {
    return this.tour.post('tour/create', tour)
      .then(({ data }) => data);
  }

  getTours()  {
    return this.tour.get('/tour')
    .then(({ data }) => data);
  }

  showTour(id) {
    return this.tour.get(`/tour/showTour/${id}`)
    .then(({ data }) => data);
  }

  edit(id, tour) {
    return this.tour.put(`/${id}/tour/edit`, {tour})
      .then(({ data }) => data);
  }

  delete(id) {
    return this.tour.delete(`/${id}/tour/delete`)
      .then(({ data }) => data);
  }

}

const tourService = new TourService();

export default tourService;
