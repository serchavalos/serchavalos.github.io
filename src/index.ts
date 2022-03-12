import fs from "fs";
import path from "path";
import { parse } from "node-html-parser";
import { formatHTML } from "./lib/formatHTML";
import { red, green } from "./lib/color-logs";

const publicIndexFilePath = path.join("docs", "index.html");
const templateFilePath = path.join(__dirname, "index.template.html");
const templateHtml = fs.readFileSync(templateFilePath, "utf-8");
const domTree = parse(templateHtml);
const previewElementDom = domTree.querySelector(".face.preview");
if (!previewElementDom) {
  red("Error: Element `.face.preview` not found!");
  process.exit(1);
}

const previewElementHtml = previewElementDom.innerHTML;
const codeHtml = formatHTML(previewElementHtml)
  .map((row: string) => `<p>${row}</p>`)
  .join("");

const publicIndexHtml = templateHtml.replace(
  '<div class="face code"></div>',
  `<div class="face code"><label for="preview-btn">show preview</label>${codeHtml}</div>`
);
fs.writeFileSync(publicIndexFilePath, publicIndexHtml);

green(`Success! The file ${publicIndexFilePath} has been udpated`);
process.exit(0);
