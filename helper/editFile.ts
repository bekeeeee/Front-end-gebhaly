import fs from "fs";
export default function writeJsonFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8");
}
