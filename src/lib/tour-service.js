import axios from 'axios';

class TourService {
  constructor() {
    this.tour = axios.create({
      baseURL: 'http://localhost:5000/tour',
      withCredentials: true
    })
  }

  create(tour) {
    return this.tour.post('/create', {tour})
      .then(({ data }) => data);
  }

  showTour(id) {
    return this.tour.get(`/showTour/${id}`)
      .then(({ data }) => data);
  }

  edit(id, tour) {
    console.log(id);
    return this.tour.put(`/${id}/edit`, {tour})
      .then(({ data }) => data);
  }

}

const tourService = new TourService();

export default tourService;
