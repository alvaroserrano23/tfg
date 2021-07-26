import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultDoctors = [];
    for (const doctor of value) {
      if (doctor.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultDoctors.push(doctor);
      };
    };
    return resultDoctors;
  }


}
