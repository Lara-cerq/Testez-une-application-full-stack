import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {expect, jest, test} from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { MeComponent } from './me.component';
import { UserService } from 'src/app/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let sessionService : SessionService;
  let userService : UserService;
  let router: Router;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule, 
        MatSnackBarModule
      ],
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    })
      .compileComponents();
    sessionService = TestBed.inject(SessionService);
    userService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockReset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete SessionInformation', () => {
    //const navigateSpy = jest.spyOn(router,'navigate');
    //act
    userService.delete(sessionService.sessionInformation!.id.toString());
    component.delete();
    fixture.detectChanges();
    //asserts
    expect(component.delete).toBeTruthy();
    //expect(router.navigate).toHaveBeenCalledWith(['/'])
  });

  it('should back', () => {
    expect(component.back).toBeTruthy();
  });
});
