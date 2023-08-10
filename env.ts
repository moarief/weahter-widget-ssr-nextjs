import { cleanEnv, str } from "envalid";


const envVariables = cleanEnv(process.env, {
  OPENWEATHERMAP_API: str(),
  OPENWEATHERMAP_APPID: str(),
});

export default envVariables;


