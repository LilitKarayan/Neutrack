import { TestBed } from '@angular/core/testing';

import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;
  beforeEach(() => { 
    service = new PatientService(); 
  });


  it('#getAll should return real value', () => {
    service.getAll();
    expect(service.patients$["_value"][0]["name"]).toContain('person 1');
  });

});
