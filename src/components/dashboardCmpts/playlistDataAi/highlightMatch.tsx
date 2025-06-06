function HighlightMatch(text: string, query: string) {
  if (!query) return text

  // Escape special characters in the query for safe use in regex
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

  // Split the text by HTML tags and process only the text parts
  const parts = text.split(/(<[^>]*>)/)

  return parts
    .map((part) => {
      // If this part is an HTML tag, return it unchanged
      if (part.startsWith("<") && part.endsWith(">")) {
        return part
      }

      // For text content, highlight the matches
      return part.replace(
        new RegExp(`(${escapedQuery})`, "gi"),
        '<span style="background-color: var(--darkerPurple); color: white; font-weight: bold; font-size: 20px; padding: 2px 5px; border-radius: 7px; display: inline-block; margin: 2px;">$1</span>',
      )
    })
    .join("")
}

export default HighlightMatch

