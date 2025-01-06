// src/components/firebase/firestore.js

import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchUsers = async () => {
  try {
    const usersCollection = collection(db, "users"); // Access the "users" collection
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return usersList;
  } catch (error) {
    throw new Error("Failed to fetch users: " + error.message);
  }
};
