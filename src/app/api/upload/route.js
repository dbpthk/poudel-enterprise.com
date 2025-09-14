import fs from "fs";
import path from "path";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(process.cwd(), "public/uploads", file.name);

  fs.writeFileSync(filePath, buffer);

  return Response.json({ url: `/uploads/${file.name}` });
}
