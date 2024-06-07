export function generateUniqueId(): string {
  const timestamp = new Date().getTime().toString();
  const randomNum = Math.floor(Math.random() * 1000).toString();
  return timestamp + randomNum;
}
