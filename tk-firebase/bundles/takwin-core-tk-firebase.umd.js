(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/fire/firestore'), require('rxjs/operators'), require('@angular/fire')) :
    typeof define === 'function' && define.amd ? define('@takwin-core/tk-firebase', ['exports', '@angular/core', '@angular/fire/firestore', 'rxjs/operators', '@angular/fire'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['takwin-core'] = global['takwin-core'] || {}, global['takwin-core']['tk-firebase'] = {}), global.ng.core, global.ng.fire.firestore, global.rxjs.operators, global.ng.fire));
}(this, (function (exports, i0, i1, operators, fire) { 'use strict';

    // We need a function that will turn our JS Objects into an Object
    // that Firestore can work with
    function firebaseSerialize(object) {
        return JSON.parse(JSON.stringify(object));
    }
    var TkFirebaseService = /** @class */ (function () {
        function TkFirebaseService(firestore) {
            this.firestore = firestore;
        }
        TkFirebaseService.prototype.doc$ = function (id) {
            return this.firestore.doc(this.basePath + "/" + id).snapshotChanges()
                .pipe(operators.map(function (doc) {
                if (doc.payload.exists) {
                    var data = doc.payload.data();
                    // @ts-ignore
                    var payloadId = doc.payload.id;
                    return Object.assign({ id: payloadId }, data);
                }
            }));
        };
        TkFirebaseService.prototype.collection$ = function (queryFn) {
            return this.firestore.collection("" + this.basePath, queryFn).snapshotChanges()
                .pipe(operators.map(function (changes) {
                return changes.map(function (a) {
                    var data = a.payload.doc.data();
                    // @ts-ignore
                    data.id = a.payload.doc.id;
                    return data;
                });
            }));
        };
        /**
         * We look for the Entity we want to add as well
         * as an Optional Id, which will allow us to set
         * the Entity into a specific Document in the Collection
         */
        TkFirebaseService.prototype.add = function (entity, id) {
            var _this = this;
            // We want to create a Typed Return of the added Entity
            return new Promise(function (resolve, reject) {
                debugger;
                if (id) {
                    // If there is an ID Provided, lets specifically set the Document
                    _this.firestore.collection(_this.basePath)
                        .doc(id)
                        .set(firebaseSerialize(entity))
                        .then(function (ref) {
                        resolve(entity);
                    });
                }
                else {
                    // If no ID is set, allow Firestore to Auto-Generate one
                    debugger;
                    _this.firestore.collection(_this.basePath).add(firebaseSerialize(entity)).then(function (ref) {
                        debugger;
                        // Let's make sure we return the newly added ID with Model
                        var newEntity = Object.assign({ id: ref.id }, entity);
                        resolve(newEntity);
                    });
                }
            });
        };
        /** Our Update method takes the full updated Entity
         * Including it's ID property which it will use to find the
         * Document. This is a Hard Update.
         */
        TkFirebaseService.prototype.update = function (entity) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                debugger;
                _this.firestore.collection(_this.basePath)
                    // @ts-ignore
                    .doc(entity.id)
                    .set(firebaseSerialize(entity))
                    .then(function () {
                    debugger;
                    resolve(Object.assign({}, entity));
                });
            });
        };
        TkFirebaseService.prototype.delete = function (id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.firestore.collection(_this.basePath)
                    // @ts-ignore
                    .doc(id)
                    .delete()
                    .then(function () {
                    resolve();
                });
            });
        };
        return TkFirebaseService;
    }());
    TkFirebaseService.ɵprov = i0.ɵɵdefineInjectable({ factory: function TkFirebaseService_Factory() { return new TkFirebaseService(i0.ɵɵinject(i1.AngularFirestore)); }, token: TkFirebaseService, providedIn: "root" });
    TkFirebaseService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    TkFirebaseService.ctorParameters = function () { return [
        { type: i1.AngularFirestore, decorators: [{ type: i0.Inject, args: [i1.AngularFirestore,] }] }
    ]; };

    var TkFirebaseModule = /** @class */ (function () {
        function TkFirebaseModule() {
        }
        return TkFirebaseModule;
    }());
    TkFirebaseModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [],
                    imports: [
                        i1.AngularFirestoreModule,
                    ],
                    exports: [
                        fire.AngularFireModule,
                        i1.AngularFirestoreModule,
                    ]
                },] }
    ];

    /*
     * Public API Surface of tk-firebase
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TkFirebaseModule = TkFirebaseModule;
    exports.TkFirebaseService = TkFirebaseService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=takwin-core-tk-firebase.umd.js.map
