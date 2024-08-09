import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getUser } from "@/lib/utils/auth";
import { menv } from "@/lib/utils/menv";
import { v4 as uuidv4 } from 'uuid';

// S3 client configuration
const s3Client = new S3Client({
  region: menv.AWS_S3_REGION,
  credentials: {
    accessKeyId: menv.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: menv.AWS_S3_SECRET_ACCESS_KEY,
  }
});

// Function to upload file to S3
async function uploadFileToS3(file: Buffer, fileName: string, folder: string): Promise<string> {
  const params = {
    Bucket: menv.AWS_S3_BUCKET_NAME,
    Key: `${folder}/${fileName}`,
    Body: file,
    ContentType: "image/jpeg"
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const encodedFileName = encodeURIComponent(fileName);
  const encodedFolderName = encodeURIComponent(folder);
  // Return the URL of the uploaded file
  return `https://${menv.AWS_S3_BUCKET_NAME}.s3.${menv.AWS_S3_REGION}.amazonaws.com/${encodedFolderName}/${encodedFileName}`;
}

// Middleware for authorization
function withAuthorization(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // If authorized, proceed to the handler
    return handler(req);
  };
}

// Main handler function
async function handleFileUpload(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string | null; // Assuming you're sending a category with the form data
    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size should be less than 5MB." }, { status: 400 });
    }

    const folder = category ? `uploads/${category}` : 'uploads/misc';

    const buffer = Buffer.from(await file.arrayBuffer());
    const id = `${uuidv4()}-${file.name}`;
    const fileUrl = await uploadFileToS3(buffer, id, folder);

    return NextResponse.json({ success: true, fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Export the handler with authorization middleware
export const POST = withAuthorization(handleFileUpload);