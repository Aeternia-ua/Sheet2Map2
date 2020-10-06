import {Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import {ConnectionPositionPair, FlexibleConnectedPositionStrategy, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {AbstractControl, NgControl} from '@angular/forms';
import {fromEvent, Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {TemplatePortal} from '@angular/cdk/portal';

@Directive({
  selector: '[appAutocomplete]'
})

export class AutocompleteDirective implements OnInit, OnDestroy {
  @Input() appAutocomplete: AutocompleteComponent;
  private overlayRef: OverlayRef;
  private destroy$ = new Subject();

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
    private vcr: ViewContainerRef,
    private overlay: Overlay
  ) {
  }

  get control(): AbstractControl {
    return this.ngControl.control;
  }

  ngOnInit(): void {
    fromEvent(this.origin, 'focus').pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.openDropdown();

      this.appAutocomplete.optionsClick()
        .pipe(takeUntil(this.overlayRef.detachments()))
        .subscribe(( value: string ) => {
          this.control.setValue(value);
          this.close();
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDropdown(): void {
    this.overlayRef = this.overlay.create({
      width: this.origin.offsetWidth,
      maxHeight: 40 * 3,
      backdropClass: '',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition()
    });

    const template = new TemplatePortal(this.appAutocomplete.rootTemplate, this.vcr);
    this.overlayRef.attach(template);

    overlayClickOutside(this.overlayRef, this.origin).subscribe(() => this.close());
  }

  private close(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  private getOverlayPosition(): FlexibleConnectedPositionStrategy {
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' }
      ),
      new ConnectionPositionPair(
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'bottom' }
      )
    ];

    return this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }

  get origin(): HTMLElement {
    return this.host.nativeElement;
  }
}

export function overlayClickOutside(overlayRef: OverlayRef, origin: HTMLElement): Observable<MouseEvent> {
  return fromEvent<MouseEvent>(document, 'click')
    .pipe(
      filter(event => {
        const clickTarget = event.target as HTMLElement;
        const notOrigin = clickTarget !== origin; // the input
        const notOverlay = !!overlayRef && (overlayRef.overlayElement.contains(clickTarget) === false); // the autocomplete
        return notOrigin && notOverlay;
      }),
      takeUntil(overlayRef.detachments())
    );
}

