import {AfterViewInit, Directive, ElementRef, Output, Renderer2} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Directive({
  selector: '[appDismissable]'
})
export class DismissableDirective implements AfterViewInit {
  @Output()close = new EventEmitter();
  clickEvent;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const icon = this.renderer.createElement('clr-icon');
    icon.setAttribute('shape', 'close');
    icon.style.margin = '1rem;';
    this.renderer.setStyle(icon, 'margin-left', '0.5rem');
    this.renderer.setStyle(icon, 'margin-right', '-0.25rem');
    this.renderer.setStyle(icon, 'cursor', 'pointer');
    this.renderer.appendChild(this.elementRef.nativeElement, icon);

    this.renderer.listen(icon, 'click', () => {
      this.close.emit();
      return true;
    });
  }

}
