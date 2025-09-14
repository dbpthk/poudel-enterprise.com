import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("File uploaded:", file.url);
      return { url: file.url }; // must return object
    }
  ),
};

export default ourFileRouter;
