function capitalizeWords(input: string): string {
  return input
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
}

const example = "PAN advance";
console.log(capitalizeWords(example));
