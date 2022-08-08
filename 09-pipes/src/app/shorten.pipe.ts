import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    // Default signature:
    // transform(value: any, ...args: any[]) {
    transform(value: any, limit: number) {
        if (value.length > limit) {
            return (<string>value).substring(0, limit) + '...';
        }
        return value;
    }

}