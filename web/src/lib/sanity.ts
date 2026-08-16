import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "yn5o3m70",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // true for production if no fresh data needed
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
