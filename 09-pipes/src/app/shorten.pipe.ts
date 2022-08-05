import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: any, ...args: any[]) {
        if (value.length > 15) {
            return (<string>value).substring(0, 15) + '...';
        }
        return value;
    }

}