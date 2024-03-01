import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { expect } from '@jest/globals';

import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';

describe('UserService', () => {
  let service: UserService;
  let httpMock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', async()=> {
    expect(service).toBeTruthy();
  });

  it('should be getById', async () => {
      const user : User = {
      id: 1,
      email: "yoga@studio.com",
      lastName: 'Admin',
      firstName: 'Admin',
      admin: true,
      password: 'test!1234',
      createdAt: new Date
    }

    service.getById("1").subscribe((result) => {
      expect(result.firstName).toBe('Admin');
    })
    const mockRequest = httpMock.expectOne('api/user/1');
    expect(mockRequest.request.method).toEqual('GET');
    mockRequest.flush(user);
  });

  it('should be delete', async () => {
    service.delete("1").subscribe((result) => {
      expect(result.firstName).toBe('');
    });
  });
});
