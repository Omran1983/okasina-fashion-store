// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC4f1A8FgW7TwStjWQlhfre3vhD7uEtb4A",
  authDomain: "okasina-trading.firebaseapp.com",
  projectId: "okasina-trading",
  storageBucket: "okasina-trading.appspot.com",
  messagingSenderId: "886860905803",
  appId: "1:886860905803:web:219d354e5568b4b01d7cce"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    alert("Login failed: " + error.message);
    return null;
  }
};

export const logout = async () => {
  await signOut(auth);
};

// Products Collection
export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product) => {
  await addDoc(collection(db, 'products'), product);
};

export const updateProduct = async (id, updatedData) => {
  const productDoc = doc(db, 'products', id);
  await updateDoc(productDoc, updatedData);
};

export const deleteProduct = async (id) => {
  const productDoc = doc(db, 'products', id);
  await deleteDoc(productDoc);
};

// Image Upload
export const uploadImage = async (file) => {
  const storageRef = ref(storage, `product-images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => resolve(url));
      }
    );
  });
};