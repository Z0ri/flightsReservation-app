import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, getFirestore, setDoc } from '@angular/fire/firestore';
import { catchError, from } from 'rxjs';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) { }

  // Create a new document
signUp(newUser: User) {
  createUserWithEmailAndPassword(this.auth, newUser.email, newUser.password)
    .then((userCredential) => {
      const db = getFirestore();
      const user = userCredential.user;
      const userData = {
        password: newUser.password,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      };
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    })
    .catch((error) => {
      console.error("Sign up error:", error); 
      if (error.code === 'auth/email-already-in-use') {
        console.log("Email already exists!");
      } else {
        console.log("Unable to sign up. Error:", error.message); 
      }
    });
}


  login(user: User) {
    signInWithEmailAndPassword(this.auth, user.email, user.password)
    .then((userCredentials) => {
      console.log("Successfully logged in! ", userCredentials);
      this.router.navigate(['/home']);
    }).catch((err) => {
      console.error("Error loggin in: ", err);
    });
  }
  
}
