const getApiUrl = () => process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";

interface ApiResponse {
  ok: boolean;
  error?: string;
}

interface CountsResponse extends ApiResponse {
  kina: number;
  nikah: number;
}

interface GuestbookItem {
  date: string;
  name: string;
  message: string;
}

interface GuestbookResponse extends ApiResponse {
  items: GuestbookItem[];
}

interface SettingsResponse extends ApiResponse {
  albumUrl: string;
}

async function postToApi(data: Record<string, unknown>): Promise<ApiResponse> {
  const url = getApiUrl();
  if (!url) return { ok: false, error: "API URL not configured" };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function getFromApi<T extends ApiResponse>(action: string): Promise<T> {
  const url = getApiUrl();
  if (!url) return { ok: false, error: "API URL not configured" } as T;

  const res = await fetch(`${url}?action=${action}`, { cache: "no-store" });
  return res.json();
}

export async function submitRSVP(data: {
  name: string;
  contact: string;
  attending_kina: boolean;
  kina_guests: number;
  attending_nikah: boolean;
  nikah_guests: number;
  kids_count: number;
  notes: string;
}) {
  return postToApi({ type: "rsvp", ...data });
}

export async function submitGuestbook(name: string, message: string) {
  return postToApi({ type: "guestbook", name, message });
}

export async function uploadPhoto(
  uploaderName: string,
  fileName: string,
  mimeType: string,
  fileData: string
) {
  return postToApi({ type: "photo", uploader_name: uploaderName, fileName, mimeType, fileData });
}

export async function getCounts() {
  return getFromApi<CountsResponse>("counts");
}

export async function getGuestbookEntries() {
  return getFromApi<GuestbookResponse>("guestbook");
}

export async function getSettings() {
  return getFromApi<SettingsResponse>("settings");
}
