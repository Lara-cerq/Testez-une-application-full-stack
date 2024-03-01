import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionService } from './services/session.service';


describe('AppComponent', () => {
  let component: LoginComponent;
  let fixture : ComponentFixture<AppComponent>;
  let fixtureLogin : ComponentFixture<LoginComponent>;
  let app: AppComponent;
  let sessionService : SessionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatToolbarModule, 
        ReactiveFormsModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixtureLogin = TestBed.createComponent(LoginComponent);
    component = fixtureLogin.componentInstance;
    sessionService = TestBed.inject(SessionService);
  });

  it('should create the app', () => {
    
    expect(app).toBeTruthy();
  });

  it('should logged', () => {
    sessionService.$isLogged;
    fixture.detectChanges;
    expect(app.$isLogged).toBeTruthy();
  });

  it('should logout ', () => {
    app.logout();
    fixture.detectChanges();
    expect(app.logout).toBeTruthy;
  });

});
