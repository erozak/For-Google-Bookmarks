import get from 'lodash/get';
import defaults from 'lodash/defaults';
import { Many } from 'lodash';
import { from, Observable, observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export type StorageTypes = 'local' | 'sync' | 'managed';

export interface IStorageConfig<S extends object> {
  defaultState?: S;
}

export class Storage<S extends object> {
  public readonly defaultState: S | {};

  constructor(
    public readonly storage: chrome.storage.LocalStorageArea | chrome.storage.SyncStorageArea,
    config: IStorageConfig,
  ) {
    this.defaultState = get(config, 'defaultState', {});
  }

  public getAll(): Observable<S> {
    return new Observable(observer => {
      this.storage.get((state: S) => {
        observer.next(state);
        observer.complete();
      });
    });
  }

  public get<R>(keys: Many<string | number>): Observable<R> {
    return this.getAll().pipe(map(state => {
      const defaultValue = get(this.defaultState, key);

      return get(state, key, defaultValue);
    }));
  }

  public update(modifier: (state: S) => Partial<S>) {
    return this.getAll().pipe(switchMap(state => this.set(modifier(state))));
  }

  public set(state: Partial<S>): Observable<void> {
    return new Observable(observer => {
      this.storage.set(state, () => {
        observer.next();
        observer.complete();
      });
    });
  }

  public remove(keys: Many<string | number>): Observable<void> {
    return new Observable(observable => {
      this.storage.remove(keys, () => {
        observable.next();
        observable.complete();
      });
    });
  }

  public clear(): Observable<void> {
    return new Observable(observable => {
      this.storage.clear(keys, () => {
        observable.next();
        observable.complete();
      });
    });
  }
}
