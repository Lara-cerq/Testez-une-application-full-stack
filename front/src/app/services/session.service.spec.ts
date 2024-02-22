import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const user : SessionInformation = {
      token: '',
      type: '',
      id: 0,
      username: '',
      firstName: '',
      lastName: '',
      admin: false
    }
    service.logIn(user);
    expect(service.logIn).toBe(false);
  });
});
