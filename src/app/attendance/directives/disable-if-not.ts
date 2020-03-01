import { Directive, Input, OnInit, HostListener, TemplateRef, ViewContainerRef, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AUTH_LEVELS } from 'src/app/configs/config.common';
import { AuthGuard } from 'src/app/shared';

//  disableIfNot [allowedRoles]="['EMP']"

@Directive({
    selector: '[disableIfNot]'
})
export class DisableIfNotDirective implements OnInit, AfterViewInit {
    @Input() allowedRoles: string[];    
    
    constructor(
        private elm: ElementRef,
        private auth: AuthGuard) {
    }

    ngOnInit(): void {
        
    }

    ngAfterViewInit(): void {
        console.log(this.allowedRoles);
        if( this.allowedRoles.some(val => Object.keys(AUTH_LEVELS).indexOf(val) === -1) ) {
            throw console.error("Error: Not a valid role, Valid roles are: ", Object.keys( AUTH_LEVELS ));            
        }
        this.applyPermission();        
    }

    // @HostListener('click', ['$event']) 
    // onClick($event: Event) {
    //     this.elm.nativeElement.style.pointerEvents = "none";
    //     console.log("host listener called"); // will be called
    //     $event.preventDefault();
    // }

    private applyPermission(): void {
        if (!this.auth.isAuthorized(this.allowedRoles)) {
            this.elm.nativeElement.style.pointerEvents = "none";
            this.elm.nativeElement.classList.add("no-permission");
        }
    }

}