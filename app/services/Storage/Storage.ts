import get from 'lodash/get';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export type StorageTypes = 'local' | 'sync' | 'managed';

export interface IStorageConfig<S extends object> {
  defaultState?: S;
}

type MayBeArray<T> = T | T[];

export class Storage<S extends object> {
  public readonly defaultState: S | {};

  constructor(
    public readonly storage: chrome.storage.LocalStorageArea | chrome.storage.SyncStorageArea,
    config: IStorageConfig<S>,
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

  public get<R>(keys: MayBeArray<string | number>): Observable<R> {
    return this.getAll().pipe(map(state => {
      const defaultValue = get(this.defaultState, keys);

      return get(state, keys, defaultValue);
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

  public remove(keys: MayBeArray<string>): Observable<void> {
    return new Observable(observable => {
      this.storage.remove(keys, () => {
        observable.next();
        observable.complete();
      });
    });
  }

  public clear(): Observable<void> {
    return new Observable(observable => {
      this.storage.clear(() => {
        observable.next();
        observable.complete();
      });
    });
  }
}
