import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityLevel'
})
export class ActivityLevelPipe implements PipeTransform {

  transform(value: number): string {
    let activityLevel = '';
    switch (value) {
      case 1:
        activityLevel = 'Sedentary';
        break;
      case 2:
        activityLevel = 'Lightly Active';
        break;
      case 3:
        activityLevel = 'Moderately Active';
        break;
      case 4:
        activityLevel = 'Very Active';
        break;
      default:
        activityLevel = 'Inactive';
        break;
    }
    return activityLevel;
  }


}
