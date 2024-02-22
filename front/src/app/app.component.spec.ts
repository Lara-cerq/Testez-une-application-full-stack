import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { LoginRequest } from './features/auth/interfaces/loginRequest.interface';
import { LoginComponent } from './features/auth/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


describe('AppComponent', () => {
  let component: LoginComponent;
  let fixtureLogin : ComponentFixture<LoginComponent>;;
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

    fixtureLogin = TestBed.createComponent(LoginComponent);
    component = fixtureLogin.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  //  it('should login', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;

  //   const loginRequest : LoginRequest = {
  //     email : "yoga@studio.com" ,
  //     password : "test!1234"
  //   }
  //   component.form.setValue(loginRequest);
  //   //act
  //   fixtureLogin.detectChanges();
  //   //arrange
  //   //act
  //   app.$isLogged();
  //   //assert
  //   expect(app.$isLogged).toBeTruthy();
  // });

});
