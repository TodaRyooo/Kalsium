const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const api = async (path: string, options?: RequestInit) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`APIリクエスト失敗: ${path}`);
  return res.json();
};

export const postReq = (url: string, { arg }: { arg: any }) =>
  api(url, { method: "POST", body: JSON.stringify(arg) });

export const getReq = (path: string) => api(path);
