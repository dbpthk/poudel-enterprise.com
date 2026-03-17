import fs from "fs/promises";
import path from "path";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  if (!isAdmin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll("file"); // multiple "file" inputs

    if (!files.length) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const urls = [];

    for (const file of files) {
      if (file && file.name) {
        const bytes = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(uploadDir, file.name);

        await fs.writeFile(filePath, bytes);

        urls.push(`/uploads/${file.name}`);
      }
    }

    return Response.json({ urls }, { status: 200 });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
