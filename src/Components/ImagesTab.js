import React, { useEffect, useState } from "react";
import ImagesList from "./ImagesList";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ImagesTab = () => {
  const [imagesData, setImagesData] = useState([]);

  const handleFileInput = () => {
    const image = document.getElementById("file-input").files[0];
    if (!image) return;
    const file = new File([image], `${image.name}`);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      getDownloadURL(ref(getStorage(), `images/${file.name}`))
        .then((url) => {
          setImagesData((imagesData) => [
            ...imagesData,
            {
              img: url,
              title: file.name,
              author: "Mayank",
            },
          ]);
        })
        .catch((error) => {
          // Handle any errors
          console.log(error);
        });
    });
  };

  return (
    <div>
      <ImagesList itemData={imagesData} />
      <div>
        <div class="image-upload">
          <label htmlFor="file-input">
            <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png" />
          </label>

          <input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            onChange={() => handleFileInput()}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagesTab;
