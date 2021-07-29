import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroAseguradora'
})
export class FiltroAseguradoraPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultDoctors = [];
    for (const doctor of value) {
      if (doctor.insurance.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultDoctors.push(doctor);
      };
    };
    return resultDoctors;
  }

}
