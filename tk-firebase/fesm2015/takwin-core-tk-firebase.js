import { ɵɵdefineInjectable, ɵɵinject, Injectable, Inject, NgModule } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireModule } from '@angular/fire';

// We need a function that will turn our JS Objects into an Object
// that Firestore can work with
function firebaseSerialize(object) {
    return JSON.parse(JSON.stringify(object));
}
class TkFirebaseService {
    constructor(firestore) {
        this.firestore = firestore;
    }
    doc$(id) {
        return this.firestore.doc(`${this.basePath}/${id}`).snapshotChanges()
            .pipe(map(doc => {
            if (doc.payload.exists) {
                const data = doc.payload.data();
                // @ts-ignore
                const payloadId = doc.payload.id;
                return Object.assign({ id: payloadId }, data);
            }
        }));
    }
    collection$(queryFn) {
        return this.firestore.collection(`${this.basePath}`, queryFn).snapshotChanges()
            .pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data();
                // @ts-ignore
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }
    /**
     * We look for the Entity we want to add as well
     * as an Optional Id, which will allow us to set
     * the Entity into a specific Document in the Collection
     */
    add(entity, id) {
        // We want to create a Typed Return of the added Entity
        return new Promise((resolve, reject) => {
            debugger;
            if (id) {
                // If there is an ID Provided, lets specifically set the Document
                this.firestore.collection(this.basePath)
                    .doc(id)
                    .set(firebaseSerialize(entity))
                    .then(ref => {
                    resolve(entity);
                });
            }
            else {
                // If no ID is set, allow Firestore to Auto-Generate one
                debugger;
                this.firestore.collection(this.basePath).add(firebaseSerialize(entity)).then(ref => {
                    debugger;
                    // Let's make sure we return the newly added ID with Model
                    const newEntity = Object.assign({ id: ref.id }, entity);
                    resolve(newEntity);
                });
            }
        });
    }
    /** Our Update method takes the full updated Entity
     * Including it's ID property which it will use to find the
     * Document. This is a Hard Update.
     */
    update(entity) {
        return new Promise((resolve, reject) => {
            debugger;
            this.firestore.collection(this.basePath)
                // @ts-ignore
                .doc(entity.id)
                .set(firebaseSerialize(entity))
                .then(() => {
                debugger;
                resolve(Object.assign({}, entity));
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            this.firestore.collection(this.basePath)
                // @ts-ignore
                .doc(id)
                .delete()
                .then(() => {
                resolve();
            });
        });
    }
}
TkFirebaseService.ɵprov = ɵɵdefineInjectable({ factory: function TkFirebaseService_Factory() { return new TkFirebaseService(ɵɵinject(AngularFirestore)); }, token: TkFirebaseService, providedIn: "root" });
TkFirebaseService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
TkFirebaseService.ctorParameters = () => [
    { type: AngularFirestore, decorators: [{ type: Inject, args: [AngularFirestore,] }] }
];

class TkFirebaseModule {
}
TkFirebaseModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [
                    AngularFirestoreModule,
                ],
                exports: [
                    AngularFireModule,
                    AngularFirestoreModule,
                ]
            },] }
];

/*
 * Public API Surface of tk-firebase
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TkFirebaseModule, TkFirebaseService };
//# sourceMappingURL=takwin-core-tk-firebase.js.map
