import path from "path";
import Link from "next/link";
import HeroBgGradient from "components/HeroBgGradient";
import BgGradient from "components/ui/BgGradient";
import fse from "fse";
import Navbar from "components/ui/Navbar";
import {
  imageToBase64,
  HtmlTextRoot,
  HtmlText,
  MultiHtmlText,
  __dirname,
  __filename,
} from "./utils";

const title = "Float UI - Float UI components demo";

export default async (props) => {
  console.log(props, __filename, __dirname);
  const {
    searchParams: { dirName, section, image, order: _order },
  } = props;
  const order = parseInt(_order);
  const projectDir = path.resolve(
    __dirname,
    `../../../editly/threeBody/output/${dirName}`
  );
  const currentDir = __dirname;
  const project = JSON.parse(
    fse.readFileSync(`${projectDir}/config.json`, "utf8")
  );
  const { mix, important, english, chinese, translation } = project;
  const words = Array.from({ length: 6 }).map((item, index) => {
    const { word } = important[`word${index + 1}`];
    return word;
  });

  try {
    return (
      <div className="">
        <BgGradient />
        {section === "1" &&
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
                    <img
                      src={`${imageToBase64(
                        `${currentDir}/assets/threeBodyLogo.png`
                      )}`}
                      width={200}
                    />
                    <div className="mt-5 pt-2">
                      {Array.from({ length: 6 }).map((item, index) => {
                        const { word, phoneticSymbol, parse, explain } =
                          important[`word${index + 1}`];
                        return (
                          <>
                            <h1 className="mt-8 text-3xl text-linear">
                              {word} <span className="text-2xl">{explain}</span>
                            </h1>
                            <div className="text-1xl text-zinc-500">
                              <span className="text-lg">{phoneticSymbol}</span>{" "}
                              {parse}
                            </div>
                          </>
                        );
                      })}
                    </div>
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

        {section === "2" &&
          ((order = 0) => {
            const [en, zh] = mix[order];
            const imgNumber = Math.floor((3 / mix.length) * order) + 1;
            return (
              <section
                id="section2"
                className="max-w-screen relative bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0, 0.8) 10%, rgba(0,0,0,0.0) 30%),url('${imageToBase64(
                    `${projectDir}/image/${imgNumber}.png`
                  )}')`,
                }}
              >
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />

                <div className="h-screen w-full space-y-4 text-left relative">
                  <div className="w-full absolute bottom-10">
                    <div className="pr-10 pl-10 ">
                      <div className="text-linear leading-loose tracking-wide text-2xl">
                        <HtmlText
                          tense={words}
                          important={important}
                          text={en}
                        />
                      </div>
                      <div className=" text-gray-400 leading-loose tracking-widest text-1xl font-body">
                        <HtmlText tense={words} text={zh} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })(order)}
        {section === "3" &&
          ((order = 0) => {
            const { phoneticSymbol, explain, word, parse, usage, image } =
              important[`word${order}`];
            return (
              <section
                id="section3"
                className="max-w-screen relative bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0, 0.8) 10%, rgba(0,0,0,0.0) 30%),url('${imageToBase64(
                    `${projectDir}/image/${image || 1}.png`
                  )}')`,
                }}
              >
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div className="h-screen w-full text-left relative">
                  <div className="w-full absolute bottom-10 bg-black/50 border-spacing-3 rounded-xl">
                    <div className="p-3 max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between flex md:px-8">
                      <ul className="">
                        <li className="">
                          <h4 className="text-4xl  text-blue-500 font-semibold">
                            {word}
                          </h4>
                          <p className="text-2xl text-linear mt-3 font-medium">
                            {phoneticSymbol} {explain}{" "}
                          </p>
                        </li>
                      </ul>
                      <div className="flex-none mt-2 text-2xl">
                        <p className=" text-blue-500">
                          <HtmlText tense={[word]} text={usage} />
                        </p>
                        <h3 className="mt-3 text-linear text-1xl">{parse}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })(order)}
        {section === "4" &&
          ((order = 0) => {
            return (
              <section
                id="section4"
                className="max-w-screen relative bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0, 0.8) 10%, rgba(0,0,0,0.0) 30%),url('${imageToBase64(
                    `${projectDir}/image/${image || 1}.png`
                  )}')`,
                }}
              >
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div className="h-screen w-full text-left relative">
                  <div className="w-full absolute bottom-10 bg-black/50 border-spacing-3 rounded-xl">
                    <div className="flex-none p-2 text-sm font-body">
                      {/* <h3 className="mt-3 text-linear text-1xl">{english}</h3> */}
                      <h3 className="mt-3 text-linear text-lg">
                        中文版：<span className="">{chinese}</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </section>
            );
          })(order)}

        {section === "5" &&
          ((order = 0) => {
            return (
              <section id="section5" className="max-w-screen">
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div className="h-screen w-full text-left grid items-center pl-20 pr-20">
                  <div className="flex-none p-2 text-sm font-body">
                    <h3 className="text-lg leading-[4rem]">
                      <HtmlText
                        tense={words}
                        important={important}
                        text={english}
                      />
                    </h3>
                    <h3 className="text-linear text-lg mt-16">
                      英文版：
                      <span className="">{translation}</span>
                    </h3>
                    <h3 className="mt-10 text-linear text-lg">
                      中文版：<span className="">{chinese}</span>
                    </h3>
                  </div>
                </div>
              </section>
            );
          })(order)}
        {section === "6" &&
          ((order = 0) => {
            return (
              <section
                id="section3"
                className="max-w-screen relative bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0, 0.8) 10%, rgba(0,0,0,0.0) 30%),url('${imageToBase64(
                    `${projectDir}/image/${order || 1}.png`
                  )}')`,
                }}
              >
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div className="h-screen w-full text-left relative">
                  <div className="w-full absolute bottom-10 bg-black/50 border-spacing-3 rounded-xl">
                    <div className="p-3 max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between flex md:px-8"></div>
                  </div>
                </div>
              </section>
            );
          })(order)}
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
