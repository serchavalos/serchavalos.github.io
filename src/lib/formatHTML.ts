import { tokenize } from "hyntax";

function isNewline(text: string): boolean {
  return /^\n/.test(text);
}

export function formatHTML(html: string): string[] {
  const { tokens } = tokenize(html);
  let indentation: number | null = null;
  const initialPad = html.match(/^\n(\s+)</);
  let offset = initialPad && initialPad.length > 1 ? initialPad[1].length : 0;

  const formatted = tokens.reduce(
    (acc, token) => {
      const { type, content } = token;
      const currentPosition = acc.length ? acc.length - 1 : 0;
      let tagName, padLeft;

      switch (type) {
        case "token:text":
          if (isNewline(content)) {
            acc.push("");
            indentation = content.replace(/^\n/, "").length || null;
          } else {
            acc[currentPosition] += content;
          }
          break;
        case "token:open-tag-start":
          tagName = content.replace("<", "");
          padLeft = indentation ? ` pad-left-${indentation - offset}` : "";
          const formatted = `<span class="tag${padLeft}">&lt;</span><span class="tag-name">${tagName}</span>`;
          acc[currentPosition] += formatted;
          indentation = null;
          break;
        case "token:open-tag-end":
          acc[currentPosition] += `<span class="tag">&gt;</span>`;
          break;
        case "token:attribute-key":
          acc[currentPosition] += ` <span class="attr-name">${content}</span>=`;
          break;
        case "token:attribute-value":
          acc[
            currentPosition
          ] += `<span class="attr-value">"${content}"</span>`;
          break;
        case "token:close-tag":
          tagName = content.replace(/<\/|>/g, "");
          padLeft = indentation ? ` pad-left-${indentation - offset}` : "";
          acc[
            currentPosition
          ] += `<span class="tag${padLeft}">&lt;&#47;</span><span class="tag-name">${tagName}</span><span class="tag">&gt;</span>`;
          indentation = null;
          break;
        default:
          break;
      }
      return acc;
    },
    [""]
  );

  return formatted.filter((item) => item !== "");
}
