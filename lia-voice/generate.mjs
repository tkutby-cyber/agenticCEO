import { EdgeTTS } from "edge-tts-universal";
import { writeFile } from "node:fs/promises";

const text = process.argv.slice(2).join(" ") || "Cara... tem uma coisa que eu comecei a reparar. Tem gente que some completamente e aparece justo quando precisa de alguma coisa. E eu demorei muito pra perceber isso.";
const voice = process.env.LIA_VOICE || "pt-BR-ThalitaMultilingualNeural";
if (!voice.startsWith("pt-BR-")) throw new Error("Blocked: Lia voice must be pt-BR");
const tts = new EdgeTTS(text, voice, { rate: "-2%", volume: "+0%", pitch: "-1Hz" });
const result = await tts.synthesize();
const audio = Buffer.from(await result.audio.arrayBuffer());
if (audio.length < 1000) throw new Error("Audio validation failed");
await writeFile("lia-ptbr.mp3", audio);
console.log(JSON.stringify({ok:true,voice,bytes:audio.length,file:"lia-ptbr.mp3"}));
