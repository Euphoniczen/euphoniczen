// parseDescription.tsx
import decodeHtml from "../../../../utils/decodeHtml";

export default function ParseDescription(description: string) {
  if (!description) return "";

  const decoded = decodeHtml(description);
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const parts = decoded.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--kindaOrange)', wordBreak: 'break-word' }}
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
