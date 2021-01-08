export class ApplicantService {
  list=[];
  getValues() {
    fetch('http://localhost:5000/api/GetAll', {
      method: 'GET',
    }).then(resp => resp.json())
    .then(obj => {
      this.list = obj;
    });
  }
}
