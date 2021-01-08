let latency = 200;
let id = 0;
function getId(){
  return ++id;
}

let contacts = [

  // {
  //   id:getId(),
  //   firstName:'Roger',
  //   lastName:'Green',
  //   email:'green@inklings.com',
  //   phoneNumber:'867-5309'
  // }
];
function getValues() {
  fetch('http://localhost:5000/api/GetAll', {
    method: 'GET',
  }).then(resp => resp.json())
  .then(obj => {
    this.contacts = obj;
  });
}
export class WebAPI {
  
  isRequesting = false;
  isSaved=false;
  
  getContactList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = contacts.map(x =>  { return {
          id:x.id,
          firstName:x.firstName,
          lastName:x.lastName,
          email:x.email
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getContactDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = contacts.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveContact(contact){
    this.isRequesting = true;

    return fetch('http://localhost:5000/api/GetAll', {
      method: 'post',
          body: JSON.stringify(contact),
    }).then(resp => resp.json())
    .then(obj => {
      this.isSaved = obj;
    });
//     fetch('http://localhost:5000/api/Save', {
//       method: 'post',
//       body: JSON.stringify(contact),
//       // headers: {
//       //   'Content-Type': 'application/json',
//       //   'Accept': 'application/json'
//       // }
//     })
//     .then(response => response.json())
//     .then(response1 => {
//       this.isSaved = response1.APIKey;
// });

    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(contact));
        let found = contacts.filter(x => x.id == contact.id)[0];

        if(found){
          let index = contacts.indexOf(found);
          contacts[index] = instance;
        }else{
          instance.id = getId();
          contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
