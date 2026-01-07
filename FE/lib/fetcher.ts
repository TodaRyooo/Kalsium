const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const fetcher = async (path: string) => {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error("エラーが発生しました");
  return res.json();
};
