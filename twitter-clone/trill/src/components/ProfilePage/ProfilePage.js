import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./ProfilePage.css";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    image: "",
    phone: "",
    location: "",
    birthday: "",
    age: "",
  });

  const [file, setFile] = useState(null);
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, "users", user.uid); 
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const data = userSnapshot.data();
            setUserData({
              name: data.name || "User",
              image: data.image || "/default-avatar.png",
              phone: data.phone || "",
              location: data.location || "",
              birthday: data.birthday || "",
              age: data.age || "",
            });
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [auth, db]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `profile-pictures/${auth.currentUser.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUserData((prevData) => ({ ...prevData, image: downloadURL }));
          updateUserData("image", downloadURL);
        }
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, userData, { merge: true });
        console.log("User data updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const updateUserData = async (field, value) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, { [field]: value }, { merge: true });
      }
    } catch (error) {
      console.error("Error updating field:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={userData.image} alt="User Avatar" className="profile-image" />
        <h1 className="profile-name">{userData.name}</h1>
      </div>
      <div className="content-area">
        <div className="input-field">
          <label>Username:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-field">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-field">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={userData.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-field">
          <label>Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={userData.birthday}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-field">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={userData.age}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-field">
          <label>Upload Profile Picture:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <button onClick={handleUpload}>Upload</button>
        </div>

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default UserProfile;
