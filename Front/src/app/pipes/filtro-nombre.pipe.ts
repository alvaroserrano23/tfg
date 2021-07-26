import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroNombre'
})
export class FiltroNombrePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultDoctors = [];
    for (const doctor of value) {
      let nombrecompleto = doctor.name+" "+doctor.surname;
      if (nombrecompleto.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultDoctors.push(doctor);
      };
    };
    return resultDoctors;
  }

}
