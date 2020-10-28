import {AfterViewInit, Directive, ElementRef, Output, Renderer2} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Directive({
  selector: '[appDismissable]'
})
export class DismissableDirective implements AfterViewInit {
  @Output()close = new EventEmitter();

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
  // this.renderCountBadge();
  this.renderCloseIcon();
  }

  private renderCloseIcon(): void {    // Rendering a 'close' icon to append to the search filter label
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

  // There is no need in this code
  // private renderCountBadge(): void {
  //   const badge = this.renderer.createElement('span');
  //   this.renderer.addClass(badge, 'badge');
  //   const badgeContent = this.renderer.createText('1');
  //   this.renderer.appendChild(badge, badgeContent);
  //   badge.style.margin = '0 .45rem 0 0';
  //   console.log("this.elementRef.nativeElement ", this.elementRef.nativeElement);
  //   this.renderer.insertBefore(this.elementRef.nativeElement, badge, this.elementRef.nativeElement.firstChild);
  //   console.log('badge dom el ', badge);
  // }

}
