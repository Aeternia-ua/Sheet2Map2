import {AfterViewInit, Directive, ElementRef, Output, Renderer2} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Directive({
  selector: '[appDismissable]'
})
export class DismissableDirective implements AfterViewInit {
  @Output()close = new EventEmitter();

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const span = this.renderer.createElement('span');

    const icon = this.renderer.createElement('clr-icon');
    icon.setAttribute('shape', 'close');
    icon.style.margin = '1rem;';
    this.renderer.setStyle(icon, 'cursor', 'pointer');
    this.renderer.appendChild(span, icon);
    this.renderer.appendChild(this.elementRef.nativeElement, span);

    this.renderer.listen(icon, 'click', () => {
      this.close.emit();
      return true;
    });
  }
}
