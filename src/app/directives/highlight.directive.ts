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

  /**
   * Highlight the element on mouse enter
   */
  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight('#cfcfcf', 1.05);
  }


  /**
   * Remove the highlight on mouse leave
   */
  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('transparent');
  }


  /**
   * 
   * @param color the color used to highlight the hovered element
   * @param zoom the scale of zoom to be used on element to be highlighed
   */
  highlight(color: string | null, zoom: number = 1) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${zoom})`);
  }

}
