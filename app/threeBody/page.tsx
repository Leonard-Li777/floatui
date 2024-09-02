import path from "path";
import Link from "next/link";
import HeroBgGradient from "components/HeroBgGradient";
import BgGradient from "components/ui/BgGradient";
import fse from "fse";
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
  const {
    section: storySection,
    mix,
    important,
    english,
    chinese,
    translation,
    cover,
    difference1,
    difference2,
    difference3,
    prefect1,
    prefect2,
    prefect3,
    word1,
    word2,
    word3,
    keyframe1,
    keyframe2,
    keyframe3,
    keyframe4,
    keyframe5,
    keyframe6,
    keyframe7,
    keyframe8,
    keyframe9,
    keyframe10,
  } = project;
  const words = Array.from({ length: 12 }).map((item, index) => {
    const { word } = important[`word${index + 1}`];
    return word;
  });

  try {
    return (
      <div className="">
        <BgGradient />
        {section === "0" &&
          ((order = 0) => {
            return (
              <section id="section0">
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
                <div
                  className="relative bg-no-repeat pt-5"
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgba(0,0,0, 0.0) 50%, rgba(0,0,0,0.0) 50%),url('${imageToBase64(
                      `${projectDir}/image/${cover || "difference1"}.png`
                    )}')`,
                  }}
                >
                  <div className="mix-blend-luminosity bg-blend-darken text-2xl pl-5 h-100vw text-gray-200 leading-loose font-body tracking-wide md:text-4xl drop-shadow-[0_10px_15px_rgba(0,0,0,1)]">
                    <div className="flex flex-col items-center mt-10 pt-20 drop-shadow-lg">
                      <img
                        src={`${imageToBase64(
                          `${currentDir}/assets/threeBodyLogo.png`
                        )}`}
                        width={400}
                      />
                      {/* <h1 className="text-linear pt-5">The Madness Years</h1> */}
                      <h1 className="text-8xl font-extrabold pt-5 invert drop-shadow-[0_0px_10px_rgba(255,255,255,1)]">
                        三体II黑暗森林：第一章
                      </h1>
                      <h1 className="drop-shadow-xl pt-5 text-2xl">
                        The Dark Forest Part 1: THE WALLFACERS 原著：刘慈欣
                      </h1>
                      <button className="drop-shadow-lg text-8xl font-extrabold  mt-10 px-7 py-4  text-white duration-150 bg-indigo-600 rounded-full hover:bg-indigo-500 active:bg-indigo-700">
                        &nbsp;{storySection}&nbsp;
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            );
          })(order)}
        {section === "1" &&
          (() => {
            const posts = Array.from({ length: 3 }).map((item, index) => {
              const { word, phoneticSymbol, parse, explain } =
                important[`word${index + 1}`];
              return {
                word,
                phoneticSymbol,
                parse,
                explain,
                translation,
                img: `${
                  project[`word${index + 1}`] ||
                  imageToBase64(`${projectDir}/image/word${index + 1}.png`)
                }`,
              };
            });

            return (
              <section id="section1" className="h-screen">
                <div
                  className="relative bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgba(0,0,0, 0.8) 50%, rgba(0,0,0,0.8) 50%),url('${
                      word1 ||
                      imageToBase64(`${projectDir}/image/keyframe2.png`)
                    }')`,
                  }}
                >
                  <div className="ml-10 mr-10 pt-5 h-100vw mx-auto space-y-4 text-left flex-col justify-center ">
                    <img
                      src={`${imageToBase64(
                        `${currentDir}/assets/threeBodyLogo.png`
                      )}`}
                      width={200}
                    />
                    <div className="mt-5 pt-2">
                      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((items, key) => (
                          <article
                            className="max-w-md mx-auto mt-4 shadow-lg border border-gray-500 rounded-md duration-300 bg-black/30"
                            key={key}
                          >
                            <a href={""}>
                              <img
                                src={items.img}
                                loading="lazy"
                                alt={items.word}
                                className="w-full h-48 rounded-t-md"
                              />
                              <div className="flex items-center mt-2 pt-3 mr-2">
                                <div className="ml-3 text-linear text-3xl">
                                  <span className="block">{items.word}</span>
                                  <span className="block text-xl">
                                    {items.phoneticSymbol}
                                  </span>
                                </div>
                              </div>
                              <div className="text-gray-400 pt-3 ml-4 mr-2 mb-3">
                                <h3 className="text-xl">{items.explain}</h3>
                              </div>
                            </a>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })()}

        {section === "2" &&
          ((order = 0) => {
            const { keyframe, en, zh } = mix[order];
            const imgNumber = Math.ceil((10 / mix.length) * order) || 1;
            const isDoubleRow = en.length > 82;
            return (
              <section
                id="section2"
                className="relative bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0, 0.8) 10%, rgba(0,0,0,0.0) 30%),url('${
                    project[`keyframe${imgNumber}`] ||
                    imageToBase64(`${projectDir}/image/${keyframe}.png`)
                  }')`,
                }}
              >
                <div className="h-screen w-full space-y-4 text-left relative">
                  <div className="w-full absolute bottom-3">
                    <div className="pr-10 pl-10 ">
                      <div
                        className={`text-linear ${
                          isDoubleRow ? "leading-loose" : ""
                        } tracking-wide text-3xl`}
                      >
                        <HtmlText
                          tense={words}
                          important={important}
                          text={en}
                          tag
                          isDoubleRow={isDoubleRow}
                        />
                      </div>
                      <div className=" text-gray-400 tracking-widest text-xl font-body">
                        {zh}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })(order)}
        {section === "3" &&
          ((order = 0) => {
            const { phoneticSymbol, explain, word, translation, usage, parse } =
              important[`word${order + 1}`];
            return (
              <section
                id="section3"
                className="relative bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0, 0.8) 10%, rgba(0,0,0,0.0) 30%),url('${
                    project[`word${order + 1}`] ||
                    imageToBase64(`${projectDir}/image/word${order + 1}.png`)
                  }')`,
                }}
              >
                <div className="h-screen w-full text-left relative">
                  <div className="w-full absolute bottom-0 bg-black/50 border-spacing-3 rounded-xl">
                    <div className="p-3 max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between flex md:px-8">
                      <ul className="min-w-60">
                        <li className="">
                          <h4 className="text-4xl  text-blue-500">
                            {word}{" "}
                            <span className="text-xl text-cyan-50">
                              {phoneticSymbol} {explain}
                            </span>{" "}
                          </h4>
                          <p className="text-2xl text-linear mt-3">{parse}</p>
                        </li>
                      </ul>
                      <div className="mt-2 text-2xl">
                        <p className=" text-blue-500">
                          <HtmlText tense={[word]} text={usage} />
                        </p>
                        <h3 className="mt-3 text-linear text-1xl">
                          {translation}
                        </h3>
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
                className="relative bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0, 0.0) 10%, rgba(0,0,0,0.0) 30%),url('${
                    project[`difference${order + 1}`] ||
                    imageToBase64(
                      `${projectDir}/image/difference${order + 1 || 1}.png`
                    )
                  }')`,
                }}
              >
                <div className="h-screen w-full text-left relative">
                  <div className="w-full absolute bottom-10 bg-black/50 border-spacing-3 rounded-xl"></div>
                </div>
              </section>
            );
          })(order)}

        {section === "5" &&
          ((order = 0) => {
            return (
              <section id="section5" className="max-w-screen">
                <div className="h-screen w-full text-left grid items-center pl-20 pr-20">
                  <div className="flex-none p-2 text-xl font-body">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg">
                      🆎 英文版：
                    </button>
                    <h3 className="mt-2 text-linear">{translation}</h3>
                    <button className="mt-10 flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 bg-red-600 rounded-lg">
                      🐼 中文版：
                    </button>
                    <h3 className="mt-2 text-linear">{chinese}</h3>
                  </div>
                </div>
                <HeroBgGradient className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10" />
              </section>
            );
          })(order)}
        {section === "6" &&
          ((order = 0) => {
            return (
              <section id="section5" className="max-w-screen">
                <div className="h-screen w-full text-left grid items-center pl-5 pr-5">
                  <div className="flex-none p-2 text-sm text-white/60 font-body">
                    <h3 className="text-2xl leading-[4rem]">
                      <HtmlText
                        tense={words}
                        important={important}
                        text={english}
                      />
                    </h3>
                  </div>
                </div>
              </section>
            );
          })(order)}
        {section === "7" &&
          ((order = 0) => {
            return (
              <section
                id="section3"
                className="relative bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0, 0) 10%, rgba(0,0,0,0) 30%),url('${
                    project[`prefect${order + 1}`] ||
                    imageToBase64(
                      `${projectDir}/image/prefect${order + 1 || 1}.png`
                    )
                  }')`,
                }}
              >
                <div className="h-screen w-full text-left relative"></div>
              </section>
            );
          })(order)}
      </div>
    );
  } catch (err) {
    return <></>;
  }
};
