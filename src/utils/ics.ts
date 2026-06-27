import { WeddingEvent } from "@/lib/weddingData";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function toICSDate(dateStr: string, time: string): string {
  const monthMap: Record<string, string> = {
    Ocak: "01", Şubat: "02", Mart: "03", Nisan: "04",
    Mayıs: "05", Haziran: "06", Temmuz: "07", Ağustos: "08",
    Eylül: "09", Ekim: "10", Kasım: "11", Aralık: "12",
  };

  const parts = dateStr.split(" ");
  const day = pad(parseInt(parts[0]));
  const month = monthMap[parts[1]] || "01";
  const year = parts[2];
  const timePart = time.split("–")[0].trim().split(":");
  const hour = pad(parseInt(timePart[0]));
  const minute = pad(parseInt(timePart[1]));

  return `${year}${month}${day}T${hour}${minute}00`;
}

function toICSEndDate(dateStr: string, time: string): string {
  const endTime = time.includes("–") ? time.split("–")[1].trim() : null;
  if (endTime) {
    return toICSDate(dateStr, endTime);
  }
  const start = toICSDate(dateStr, time);
  const hour = parseInt(start.substring(9, 11)) + 3;
  return start.substring(0, 9) + pad(hour) + start.substring(11);
}

export function generateICS(event: WeddingEvent): string {
  const dtStart = toICSDate(event.date, event.time);
  const dtEnd = toICSEndDate(event.date, event.time);
  const now = new Date();
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}T${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Büşra & İlhan//Düğün//TR",
    "BEGIN:VEVENT",
    `DTSTART;TZID=Europe/Istanbul:${dtStart}`,
    `DTEND;TZID=Europe/Istanbul:${dtEnd}`,
    `DTSTAMP:${stamp}Z`,
    `UID:${event.id}@busra-ilhan-dugun`,
    `SUMMARY:${event.name} — Büşra & İlhan`,
    `LOCATION:${event.venue}\\, ${event.address}`,
    `DESCRIPTION:Büşra & İlhan ${event.name}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadICS(event: WeddingEvent) {
  const ics = generateICS(event);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}-busra-ilhan.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
