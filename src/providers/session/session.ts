import { Storage } from "@ionic/storage";
import { Injectable } from '@angular/core';

@Injectable()
export class SessionProvider {

  constructor(public storage: Storage){

  }

  create(key: string, obj: any) {
    return this.storage.set(key, obj);
  }

  get(key: string): Promise<any> {
    return this.storage.get(key);
  }

  remove(key: string): Promise<any> {
    return this.storage.remove(key);
  }
}
