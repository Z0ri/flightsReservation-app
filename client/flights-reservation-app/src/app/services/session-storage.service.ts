import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  checkExistingItem(item: string): boolean {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(item) !== null; 
    }
    return false;
  }

  getItem(item: string): string | null {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(item);
    }
    return null; 
  }

  setItem(item: string, value: any): void {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(item, value);
    }
  }

  removeItem(item: string): boolean {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(item); 
      return true; 
    }
    return false;
  }
}

