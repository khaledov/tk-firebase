import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/firestore";
// We need a function that will turn our JS Objects into an Object
// that Firestore can work with
function firebaseSerialize(object) {
    return JSON.parse(JSON.stringify(object));
}
export class TkFirebaseService {
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
TkFirebaseService.ɵprov = i0.ɵɵdefineInjectable({ factory: function TkFirebaseService_Factory() { return new TkFirebaseService(i0.ɵɵinject(i1.AngularFirestore)); }, token: TkFirebaseService, providedIn: "root" });
TkFirebaseService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
TkFirebaseService.ctorParameters = () => [
    { type: AngularFirestore, decorators: [{ type: Inject, args: [AngularFirestore,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGstZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9wcm9qZWN0cy90ay1maXJlYmFzZS9zcmMvIiwic291cmNlcyI6WyJsaWIvdGstZmlyZWJhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQWdFLE1BQU0seUJBQXlCLENBQUM7QUFFeEgsT0FBTyxFQUFDLEdBQUcsRUFBTSxNQUFNLGdCQUFnQixDQUFDOzs7QUFJeEMsa0VBQWtFO0FBQ2xFLCtCQUErQjtBQUMvQixTQUFTLGlCQUFpQixDQUFJLE1BQVM7SUFDckMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBTUQsTUFBTSxPQUFnQixpQkFBaUI7SUFFckMsWUFBaUQsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDNUUsQ0FBQztJQUVELElBQUksQ0FBQyxFQUFVO1FBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBSSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxlQUFlLEVBQUU7YUFDckUsSUFBSSxDQUNILEdBQUcsQ0FBRSxHQUFHLENBQUMsRUFBRTtZQUNULElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFPLENBQUM7Z0JBQ3JDLGFBQWE7Z0JBQ2IsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ2pDLHVCQUFTLEVBQUUsRUFBRSxTQUFTLElBQUssSUFBSSxFQUFHO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFFRCxXQUFXLENBQUUsT0FBaUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUU7YUFDakYsSUFBSSxDQUFFLEdBQUcsQ0FBRSxPQUFPLENBQUMsRUFBRTtZQUNsQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBTyxDQUFDO2dCQUN2QyxhQUFhO2dCQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUMzQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFHRDs7OztPQUlHO0lBQ0gsR0FBRyxDQUFDLE1BQVMsRUFBRSxFQUFXO1FBQ3hCLHVEQUF1RDtRQUN2RCxPQUFPLElBQUksT0FBTyxDQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3hDLFFBQVEsQ0FBQTtZQUNSLElBQUksRUFBRSxFQUFFO2dCQUNOLGlFQUFpRTtnQkFFakUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztxQkFDckMsR0FBRyxDQUFDLEVBQUUsQ0FBQztxQkFDUCxHQUFHLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDVixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0wsd0RBQXdEO2dCQUN4RCxRQUFRLENBQUE7Z0JBQ1IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDakYsUUFBUSxDQUFBO29CQUNSLDBEQUEwRDtvQkFDMUQsTUFBTSxTQUFTLG1CQUNiLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUNQLE1BQU0sQ0FDVixDQUFDO29CQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUdEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxNQUFTO1FBQ2QsT0FBTyxJQUFJLE9BQU8sQ0FBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN4QyxRQUFRLENBQUE7WUFDUixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUN4QyxhQUFhO2lCQUNWLEdBQUcsQ0FBSSxNQUFNLENBQUMsRUFBWSxDQUFDO2lCQUMzQixHQUFHLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzlCLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1QsUUFBUSxDQUFBO2dCQUNSLE9BQU8sbUJBQ0YsTUFBTSxFQUNULENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFVO1FBQ2YsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUN4QyxhQUFhO2lCQUNWLEdBQUcsQ0FBSSxFQUFFLENBQUM7aUJBQ1YsTUFBTSxFQUFFO2lCQUNSLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztZQXBHRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQWZPLGdCQUFnQix1QkFrQlIsTUFBTSxTQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0FuZ3VsYXJGaXJlc3RvcmUsIEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uLCBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQsIFF1ZXJ5Rm59IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge21hcCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7RW50aXR5fSBmcm9tICcuL2VudGl0eS5tb2RlbCc7XHJcblxyXG5cclxuLy8gV2UgbmVlZCBhIGZ1bmN0aW9uIHRoYXQgd2lsbCB0dXJuIG91ciBKUyBPYmplY3RzIGludG8gYW4gT2JqZWN0XHJcbi8vIHRoYXQgRmlyZXN0b3JlIGNhbiB3b3JrIHdpdGhcclxuZnVuY3Rpb24gZmlyZWJhc2VTZXJpYWxpemU8VD4ob2JqZWN0OiBUKSB7XHJcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XHJcbn1cclxuXHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUa0ZpcmViYXNlU2VydmljZTxUIGV4dGVuZHMgRW50aXR5PiB7XHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGJhc2VQYXRoOiBzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IoIEBJbmplY3QoQW5ndWxhckZpcmVzdG9yZSkgcHJvdGVjdGVkIGZpcmVzdG9yZTogQW5ndWxhckZpcmVzdG9yZSAgKSB7XHJcbiAgfVxyXG5cclxuICBkb2MkKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLmZpcmVzdG9yZS5kb2M8VD4oYCR7dGhpcy5iYXNlUGF0aH0vJHtpZH1gKS5zbmFwc2hvdENoYW5nZXMoKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoIGRvYyA9PntcclxuICAgICAgICAgIGlmIChkb2MucGF5bG9hZC5leGlzdHMpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGRvYy5wYXlsb2FkLmRhdGEoKSBhcyBUO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWRJZCA9IGRvYy5wYXlsb2FkLmlkO1xyXG4gICAgICAgICAgICByZXR1cm4geyBpZDogcGF5bG9hZElkLCAuLi5kYXRhIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGNvbGxlY3Rpb24kKCBxdWVyeUZuPzogUXVlcnlGbik6IE9ic2VydmFibGU8VFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5maXJlc3RvcmUuY29sbGVjdGlvbjxUPihgJHt0aGlzLmJhc2VQYXRofWAsIHF1ZXJ5Rm4pLnNuYXBzaG90Q2hhbmdlcygpXHJcbiAgICAucGlwZSggbWFwKCBjaGFuZ2VzID0+IHtcclxuICAgICAgICByZXR1cm4gY2hhbmdlcy5tYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRvYy5kYXRhKCkgYXMgVDtcclxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgIGRhdGEuaWQgPSBhLnBheWxvYWQuZG9jLmlkO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBXZSBsb29rIGZvciB0aGUgRW50aXR5IHdlIHdhbnQgdG8gYWRkIGFzIHdlbGxcclxuICAgKiBhcyBhbiBPcHRpb25hbCBJZCwgd2hpY2ggd2lsbCBhbGxvdyB1cyB0byBzZXRcclxuICAgKiB0aGUgRW50aXR5IGludG8gYSBzcGVjaWZpYyBEb2N1bWVudCBpbiB0aGUgQ29sbGVjdGlvblxyXG4gICAqL1xyXG4gIGFkZChlbnRpdHk6IFQsIGlkPzogc3RyaW5nKTogUHJvbWlzZTxUPiB7XHJcbiAgICAvLyBXZSB3YW50IHRvIGNyZWF0ZSBhIFR5cGVkIFJldHVybiBvZiB0aGUgYWRkZWQgRW50aXR5XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBkZWJ1Z2dlclxyXG4gICAgICBpZiAoaWQpIHtcclxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbiBJRCBQcm92aWRlZCwgbGV0cyBzcGVjaWZpY2FsbHkgc2V0IHRoZSBEb2N1bWVudFxyXG5cclxuICAgICAgICB0aGlzLmZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuYmFzZVBhdGgpXHJcbiAgICAgICAgICAuZG9jKGlkKVxyXG4gICAgICAgICAgLnNldChmaXJlYmFzZVNlcmlhbGl6ZShlbnRpdHkpKVxyXG4gICAgICAgICAgLnRoZW4ocmVmID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShlbnRpdHkpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gSWYgbm8gSUQgaXMgc2V0LCBhbGxvdyBGaXJlc3RvcmUgdG8gQXV0by1HZW5lcmF0ZSBvbmVcclxuICAgICAgICBkZWJ1Z2dlclxyXG4gICAgICAgIHRoaXMuZmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5iYXNlUGF0aCkuYWRkKGZpcmViYXNlU2VyaWFsaXplKGVudGl0eSkpLnRoZW4ocmVmID0+IHtcclxuICAgICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgICAvLyBMZXQncyBtYWtlIHN1cmUgd2UgcmV0dXJuIHRoZSBuZXdseSBhZGRlZCBJRCB3aXRoIE1vZGVsXHJcbiAgICAgICAgICBjb25zdCBuZXdFbnRpdHkgPSB7XHJcbiAgICAgICAgICAgIGlkOiByZWYuaWQsXHJcbiAgICAgICAgICAgIC4uLmVudGl0eSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXNvbHZlKG5ld0VudGl0eSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKiBPdXIgVXBkYXRlIG1ldGhvZCB0YWtlcyB0aGUgZnVsbCB1cGRhdGVkIEVudGl0eVxyXG4gICAqIEluY2x1ZGluZyBpdCdzIElEIHByb3BlcnR5IHdoaWNoIGl0IHdpbGwgdXNlIHRvIGZpbmQgdGhlXHJcbiAgICogRG9jdW1lbnQuIFRoaXMgaXMgYSBIYXJkIFVwZGF0ZS5cclxuICAgKi9cclxuICB1cGRhdGUoZW50aXR5OiBUKTogUHJvbWlzZTxUPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBkZWJ1Z2dlclxyXG4gICAgICB0aGlzLmZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuYmFzZVBhdGgpXHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAuZG9jPFQ+KGVudGl0eS5pZCBhcyBzdHJpbmcpXHJcbiAgICAgICAgLnNldChmaXJlYmFzZVNlcmlhbGl6ZShlbnRpdHkpKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgLi4uZW50aXR5LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLmZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuYmFzZVBhdGgpXHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAuZG9jPFQ+KGlkKVxyXG4gICAgICAgIC5kZWxldGUoKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=