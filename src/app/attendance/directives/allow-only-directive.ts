import { Directive, Input, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AUTH_LEVELS } from 'src/app/configs/config.common';
@Directive({
    selector: '[allowOnly]'
})
export class AllowOnlyDirective implements OnInit {
    @Input('allowOnly') allowedRoles: string[];    
    private userRoles;

    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
            this.userRoles = JSON.parse( localStorage.getItem('userRoles') );
    }

    ngOnInit(): void {
        this.applyPermission();
    }

    ngAfterViewInit(): void {
        if( this.allowedRoles.some(val => Object.keys(AUTH_LEVELS).indexOf(val) === -1) ) {
            throw console.error("Error: Not a valid role, Valid roles are: ", Object.keys( AUTH_LEVELS ));            
        }
    }

    private applyPermission(): void {
        const anyMatched = this.allowedRoles.filter(value => -1 !== this.userRoles.indexOf(value))
        let authorized = !!anyMatched.length;

        console.log( anyMatched );
        
        if (authorized) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

}