import { HttpClientModule, HttpContext, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let sessionApiService : SessionApiService;
  const router = {
    navigate: (commands: any[], extras?, options?: any) => {},
    url: '/sessions',
  } as Router;
  let sessionApiServiceMock : {
    all : jest.Mock,
    detail : jest.Mock,
    create : jest.Mock,
    update : jest.Mock,
    delete : jest.Mock,
    participate : jest.Mock,
    unParticipate : jest.Mock,
  };
  let mockActivatedRoute: ActivatedRoute;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }
  const session  = {
    name: "session",
    description: "session",
    date: new Date,
    teacher_id: 1
    // users:[1]
  }

  sessionApiServiceMock = {
    all: jest.fn(() => of([])),
    detail: jest.fn((sessionId: string) => of(session)),
    create: jest.fn(() => of(session)),
    update: jest.fn(() => of(session)),
    delete: jest.fn(() => of(null)),
    participate: jest.fn((_sessionId: string, _userId: string) => of()),
    unParticipate: jest.fn((_sessionId: string, _userId: string) => of()),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule, 
        MatSnackBarModule,
        MatSelectModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide : ActivatedRoute, useValue : mockActivatedRoute},
        { provide: SessionApiService, useValue: sessionApiServiceMock },
        { provide: Router, useValue: router },
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit()', () => {
    component.sessionForm?.setValue(session);

    fixture.detectChanges();
    //assertss
    expect(component.sessionForm?.value).toBeTruthy();
    component.submit();
  });

  it('should update()', () => {
    component.onUpdate= true;

    component.sessionForm?.setValue(session);

    fixture.detectChanges();
    //assertss
    expect(component.sessionForm?.value).toBeTruthy();
    component.submit();

    const snackBarOpenSpy = jest.spyOn(component['matSnackBar'], 'open');
    const routerNavigateSpy = jest.spyOn(component['router'], 'navigate');

    component.submit();
  //asserts
  expect(snackBarOpenSpy).toHaveBeenCalledWith(
    'Session updated !',
    'Close',
    {
      duration: 3_000,
    }
  );
  expect(routerNavigateSpy).toHaveBeenCalledWith(['sessions']);
  });

  
  it('should created()', () => {
    component.onUpdate= false;

    component.sessionForm?.setValue(session);

    fixture.detectChanges();
    //assertss
    expect(component.sessionForm?.value).toBeTruthy();
    component.submit();

    const snackBarOpenSpy = jest.spyOn(component['matSnackBar'], 'open');
    const routerNavigateSpy = jest.spyOn(component['router'], 'navigate');

    component.submit();
  //asserts
  expect(snackBarOpenSpy).toHaveBeenCalledWith(
    'Session created !',
    'Close',
    {
      duration: 3_000,
    }
  );
  expect(routerNavigateSpy).toHaveBeenCalledWith(['sessions']);
  });

});
