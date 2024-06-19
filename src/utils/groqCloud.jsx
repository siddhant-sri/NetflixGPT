import Groq from "groq-sdk";
import { GROQ_CLOUD_KEY } from "./constants";

const groq = new Groq({
  apiKey: GROQ_CLOUD_KEY,
  dangerouslyAllowBrowser: true,
});

export default groq;
