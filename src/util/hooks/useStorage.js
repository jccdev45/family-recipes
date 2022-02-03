import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { useAuth } from "../contexts";

export function useStorage(file) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!file) return;
    const storageRef = ref(storage, `images/${currentUser.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);

        switch (snap.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
        }
      },
      (e) => {
        switch (e.code) {
          case "storage/unauthorized":
            setError(
              `User doesn't have permission to access the object (code: ${e.code})`
            );
            break;
          case "storage/canceled":
            setError(`User canceled the upload (code: ${e.code})`);
            break;
          case "storage/unknown":
            setError(
              `Unknown error occurred, inspect error.serverResponse (code: ${e.code})`
            );
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setUrl(url));
      }
    );
  }, [file]);

  return { progress, url, error };
}
