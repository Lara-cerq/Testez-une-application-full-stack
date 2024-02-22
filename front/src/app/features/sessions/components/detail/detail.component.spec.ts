import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals'; 
import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { SessionApiService } from '../../services/session-api.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../../interfaces/session.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>; 
  let service: SessionService;
  let sessionApiService: SessionApiService;
  let sessionApiServiceMock : {
    delete : jest.Mock,
    participate : jest.Mock,
    unParticipate : jest.Mock,
    detail : jest.Mock};
  let mockRouter : jest.Mocked <Router>;
  let mockActivateRoute : jest.Mocked <ActivatedRoute>;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  }

  beforeEach(async () => {
    mockRouter={ navigate : jest.fn()} as unknown as jest.Mocked <Router>;
    mockActivateRoute = {snapshot : {paramMap : { get: jest.fn().mockReturnValue('1')}}} as unknown as jest.Mocked<ActivatedRoute>;
    sessionApiServiceMock = { 
      delete : jest.fn(),
      participate : jest.fn(),
      unParticipate : jest.fn(),
      detail : jest.fn().mockImplementation(()=> of({users:[0], teacher_id:1} as Session))};
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCardModule
      ],
      declarations: [DetailComponent], 
      providers: [{ provide: SessionService, useValue: mockSessionService }, 
        { provide: SessionApiService, useValue: sessionApiServiceMock },
        { provide : Router, useValue : mockRouter},
        { provide : ActivatedRoute, useValue : mockActivateRoute} ],
    })
      .compileComponents();
      service = TestBed.inject(SessionService);
      sessionApiService= TestBed.inject(SessionApiService);
      fixture = TestBed.createComponent(DetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete', () => {
    //arrange
    component.sessionId="1";
    const navigateSpy = jest.spyOn(mockRouter,'navigate');
    //act
    sessionApiServiceMock.delete.mockReturnValue(of({}));
    component.delete();
    fixture.detectChanges();
    //asserts
    expect(sessionApiServiceMock.delete).toHaveBeenCalledWith('1');
    //expect(mockRouter.navigate).toHaveBeenCalledWith(['sessions']);
   // expect(navigateSpy).toHaveBeenCalledWith(['sessions']);
  });
});

