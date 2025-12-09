import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText',
  standalone: true
})
export class ShortTextPipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength: number = 120): string {
    if (!value) return '';
    const trimmed = value.trim();
    if (trimmed.length <= maxLength) return trimmed;
    return trimmed.slice(0, maxLength).trimEnd() + '…';
  }
}
