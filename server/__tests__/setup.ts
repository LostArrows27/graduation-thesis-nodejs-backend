import dotenv from "dotenv";

const result = dotenv.config({ path: "../server/.env" });

if (result.error) {
  console.log("Error load .env file");
  console.log(result.error);
}

export default {};
