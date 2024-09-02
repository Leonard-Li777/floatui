"use client";
import { difference } from "lodash";
import React from "react";

const title = "Float UI - Float UI components demo";

export default (props) => {
  const { project, images: originImages } = props;
  const [selectedMix, setSelectedMix] = React.useState<string[]>();
  console.log(props, __filename, __dirname);
  const {
    searchParams: { projectName, dirName, section, image, order: _order },
  } = props;

  const {
    mix: originMix,
    character,
    cover: originCover = "prefect1",
  } = project;
  const [mix, setMix] = React.useState<string[]>(originMix);
  const [cover, setCover] = React.useState<string[]>(originCover);
  const [images, setImages] = React.useState<number>(originImages);
  const [removeVoice, setRemoveVoice] = React.useState<Array<string>>();
  const remanentImages = difference(
    images,
    mix.map((item) => `${item.keyframe}.png`)
  );
  const handleMixChange = (item, index) => {
    if (selectedMix?.index === index) {
      setSelectedMix(undefined);
    } else {
      setSelectedMix({ item, index });
    }
  };
  const handleImageChange = (item, index) => {
    const image = item.replace(".png", "");
    if (selectedMix) {
      selectedMix.item.keyframe = image;
      setMix([...mix]);
    } else {
      project.cover = image;
      setCover(image);
    }
  };
  const handleCharacterChange = (item, name) => {
    item.character = name;
    setMix([...mix]);
  };
  const handleSpeakerChange = (item, name) => {
    item.speaker = name;
    setMix([...mix]);
  };
  const handleRemove = async (type, filename) => {
    try {
      await fetch(
        `http://100.76.63.39:3000/editly/file?method=delete&projectName=${projectName}&dirName=${dirName}&type=${type}&filename=${filename}`,
        {
          method: "GET",
        }
      );
    } catch (error) {
      console.error(error);
    }

    if (type === "image") {
      setImages((images) => {
        return difference(images, [filename]);
      });
    }
    if (type === "voice") {
      setRemoveVoice((voice) => {
        return [...(voice || []), filename];
      });
    }
  };

  const handleSave = () => {
    let myFormData = new FormData();
    myFormData.append("config", JSON.stringify(project));
    fetch(
      `http://100.76.63.39:3000/editly/save_config?dirName=${dirName}&projectName=threeBody`,
      {
        method: "POST",
        body: myFormData,
      }
    );
  };
  return (
    <div className="overflow-x-auto">
      <div className="items-start justify-between py-4 border-b md:flex">
        <div>
          {remanentImages?.length && (
            <ul className="gap-y-8 gap-x-12 inline-block">
              {remanentImages.map((image, index) => {
                return (
                  <li
                    onClick={() => {
                      handleImageChange(image, index);
                    }}
                    key={image}
                    className="space-y-3 inline-block p-3"
                  >
                    {image}
                    <img
                      width={100}
                      src={`http://100.76.63.39:3000/editly/file?projectName=${projectName}&dirName=${dirName}&type=image&filename=${image}`}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div>
          封面图：
          <img
            width={100}
            src={`http://100.76.63.39:3000/editly/file?projectName=${projectName}&dirName=${dirName}&type=image&filename=${cover}.png`}
          />
        </div>
        <div className="items-center gap-x-3 mt-6 md:mt-0 sm:flex">
          <a
            onClick={handleSave}
            href="javascript:void(0)"
            className="block px-4 py-2 text-center text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Save Config
          </a>
        </div>
      </div>

      <table>
        <tr className="align-top">
          <td>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>character</th>
                  <th>voice</th>
                  <th>text</th>
                  <th>image</th>
                </tr>
              </thead>
              <tbody>
                {mix.map((item, index) => {
                  return (
                    <tr
                      onClick={() => handleMixChange(item, index)}
                      key={index}
                      className={`${
                        selectedMix?.index === index ? "bg-stone-700" : ""
                      }`}
                    >
                      <td width={350}>
                        <ul className="menu menu-xs menu-horizontal bg-base-200">
                          {[{ name: "host" }]
                            .concat(character)
                            .map((character) => (
                              <li key={character.name}>
                                <a
                                  onClick={() => {
                                    handleCharacterChange(item, character.name);
                                  }}
                                  className={
                                    character.name === item.character
                                      ? "active"
                                      : ""
                                  }
                                >
                                  {character.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                        <br />
                        <ul className="menu menu-xs menu-horizontal bg-base-200">
                          {[{ name: "voiceover" }]
                            .concat(character)
                            .map((character) => (
                              <li key={character.name}>
                                <a
                                  onClick={() => {
                                    handleSpeakerChange(item, character.name);
                                  }}
                                  className={
                                    character.name === item.speaker
                                      ? "active"
                                      : ""
                                  }
                                >
                                  {character.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </td>
                      <td width={400}>
                        {!removeVoice?.includes(`mix${index + 1}.mp3`) && (
                          <>
                            <audio
                              className="inline-block"
                              src={`http://100.76.63.39:3000/editly/file?projectName=${projectName}&dirName=${dirName}&type=voice&filename=mix${
                                index + 1
                              }.mp3`}
                              controls
                            ></audio>
                            <button
                              onClick={() =>
                                handleRemove("voice", `mix${index + 1}.mp3`)
                              }
                              className="px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-full hover:bg-indigo-500 active:bg-indigo-700"
                            >
                              delete
                            </button>
                          </>
                        )}
                      </td>
                      <td>
                        {item.zh}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {item.en}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="h-20 w-40">
                              <img
                                src={`http://100.76.63.39:3000/editly/file?projectName=${projectName}&dirName=${dirName}&type=image&filename=${item.keyframe}.png`}
                              />
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th>character</th>
                  <th>voice</th>
                  <th>text</th>
                  <th>image</th>
                </tr>
              </tfoot>
            </table>
          </td>
          <td className="align-top">
            <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => {
                return (
                  <li
                    onClick={() => {
                      handleImageChange(image, index);
                    }}
                    key={image}
                    className="space-y-3"
                  >
                    <button
                      onClick={() => handleRemove("image", image)}
                      className="px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-full hover:bg-indigo-500 active:bg-indigo-700"
                    >
                      delete
                    </button>{" "}
                    {image}
                    <img
                      width={500}
                      src={`http://100.76.63.39:3000/editly/file?projectName=${projectName}&dirName=${dirName}&type=image&filename=${image}`}
                    />
                  </li>
                );
              })}
            </ul>
          </td>
        </tr>
      </table>
    </div>
  );
};
