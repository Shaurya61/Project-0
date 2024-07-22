import cloudinary from "cloudinary";
import UploadButton from "./upload-button";
import CloudinaryImage from "./cloudinaryImage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type SearchResult = {
  public_id: string;
};

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>Please Login</div>;
  }
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(2)
    .execute()) as { resources: SearchResult[] };
  console.log(results);
  return (
    <div className="flex gap-8">
      <div className=" border">
        <UploadButton />
        <div className="grid grid-cols-4 gap-4">
          {results.resources.map((results) => (
            <CloudinaryImage
              key={results.public_id}
              src={results.public_id}
              width="400"
              height="300"
              alt="image"

            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
