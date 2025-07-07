import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(
  `*[_type == "startup" && defined(slug.current)] | order(_createdAt desc) {
        _id,
        name,
        slug,
        description,
        _createdAt,
        author -> {
            _id,
            name,
            image,
            bio,},
        views,
        category,
        image
    }`
);
