import { storage } from "@/appwrite";

const getURL = async (image: Image) => {
  const url = storage.getFilePreview(image.bucketId, image.fieldId);
  return url;
};

export default getURL;
