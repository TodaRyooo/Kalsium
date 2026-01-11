const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const api = async (path: string, options?: RequestInit) => {
  const tokenRaw = localStorage.getItem("kalsium_token");
  let token = "";

  if (tokenRaw) {
    try {
      const parsed = JSON.parse(tokenRaw);
      token = typeof parsed === "string" ? parsed : tokenRaw;
    } catch {
      token = tokenRaw;
    }
    token = token.replace(/^["']|["']$/g, "").trim();
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || `APIリクエスト失敗: ${path}`);
  }

  if (res.status === 204) return null;
  return res.json();
};

export const getReq = (path: string) => api(path);
export const postReq = <T>(url: string, { arg }: { arg: T }) => api(url, { method: "POST", body: JSON.stringify(arg) });
export const putReq = <T>(url: string, { arg }: { arg: T }) => api(url, { method: "PUT", body: JSON.stringify(arg) });
export const deleteReq = (url: string) => api(url, { method: "DELETE" });
