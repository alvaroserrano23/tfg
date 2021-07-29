import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroValoracion'
})
export class FiltroValoracionPipe implements PipeTransform {

   transform(value: any, arg: any): any {
    var resultDoctors = [];
    for (const doctor of value) {
      resultDoctors.push(doctor);
    }
    if(arg != ''){
      var result = [];
      for (const doctor of value) {
        if (doctor.valoracion_media >= arg) {
          result.push(doctor);
        };
      };
      resultDoctors = result;
    }
    return resultDoctors;
  }

}
