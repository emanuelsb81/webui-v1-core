import {Directive, ElementRef, OnInit, AfterViewInit} from "@angular/core";
import {UtilService} from "../service/Util.service";

declare var jQuery: any;

@Directive({
  selector: "[FaqFontColor]",
  providers: [UtilService]
})

export class FaqFontColorDirective {
  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    var $element = jQuery(this.elementRef.nativeElement);

    if (UtilService.widgetProp.faqfontcolor && $element && $element.length) {
      $element[0].style.setProperty("color", UtilService.widgetProp.faqfontcolor, "important");
    }

  }
}
