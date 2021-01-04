import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Entity } from './entity.model';
export declare abstract class TkFirebaseService<T extends Entity> {
    protected firestore: AngularFirestore;
    protected abstract basePath: string;
    constructor(firestore: AngularFirestore);
    doc$(id: string): Observable<T>;
    collection$(queryFn?: QueryFn): Observable<T[]>;
    /**
     * We look for the Entity we want to add as well
     * as an Optional Id, which will allow us to set
     * the Entity into a specific Document in the Collection
     */
    add(entity: T, id?: string): Promise<T>;
    /** Our Update method takes the full updated Entity
     * Including it's ID property which it will use to find the
     * Document. This is a Hard Update.
     */
    update(entity: T): Promise<T>;
    delete(id: string): Promise<void>;
}
