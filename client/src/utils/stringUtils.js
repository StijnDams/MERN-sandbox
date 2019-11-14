export function titleCase(string) {
  const sentence = string.toLowerCase().split(" ");

  const result = sentence.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  result.join(" ");

  return result;
}
