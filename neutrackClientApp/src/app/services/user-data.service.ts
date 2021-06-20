import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private theSignUpInfo: any;

  constructor() {
    this.theSignUpInfo = {};
  }

  getSignUpInfo(): object {
    return this.theSignUpInfo;
  }

  addSignUpInfo(key: any, value: any) {
    this.theSignUpInfo[key] = value;
  }
}
