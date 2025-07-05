export default function textTruncate(text, maxLength = 60) {
  if (!text) return "";

  if (text?.length <= maxLength) return text;

  // Truncate within allowed length of text
  const truncatedByLength = text.substr(0, maxLength).trim();

  // Truncated text till last space to avoid cut off
  const lastSpaceIndex = truncatedByLength.lastIndexOf(" ");
  const finalText = truncatedByLength.substr(0, lastSpaceIndex).trim();

  return `${finalText}...`;
}

export function truncateMiddle(text, maxLength = 20) {
  if (text.length <= maxLength) {
    return text;
  }

  const halfLength = Math.floor(maxLength / 2);
  const start = text.slice(0, halfLength);
  const end = text.slice(-halfLength);

  return `${start}...${end}`;
}
