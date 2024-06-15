import path from "path";
import Link from "next/link";
import HeroBgGradient from "components/HeroBgGradient";
import BgGradient from "components/ui/BgGradient";
import { fileURLToPath } from "node:url";
import fse from "fse";
import Navbar from "components/ui/Navbar";
import baseConfig from "./assets/config.json";

const title = "Float UI - Float UI components demo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type IConfig = typeof baseConfig;

function getRandomInt(n: number): number {
  return Math.floor(Math.random() * (n + 1));
}

function imageToBase64(imagePath) {
  const imageBuffer = fse.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");
  return base64Image;
}
const fontColor = [
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

function applyFontColors({
  word,
  roots: _roots =[],
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

function HtmlTextRoot({
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

function HtmlText({
  text,
  cls,
  tense,
  mask,
}: {
  text: string;
  cls?: string;
  tense?: Array<string>;
  mask?: boolean;
}) {
  let html = "";
  if (mask) {
    html = text.replace(
      /\(([^\)]*)\)/g,
      ` <b class='${"underline-offset-8 underline decoration-blue-500"}' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b> `
    );


  } else {
    html = text.replace(
      /\(([^\)]*)\)/g,
      ` <b class='${
        !tense?.length
          ? "underline-offset-8 underline decoration-blue-500"
          : "text-blue-500"
      }' >$1</b> `
    );
  }

  if (!mask && tense?.length) {
    tense.sort((a,b)=>-(a.length - b.length)).forEach((item) => {
      html = html.replace(`${item}`, `<b class='text-blue-500'>${item}</b>`);
    });
  }

  return <span className={cls} dangerouslySetInnerHTML={{ __html: html }} />;
}

function MultiHtmlText({
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
export default async (props) => {
  console.log(props, __filename, __dirname);
  const {
    searchParams: { dirName, section, image, order: _order },
  } = props;
  const order = parseInt(_order);
  const projectDir = path.resolve(__dirname, `../../../editly/associateEnglish/output/${dirName}`);

  const project = JSON.parse(
    fse.readFileSync(`${projectDir}/config.json`, "utf8")
  );
  const { commonRoot, word, words, zh, mix, tense, keys, details } = project;
  // useEffect(()=>{
  //   setTimeout(() => {
  //     htmlToImage.toSvg(document.getElementById('section1'))
  //     .then(function (dataUrl) {
  //       var img = new Image();
  //       img.src = dataUrl;
  //       document.body.appendChild(img);
  //     });
  //   }, 3000);
  // })

  try {
    return (
      <div className="m-5">
        <BgGradient />
        {section === "1" &&
          (() => {
            return (
              <section id="section1" className="h-screen">
                <Navbar />
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div
                  className="mt-10 relative bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgba(0,0,0, 0.6) 20%, rgba(0,0,0,0.0) 70%),url('data:image/jpeg;base64,${imageToBase64(
                      `${projectDir}/image/1.png`
                    )}')`,
                  }}
                >
                  <div className="ml-4 mr-4 pt-10 h-100vw max-w-3xl mx-auto space-y-4 text-left flex-col justify-center ">
                    {word.map((item, index) => {
                      const [en, ch] = item.split(" ");
                      return (
                        <div key={index} className="mt-10 pt-10">
                          <h1 className="text-5xl text-linear sm:text-5xl">
                            {en}
                          </h1>
                          <div className="pt-5 text-3xl text-zinc-400">{ch}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="max-w-3xl mx-auto space-y-4 text-center flex-col justify-center ">
                  {commonRoot?.map(({ root, definition, source }, index) => {
                    return (
                      <span  key={index}>
                        <h1 className="flex-shrink-0 w-full pt-20 text-6xl text-linear">
                          {root} <span className="text-4xl">{definition}</span>
                        </h1>
                        <div className="text-2xl pt-10 text-zinc-400">词根： {source}</div>
                      </span>
                    );
                  })}
                </div>
              </section>
            );
          })()}

        {section === "2" &&
          ((order = 0) => {
            return (
              <section id="section2" className="max-w-screen mt-4">
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div
                  className="mt-10 relative h-100vw bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0, 0.0) 0 100%),url('data:image/jpeg;base64,${imageToBase64(
                      `${projectDir}/image/${order+1}.png`
                    )}')`,
                  }}
                ></div>

                <div className="text-2xl mt-5 text-gray-200 leading-loose font-body tracking-wide md:text-4xl">
                  <HtmlText tense={tense} text={zh} />
                </div>
                <div className="flex mt-5 text-sm font-medium">
                  <span className="text-1xl text-zinc-400 mt-5">
                    Tip: 通过对画面的记忆，联想句子, 再回忆单词！
                  </span>
                </div>
              </section>
            );
          })(order)}
        {section === "3" && (
          <section id="section3" className=" max-w-screen mt-4">
            <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
            <div className="m-10">
              <div className="flex mt-20 justify-center text-sm font-medium">
                <Link
                  href="/components"
                  className="text-2xl flex items-center gap-1 py-3 px-4 rounded-md text-center text-white border-none bg-zinc-800 shadow-md w-auto hover:bg-zinc-700 duration-150 sm:py-2.5"
                >
                  听力练习巩固
                </Link>
              </div>
              <div className="text-2xl flex flex-col mt-5 font-medium">
                <MultiHtmlText text={mix} tense={tense} />
              </div>
            </div>
          </section>
        )}
        {section === "4" && (
          <section id="section4" className="max-w-screen mt-4">
            <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
            <div className="sm:text-2xl m-10 pt-10">

              <div className="flex flex-col mt-5 text-sm font-medium">
                {keys.map((key, index) => (
                  <div key={index}className="flex flex-col mt-10 text-sm font-medium">
                    <h1 className="text-3xl text-linear sm:text-5xl">{key}</h1>
                    <div className="text-2xl text-zinc-400 mt-5">{details[index]}</div>
                  </div>
                ))}
              </div>
              {
                commonRoot?.length > 0 && <><div className="flex mt-20 justify-center text-1xl font-medium">
                <Link
                  href="/components"
                  className="flex items-center gap-1 py-3 px-4 rounded-md text-center text-white border-none bg-zinc-800 shadow-md w-auto hover:bg-zinc-700 duration-150 sm:py-2.5"
                >
                  共同词根
                </Link>
              </div>
              <div className="max-w-3xl space-y-4 text-center flex-col justify-center ">
                {commonRoot?.map(({ root, definition, source }, index) => {
                  return (
                    <div key={index} className="pt-10">
                      <h1 className="flex-shrink-0 w-full text-4xl text-linear sm:text-6xl">
                        <span className="text-blue-500">{root}</span>{" "}
                        <span className="text-3xl">{definition}</span>
                      </h1>
                      <div className="pt-5 text-zinc-400">词根： {source}</div>
                    </div>
                  );
                })}
              </div></>
              }
            </div>
          </section>
        )}
        {section === "5" &&
          ((order = 0) => {
            const { word, root: wordRoot, parse } = words[order];
            const pronunciation = details[order];

            return (
              <section id="section5" className="max-w-screen mt-4">
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div className="m-10 pt-10">
                  <div className="flex flex-col mt-5 text-sm font-medium">
                    <div className="flex flex-col mt-10 text-sm font-medium">
                      <h1 className="text-center text-3xl text-linear sm:text-6xl">
                        <HtmlTextRoot
                          text={word}
                          cls=""
                          commonRoot={commonRoot}
                          root={wordRoot}
                        />
                      </h1>
                      <div className="text-zinc-400 mt-5  sm:text-2xl text-center">{pronunciation}</div>
                    </div>
                  </div>
                  <div className="max-w-3xl mx-auto space-y-4 text-center flex-col justify-center ">
                    {wordRoot?.map(({ root, definition, source }, index) => {
                      return (
                        <span  key={index}>
                          <h1 className="flex-shrink-0 w-full pt-20 text-6xl text-linear sm:text-6xl">
                            <span className="text-blue-500">{root}</span>{" "}
                            <span className="text-4xl">{definition}</span>
                          </h1>
                          <div className="pt-5 text-2xl text-zinc-400">词根： {source}</div>
                        </span>
                      );
                    })}
                    <div className="text-2xl m-10 text-center text-gray-100/30 leading-loose font-body tracking-wide md:text-4xl">
                      {parse}
                    </div>
                  </div>
                </div>
              </section>
            );
          })(order)}
        {section === "6" &&
          ((order = 0) => {
            const { sentence } = words[order];
            return (
              <section id="section6" className="mt-5">
                <Navbar />
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div
                  className="m-4 mt-10 pt-10 relative bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url('data:image/jpeg;base64,${imageToBase64(
                      `${projectDir}/image/word${order+1}.png`
                    )}')`,
                  }}
                >
                  <div className="ml-4 mr-4 pt-10 h-100vw max-w-3xl mx-auto space-y-4 text-left flex-col justify-center "></div>
                </div>
                <div className="flex m-5 justify-center text-sm font-medium">
                  <div className="text-2xl text-gray-200 leading-loose font-body tracking-wide md:text-4xl">
                    <HtmlText tense={tense} text={sentence} />
                  </div>
                </div>
              </section>
            );
          })(order)}
        {section === "7" &&
          ((order = 0) => {
            return (
              <section id="section7" className="max-w-screen mt-10">
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div
                  className="relative h-100vw bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0, 0.0) 0 100%),url('data:image/jpeg;base64,${imageToBase64(
                      `${projectDir}/image/${order+1}.png`
                    )}')`,
                  }}
                ></div>

                <div className="text-2xl mt-5 text-gray-200 leading-loose font-body tracking-wide md:text-4xl">
                  <HtmlText tense={tense} text={zh} mask />
                </div>
              </section>
            );
          })(order)}
        {section === "8" &&
          ((order = 0) => {
            return (
              <section id="section8" className="max-w-screen mt-4">
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div className="m-10">
                  <div className="flex mt-20 justify-center text-sm font-medium">
                    <Link
                      href="/components"
                      className="text-2xl flex items-center gap-1 py-3 px-4 rounded-md text-center text-white border-none bg-zinc-800 shadow-md w-auto hover:bg-zinc-700 duration-150 sm:py-2.5"
                    >
                      词根回顾
                    </Link>
                  </div>
                  <div className="flex flex-col mt-5 text-sm font-medium">
                    {keys.map((key, index) => {
                      const order = index;
                      const { word, root: wordRoot } = words[order];
                      const pronunciation = details[order];

                      return (
                        <div key={index} className="flex flex-col mt-10 pt-10 font-medium">
                          <h1 className="text-3xl text-linear sm:text-5xl">
                            {" "}
                            <HtmlTextRoot
                              text={word}
                              cls=""
                              commonRoot={commonRoot}
                              root={wordRoot}
                              mask
                            />
                          </h1>
                          <div className="text-2xl text-zinc-400 mt-5">
                            {pronunciation}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })(order)}
        {section === "9" &&
          ((order = 0) => {
            return (
              <section id="section9" className="max-w-screen mt-4">
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div className="m-10">
                  <div className="flex mt-20 justify-center text-sm font-medium">
                    <Navbar />
                  </div>
                  <div className="text-2xl p-10 font-body leading-10 flex flex-col text-gray-100 mt-5">
                    <p className="mt-5">
                      【记忆宫殿】理论利用了我们天生的{" "}
                      <span className="text-blue-500">空间导航</span> 能力和对{" "}
                      <span className="text-blue-500">图像的深刻记忆</span>
                      ，让学习和回忆变成了一场场奇妙的探险之旅。
                    </p>
                    <div className="mt-5 opacity-30">
                      <p className="mt-5">
                        想象你的大脑是一座宏伟的宫殿，每个房间、每条走廊都装饰着独特而奇异的画作。这就是记忆宫殿——一个思维的魔法城堡。当你需要记住一件事，比如购物清单上的物品，你不是简单地列个清单，而是把它们变成宫殿里的装饰。
                      </p>
                      <p className="mt-5">
                        比如说，你需要记住苹果、牛奶和面包。在你的记忆宫殿里，你可能会想象宫殿的大门口摆着一篮闪亮的红苹果，香气扑鼻；走进门厅，发现天花板上悬浮着一朵云，正缓缓滴下新鲜的牛奶，汇聚成一条银色的小溪；接着，你步入宴会厅，发现长桌上铺开的不是华丽的织锦，而是一片片金黄诱人的面包，散发着温暖的烘烤香。
                      </p>
                      <p className="mt-5">
                        通过这样的想象，枯燥的信息变成了宫殿里生动的场景。每当需要回忆时，你只需在脑海中漫步这宫殿，那些与空间紧密结合的记忆便会自然而然地浮现，就像再次探索一个个藏着惊喜的房间。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })(order)}
      </div>
    );
  } catch (err) {
    return <></>;
  }
};
