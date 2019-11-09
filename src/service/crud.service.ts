import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private dbb : AngularFireDatabase, private db : AngularFirestore) { 
  }
  getData() {
    return this.db.collection('users').valueChanges()
  }
  setUser(user) {
    console.log(user)
    console.log(User)
    this.db.collection('users').add(user);
  }
}
