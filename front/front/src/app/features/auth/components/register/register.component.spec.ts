import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService : AuthService;
  let authServiceMock : {register : jest.Mock};

  beforeEach(async () => {
    authServiceMock = { register : jest.fn()};
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: AuthService},
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,  
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register with mock', () => {
    //arrange
    const registerRequest : RegisterRequest = {
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'Test',
      password: 'test'
    }
    authServiceMock.register.mockReturnValue(of(void 0));
    component.form.setValue(registerRequest);
    //act
    fixture.detectChanges();
    //asserts
    expect(component.form.valid).toBeTruthy();
    //act
    component.submit();
    //asserts
    expect(component.onError).toBeFalsy();
  })

  it('should register', () => {
    //arrange
    const registerRequest : RegisterRequest = {
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'Test',
      password: 'test'
    }
    component.form.setValue(registerRequest);
    //act
    fixture.detectChanges();
    //asserts
    expect(component.form.valid).toBeTruthy();
    //act
    component.submit();
    //asserts
    expect(component.onError).toBeFalsy();
  })
});
