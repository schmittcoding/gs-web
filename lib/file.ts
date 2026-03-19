export async function fileToBase64(file: File): Promise<string> {
  if (typeof window === "undefined") {
    const buffer = await file.arrayBuffer();
    return Buffer.from(buffer).toString("base64");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
