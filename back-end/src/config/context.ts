import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class Context {
  private map: Map<string, any> = new Map();
  constructor() {}

  getKey(key: ContextKey) {
    return this.map.get(key);
  }

  setKey(key: ContextKey, value: any) {
    this.map.set(key, value);
  }

  getToken() {
    return this.map.get(ContextKey.TOKEN);
  }
  getConsumer() {
    return this.map.get(ContextKey.CONSUMER);
  }
}

export enum ContextKey {
  TOKEN = 'TOKEN',
  CONSUMER = 'CONSUMER',
}
