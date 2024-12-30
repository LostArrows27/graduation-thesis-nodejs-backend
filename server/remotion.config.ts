/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind";

Config.setEntryPoint("src/remotion/index.ts");
Config.setStudioPort(5001);

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// NOTE: config perfomance + speeds
Config.setCodec("h264");
Config.setAudioCodec("mp3");
Config.setConcurrency(10); // -> this give fastest render -> max(perfomance) = Math.floor(os.cpus().length / 2)
Config.setChromiumOpenGlRenderer("angle");
Config.setChromiumHeadlessMode(true);
