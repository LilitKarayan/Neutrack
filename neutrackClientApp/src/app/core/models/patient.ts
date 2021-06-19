export class Patient {
    id?: number;
    name: string;
    gender: string;
    age: number;
    email: string;
  
    constructor(id: number = 0, name: string = '', gender: string = '', age: number = 0, email: string = '') {
      this.id = id;
      this.name = name;
      this.gender = gender;
      this.age = age;
      this.email = email;
    }
  }
  
  