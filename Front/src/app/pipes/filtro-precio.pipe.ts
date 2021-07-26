import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPrecio'
})
export class FiltroPrecioPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
