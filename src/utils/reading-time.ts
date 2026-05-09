/**
 * Estimate reading time from markdown content.
 * Strips markdown syntax before counting words.
 * Average reading speed: 200 words per minute.
 */
export function getReadingTime(markdown: string): number {
  const content = markdown
    // Remove frontmatter
    .replace(/^---[\s\S]*?---/, '')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    // Remove images
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Remove links but keep text
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove headings markers
    .replace(/#{1,6}\s/g, '')
    // Remove bold/italic markers
    .replace(/[*_]{1,3}/g, '')
    // Remove blockquotes
    .replace(/^\s*>\s?/gm, '')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}\s*$/gm, '');

  const words = content.trim().split(/\s+/).filter((w) => w.length > 0);
  return Math.max(1, Math.ceil(words.length / 200));
}
