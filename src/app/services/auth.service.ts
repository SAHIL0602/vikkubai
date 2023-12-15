import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private db: AngularFirestore
  ) {}

  getAllUsersByEmail(e: any) {
    return new Promise<any>((resolve) => {
      this.db
        .collection('User', (ref) => ref.where('email', '==', e))
        .valueChanges()
        .subscribe((users) => resolve(users));
    });
  }
  getAllUsers() {
    return new Promise<any>((resolve) => {
      this.db
        .collection('User')
        .valueChanges()
        .subscribe((users) => resolve(users));
    });
  }
  getChatsByEmail(email: string): Promise<any> {
    return this.db.collection('Chats').doc(email).valueChanges().toPromise();
  }


  getMessagesByEmail(e: any) {
    return new Promise<any>((resolve) => {
      this.db
        .collection('UserChat', (ref) => ref.where('reciever', '==', e))
        .valueChanges()
        .subscribe((users) => resolve(users));
    });
  }
}
