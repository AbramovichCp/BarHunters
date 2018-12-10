import { ActivatedRoute } from "@angular/router";
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Inject } from "@angular/core";
import { InjectionToken } from "@angular/core";
import { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { Subscription } from "rxjs";
// ----------------------------------------------------------------------------------- //

export interface WindowScrollerOptions {
  smooth: boolean;
}

export var WINDOW_SCROLLER_OPTIONS = new InjectionToken<WindowScrollerOptions>("WindowScroller.Options");

export abstract class WindowScroller {
  abstract scrollIntoView(elementRef: ElementRef): void;
}

export class NativeWindowScroller implements WindowScroller {

  private behavior: "auto" | "smooth";
  private timer: any;

  public constructor(@Inject(WINDOW_SCROLLER_OPTIONS) options: WindowScrollerOptions) {

    this.behavior = (options.smooth ? "smooth" : "auto");
    this.timer = null;

  }

  public scrollIntoView(elementRef: ElementRef): void {

    if (this.timer) {
      this.doScroll(elementRef);
    } else {
      this.timer = setTimeout(
        (): void => {
          this.doScroll(elementRef);
        },
        0
      );
    }
  }

  private doScroll(elementRef: ElementRef): void {
    elementRef.nativeElement.scrollIntoView({
      behavior: this.behavior,
      block: "start"
    });
  }
}
// ----------------------------------------------------------------------------------- //

@Directive({
  selector: "[name]",
  inputs: ["name"]
})
export class FragmentTargetDirective implements OnInit, OnDestroy {

  public id: string;
  public name: string;

  private activatedRoute: ActivatedRoute;
  private elementRef: ElementRef;
  private fragmentSubscription: Subscription;
  private windowScroller: WindowScroller;

  constructor(
    activatedRoute: ActivatedRoute,
    elementRef: ElementRef,
    windowScroller: WindowScroller
  ) {

    this.activatedRoute = activatedRoute;
    this.elementRef = elementRef;
    this.windowScroller = windowScroller;

    this.id = null;
    this.fragmentSubscription = null;
    this.name = null;

  }

  public ngOnDestroy(): void {
    (this.fragmentSubscription) && this.fragmentSubscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.fragmentSubscription = this.activatedRoute.fragment.subscribe(
      (fragment: string): void => {
        if (!fragment) {
          return;
        }
        if (
          (fragment !== this.id) &&
          (fragment !== this.name)
        ) {
          return;
        }
        this.windowScroller.scrollIntoView(this.elementRef);
      }
    );
  }
}
// ----------------------------------------------------------------------------------- //

interface ModuleOptions {
  smooth?: boolean;
}

@NgModule({
  exports: [
    FragmentTargetDirective
  ],
  declarations: [
    FragmentTargetDirective
  ]
})
export class FragmentPolyfillModule {
  static forRoot(options?: ModuleOptions): ModuleWithProviders {
    return ({
      ngModule: FragmentPolyfillModule,
      providers: [
        {
          provide: WINDOW_SCROLLER_OPTIONS,
          useValue: {
            smooth: ((options && options.smooth) || false)
          }
        },
        {
          provide: WindowScroller,
          useClass: NativeWindowScroller
        }
      ]
    });
  }
}