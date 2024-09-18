import { fileURLToPath } from "node:url";
import fse from "fse";
import path from "path";
import baseConfig from "./assets/config.json";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export type IConfig = typeof baseConfig;

export function getRandomInt(n: number): number {
  return Math.floor(Math.random() * (n + 1));
}

export function imageToBase64(imagePath) {
  const imageBuffer = fse.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");
  return `data:image/jpeg;base64,${base64Image}`;
}
export const fontColor = [
  "text-teal-300",
  "text-yellow-300",
  "text-pink-300",
  "text-green-300",
  "text-red-300",
];

/**
 * 写一个函数，从给定word: string 中查找一个字符串数组 root:Array<string>中出现的单根，并给每个词添依次加一个fontColor的class（按顺序）。
 * @param word: 'angle'
 * @param root: ['ang','le']
 * @returns <span class='text-teal-300'>ang</span><span class='text-blue-300'>le</span>
 */

export function applyFontColors({
  word,
  roots: _roots = [],
  mask,
}: {
  word: string;
  roots: Array<string>;
  mask?: boolean;
}) {
  let result = "";
  let currentIndex = 0;
  const roots = _roots.filter((root) => word.includes(root));
  let masked = getRandomInt(roots.length - 1);

  while (currentIndex < word.length) {
    // 检查剩余字符串是否以 root 中的某个元素开头
    let matchFound = false;
    for (let i = 0; i < roots.length; i++) {
      if (word.startsWith(roots[i], currentIndex)) {
        // 匹配到，添加对应颜色的 span 标签
        result += `<span class='${fontColor[i % fontColor.length]}'>${
          mask && i === masked
            ? `<span class='${"underline-offset-8 underline decoration-blue-500"}'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`
            : roots[i]
        }</span>`;
        currentIndex += roots[i].length;
        matchFound = true;
        break;
      }
    }

    if (!matchFound) {
      // 没有匹配到，直接添加当前字符到结果
      result += word.charAt(currentIndex);
      currentIndex++;
    }
  }

  return result;
}

export function HtmlTextRoot({
  text,
  cls,
  commonRoot = [],
  root = [],
  mask,
}: {
  text: string;
  cls?: string;
  commonRoot: IConfig["commonRoot"];
  root: IConfig["words"][0]["root"];
  mask?: boolean;
}) {
  const roots = commonRoot.concat(root).map((item) => item.root);
  let html = applyFontColors({ word: text, roots, mask });

  return <span className={cls} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function HtmlText({
  text,
  cls,
  tense,
  important,
  tag,
  isDoubleRow,
}: {
  text: string;
  cls?: string;
  tense?: Array<string>;
  important?: Record<string, any>;
  tag?: boolean;
  isDoubleRow?: boolean;
}) {
  let html = "";

  html = text.replace(
    /\(([^\)]*)\)/g,
    ` <div className="tooltip tooltip-open">
        <b class='${
          !tense?.length
            ? "underline-offset-8 underline decoration-blue-500"
            : "text-blue-500"
        }' >$1</b> 
      </div>`
  );

  if (tense?.length) {
    tense
      .sort((a, b) => -(a.length - b.length))
      .forEach((item) => {
        const {
          phoneticSymbol = "",
          explain = "",
          word = "",
          parse = "",
        } = Object.values(important ?? {}).find(({ word }) => item === word) ??
        {};
        html = html.replace(
          `${item}`,
          word
            ? `<div class="indicator">
                <div class="indicator-item indicator-center badge ${
                  tag
                    ? `text-black/80 bg-white/80 border-none p-2 ${
                        isDoubleRow ? "" : "-top-3"
                      } text-sm`
                    : "text-white/30 border-white/0 text-lg"
                }  badge-outline mb-4">
                    <p><span class="text-sm">${phoneticSymbol}</span> ${explain.replace(
                /[\w\.\s]*/gi,
                ""
              )}</p>
                </div>
                <b class='text-blue-500'>${item}</b>
              </div>`
            : `<b class='text-blue-500'>${item}</b>`
        );
      });
  }

  return <span className={cls} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function MultiHtmlText({
  text,
  tense,
}: {
  text: string;
  tense?: Array<string>;
}) {
  return (
    <>
      {text.split("\n").map((text, index) => {
        return (
          <div key={index} className={index % 2 === 0 ? "mt-10" : ""}>
            <HtmlText
              tense={index % 2 === 0 ? tense : []}
              key={index}
              text={text}
              cls={`${
                index % 2 === 1
                  ? "opacity-30 text-gray-100 text-1xl"
                  : "opacity-80 text-gray-100 text-3xl"
              }   leading-loose`}
            />
          </div>
        );
      })}
    </>
  );
}

export function paginateText(text: string, charLimit: number): string[] {
  // Step 1: Split the text into words
  const words = text.split(/\s+/);  // Use regex to split on any whitespace

  // Step 2: Initial pagination based on character limit per page
  let pages: string[] = [];
  let currentPage: string[] = [];
  let currentPageLength = 0;

  words.forEach(word => {
    // If adding the next word exceeds the character limit, start a new page
    if (currentPageLength + word.length + 1 > charLimit) {
      pages.push(currentPage.join(' '));
      currentPage = [];
      currentPageLength = 0;
    }
    currentPage.push(word);
    currentPageLength += word.length + 1; // +1 for the space or punctuation
  });

  // Push the last page if there are words remaining
  if (currentPage.length > 0) {
    pages.push(currentPage.join(' '));
  }

  // Step 3: Adjust pages to balance word count across pages
  let totalWords = words.length;
  let avgWordsPerPage = Math.ceil(totalWords / pages.length);

  let balancedPages: string[] = [];
  currentPage = [];
  let currentPageWordCount = 0;

  words.forEach(word => {
    if (currentPageWordCount >= avgWordsPerPage) {
      balancedPages.push(currentPage.join(' '));
      currentPage = [];
      currentPageWordCount = 0;
    }
    currentPage.push(word);
    currentPageWordCount++;
  });

  // Push the last balanced page
  if (currentPage.length > 0) {
    balancedPages.push(currentPage.join(' '));
  }

  return balancedPages;
}

