import { Directive, Input, OnInit, OnDestroy, TemplateRef, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AUTH_LEVELS } from 'src/app/configs/config.common';
import { AuthGuard } from 'src/app/shared';
@Directive({
    selector: '[hideIfNot]'
})
export class HideIfNotDirective implements OnInit, AfterViewInit {
    // *hideIfNot="['HR', 'AD']"
    @Input('hideIfNot') allowedRoles: string[];

    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private auth: AuthGuard) {

    }

    ngOnInit(): void {
        // this.applyPermission();
    }

    ngAfterViewInit(): void {
        // if ( this.allowedRoles.some(val => Object.keys(AUTH_LEVELS).indexOf(val) === -1) ) {
        //     throw console.error('Error: Not a valid role, Valid roles are: ', Object.keys( AUTH_LEVELS ));
        // }
    }

    // private applyPermission(): void {
    //     if (this.auth.isAuthorized(this.allowedRoles)) {
    //         this.viewContainer.createEmbeddedView(this.templateRef);
    //     } else {
    //         this.viewContainer.clear();
    //     }
    // }

}
