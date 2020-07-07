export const slugify = (slug: string) => {
  if (!slug) {
    return "";
  }
  return slug.replace(/ /g, "-").toLowerCase();
};
