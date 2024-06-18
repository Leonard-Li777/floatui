import path from "path";
import Link from "next/link";
import HeroBgGradient from "components/HeroBgGradient";
import BgGradient from "components/ui/BgGradient";
import fse from "fse";
import Navbar from "components/ui/Navbar";
import {imageToBase64, HtmlTextRoot, HtmlText, MultiHtmlText, __dirname, __filename} from './utils'

const title = "Float UI - Float UI components demo";

export default async (props) => {
  console.log(props, __filename, __dirname);
  const {
    searchParams: { dirName, section, image, order: _order },
  } = props;
  const order = parseInt(_order);
  const projectDir = path.resolve(__dirname, `../../../editly/threeBody/output/${dirName}`);
  const currentDir = __dirname;
  const project = JSON.parse(
    fse.readFileSync(`${projectDir}/config.json`, "utf8")
  );
  const { mix, words,  } = project;

  // console.log(imageToBase64(
  //   `${projectDir}/image/1.png`
  // ))
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
      <div className="">
        <BgGradient />
        {section === "0" &&
          (() => {
            return (
              <section id="section1" className="h-screen">
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div
                  className="relative bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgba(0,0,0, 0.8) 50%, rgba(0,0,0,0.0) 70%),url('${imageToBase64(
                      `${projectDir}/image/1.png`
                    )}')`,
                  }}
                >
                  <div className="ml-10 mr-10 pt-5 h-100vw max-w-3xl mx-auto space-y-4 text-left flex-col justify-center ">
                   <img src={`${imageToBase64(
                      `${currentDir}/assets/threeBodyLogo.png`
                    )}`} width={500}/>
                        <div className="mt-10 pt-10">
                          <h1 className="text-3xl text-linear">
                            三体英文版逐行阅读和翻译
                          </h1>
                          <div className="pt-5 text-2xl text-zinc-600">不读英文版，连进ETO的资格都没有</div>
                          <h1 className="text-3xl text-linear pt-5">
                            重点词汇标注和解析
                          </h1>
                          <div className="pt-5 text-2xl text-zinc-600">真空中，学渣每天前进一小步，也能达到光速1/10</div>
                          <h1 className="text-3xl text-linear pt-5">
                            写作艺术赏析、三体流行文化八卦
                          </h1>
                          <div className="pt-5 text-2xl text-zinc-600">大刘的语言艺术和票圈文化</div>
                          <h1 className="text-3xl text-linear pt-5">
                            三体英文版对比三体中文原版差异
                          </h1>
                          <div className="pt-5 text-2xl text-zinc-600">进阶翻译技巧和中美文化差异，体验卧底云天明的三体岁月</div>
                        </div>
                    {/* {mix.map((item, index) => {
                      const [en, ch] = item;
                      return (
                        <div key={index} className="mt-10 pt-10">
                          <h1 className="text-5xl text-linear sm:text-5xl">
                            {en}
                          </h1>
                          <div className="pt-5 text-3xl text-zinc-400">{ch}</div>
                        </div>
                      );
                    })} */}
                  </div>
                </div>
                {/* <div className="max-w-3xl mx-auto space-y-4 text-center flex-col justify-center ">
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
                </div> */}
              </section>
            );
          })()}

        {/* {section === "2" &&
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
          })(order)} */}
        {/* {section === "3" && (
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
        )} */}
        {/* {section === "4" && (
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
        )} */}
        {/* {section === "5" &&
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
          })(order)} */}
        {/* {section === "6" &&
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
          })(order)} */}
        {/* {section === "7" &&
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
          })(order)} */}
        {/* {section === "8" &&
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
          })(order)} */}
        {/* {section === "9" &&
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
          })(order)} */}
      </div>
    );
  } catch (err) {
    return <></>;
  }
};
