export function fixAnimalBreedName(name: string) {
  return name
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}
