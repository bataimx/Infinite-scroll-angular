import { Injectable, Injector, Type } from '@angular/core';

@Injectable()
export class LocatorService {
  constructor(private injector: Injector) {}

  get<T>(service: Type<T>): T {
    return this.injector.get(service);
  }

  getService<T>(service: Type<T>): T {
    return this.injector.get(service);
  }
}
