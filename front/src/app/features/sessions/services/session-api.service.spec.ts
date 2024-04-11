import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { Session } from '../interfaces/session.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SessionsService', () => {
  let service: SessionApiService;
  let httpMock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SessionApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get detail session', () => {
      service.detail("1").subscribe((result) => {
      expect(result.name).toBe("yoga");
      })
      const mockRequest = httpMock.expectOne('api/session/1');
      expect(mockRequest.request.method).toEqual('GET');
  });

  
  it('should get delete session', () => {
    service.delete("1").subscribe((result) => {
      expect(result.id).toBe("");
      })
      const mockRequest = httpMock.expectOne('api/session/1');
      expect(mockRequest.request.method).toEqual('DELETE');
  });

  it('should create session', () => {
    const session : Session = {
      id : 1,
      name: 'yoga',
      description: '',
      date: new Date,
      teacher_id: 0,
      users: []
    }
    service.create(session).subscribe((result) => {
      expect(result.name).toBe("yoga");
      })
      const mockRequest = httpMock.expectOne('api/session');
      expect(mockRequest.request.method).toEqual('POST');
      mockRequest.flush(session);
  });
  it('should update session', () => {
    const session : Session = {
      id : 1,
      name: 'yoga',
      description: 'premier essai',
      date: new Date,
      teacher_id: 0,
      users: []
    }
    service.update('1',session).subscribe((result) => {
      expect(result.name).toBe("premier essai");
      })
      const mockRequest = httpMock.expectOne('api/session/1');
      expect(mockRequest.request.method).toEqual('PUT');
      mockRequest.flush(session);
  });
});
