import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  // console.log("file in Upload image func", file);
  if (!file) return;

  // console.log("file in Upload image func second", file);
  const fileUploaded = await storage.createFile(
    "64736714c18a49be3597",
    ID.unique(),
    file
  );
  // console.log("fileUploaded", fileUploaded);
  return fileUploaded;
};

export default uploadImage;
