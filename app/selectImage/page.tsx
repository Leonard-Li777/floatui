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
import React from "react";
import SelectImage from "./selectImage";
// import { useImmerReducer } from "use-immer";

const title = "Float UI - Float UI components demo";

export default async (props) => {
  console.log(props, __filename, __dirname);
  const { searchParams } = props;
  const { projectName, dirName, section, image, order: _order } = searchParams;
  const order = parseInt(_order);
  const projectDir = path.resolve(
    __dirname,
    `../../../editly/${projectName}/output/${dirName}`
  );
  const currentDir = __dirname;
  const project = JSON.parse(
    fse.readFileSync(`${projectDir}/config.json`, "utf8")
  );
  // const globalConfig = { [project.dirName]: project };


  // const [todos, dispatch] = useImmerReducer(
  //   (draft, action) => {
  //     switch (action.type) {
  //       case "toggle":
  //         const todo = draft.find((todo) => todo.id === action.id);
  //         todo.done = !todo.done;
  //         break;
  //       case "add":
  //         draft.push({
  //           id: action.id,
  //           title: "A new todo",
  //           done: false
  //         });
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   [ /* initial todos */ ]
  // );

  try {
    return (
      <div className="">
        {section === "0" &&
          ((order = 0) => {
            let images = [];
            try {
              images = fse.readdirSync(`${projectDir}/image/`);
            } catch (err) {
              console.log(err);
            }

            return (
              <section id="section0">
                <SelectImage
                  {...{
                    images,
                    projectDir,
                    project,
                    searchParams,
                  }}
                />
              </section>
            );
          })(order)}
      </div>
    );
  } catch (err) {
    return <></>;
  }
};
