import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight('#cfcfcf', 1.05);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight(null);
  }

  highlight(color: string | null, zoom: number = 1) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${zoom})`);
  }

}
