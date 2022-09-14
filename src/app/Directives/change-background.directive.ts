import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBackground]'
})
export class ChangeBackgroundDirective {
  @Input() isCorrect : Boolean=false;
  constructor(private elementRf:ElementRef,private render:Renderer2) { }
  @HostListener('click') answer(){
    console.log(this.isCorrect);
    if(this.isCorrect)
    {
      this.render.setStyle(this.elementRf.nativeElement,'background','green');
      this.render.setStyle(this.elementRf.nativeElement,'color','#fff');
      this.render.setStyle(this.elementRf.nativeElement,'border','2px solid grey');
    }
    else{
      this.render.setStyle(this.elementRf.nativeElement,'background','red');
      this.render.setStyle(this.elementRf.nativeElement,'color','#fff');
      this.render.setStyle(this.elementRf.nativeElement,'border','2px solid grey');
    }
  }

}
