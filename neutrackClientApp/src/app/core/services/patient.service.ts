import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { patientsData } from '../constants/patients-static-data';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patients$: BehaviorSubject<Patient[]>;
  patients: Array<Patient> = [];

  constructor() { 
    this.patients$ = new BehaviorSubject<Patient[]>([]);
    this.patients = patientsData;
  }

  getAll() {
    this.patients$.next(this.patients);
  }

  add(patient: Patient) {
    this.patients.push(patient);
    this.patients$.next(this.patients);
  }

  edit(patient: Patient) {
    let findElem = this.patients.find(p => p.id == patient.id);
    findElem.name = patient.name;
    findElem.gender = patient.gender;
    findElem.age = patient.age;
    findElem.email = patient.email;
    this.patients$.next(this.patients);
  }

  remove(id: number) {
   
    this.patients = this.patients.filter(p => {
      return p.id != id
    });

    this.patients$.next(this.patients);
  }
}
