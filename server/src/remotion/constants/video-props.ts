import { staticFile } from "remotion";
// import { imageJSON } from "../assets/images";
// import { calculateVideoTimeline } from "../utils/calculate-video-timeline";
import { VIDEO_FPS } from "./constants";
import { cloudinaryImage } from "./image";
import { RenderType } from "../types/video.type";

export const generateDefaultVideoProps = (fakeDate: Date) => {
  return {
    type: "dev" as RenderType,
    maxDuration: 60,
    contentLength: 60 * VIDEO_FPS,
    outroScene: {
      image: [],
      caption: [],
    },
    introScene: {
      firstScene: {
        title: "Our Vacation Recap",
        time: fakeDate,
        images: Array.from({ length: 4 }, (_, i) => {
          return staticFile(`/images/intro/first/first_scene_${i + 1}.jpg`);
        }),
      },
      secondScene: {
        firstCaption: "Sẵn sàng ôn lại\nkhoảnh khắc đáng nhớ ?",
        secondCaption: "Bắt đầu ngay thôi !",
        images: cloudinaryImage,
        // images: Array.from({ length: 16 }, (_, i) => {
        //   return `https://inybkzznasdhmswsixhd.supabase.co/storage/v1/object/public/test/test%20(${i + 1}).jpg`;
        // }),
        // direction: "vertical",
      },
    },
    contentScene: [
      {
        title: "Trại cuối tuần diệu kỳ",
        frame: [
          {
            type: "multi",
            category: "event",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991194144_1730885654445.jpg",
                labels: {
                  location: {
                    campsite: 0.9990538954734802,
                    "dorm room": 0.0007846230291761458,
                  },
                  activity: {
                    sleeping: 0.951298713684082,
                    "having a picnic": 0.020154651254415512,
                  },
                  event: {
                    "Camping Weekend": 0.9990028738975525,
                    "Movie Night": 0.0006441063014790416,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991192528_1730885652554.jpg",
                labels: {
                  location: {
                    forest: 0.8516825437545776,
                    hill: 0.08985798060894012,
                  },
                  activity: {
                    "viewing landscape": 0.591037392616272,
                    "watching nature": 0.3628532886505127,
                  },
                  event: {
                    "Camping Weekend": 0.33620813488960266,
                    Safari: 0.24093979597091675,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991194223_1730885654497.jpg",
                labels: {
                  location: {
                    campsite: 0.9572515487670898,
                    "railroad track": 0.012249727733433247,
                  },
                  activity: {
                    "enjoying campfire": 0.8423452377319336,
                    cooking: 0.057870931923389435,
                  },
                  event: {
                    "Camping Weekend": 0.9887754917144775,
                    "Movie Night": 0.006396805867552757,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991193856_1730885654313.jpg",
                labels: {
                  location: {
                    campsite: 0.9982617497444153,
                    stage: 0.001130215241573751,
                  },
                  activity: {
                    "enjoying campfire": 0.9523745179176331,
                    "having a picnic": 0.033978089690208435,
                  },
                  event: {
                    "Camping Weekend": 0.9970893263816833,
                    "Movie Night": 0.0025787027552723885,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_20241106_163501.jpg",
                labels: {
                  location: {
                    campsite: 0.9374444484710693,
                    classroom: 0.025828706100583076,
                  },
                  activity: {
                    "enjoying campfire": 0.9718965291976929,
                    cooking: 0.022361773997545242,
                  },
                  event: {
                    "Camping Weekend": 0.9970433115959167,
                    "Movie Night": 0.0020214072428643703,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991193929_1730885654351.jpg",
                labels: {
                  location: {
                    campsite: 0.7939884066581726,
                    forest: 0.10878600180149078,
                  },
                  activity: {
                    "enjoying campfire": 0.9137821793556213,
                    swing: 0.01803538203239441,
                  },
                  event: {
                    "Camping Weekend": 0.9496564865112305,
                    Halloween: 0.020971043035387993,
                  },
                },
              },
            ],
            activity: "Camping Weekend",
            caption: "Ngủ ngon sau một ngày camping thật tuyệt vời",
            hashtag: ["campinglife", "weekendvibes"],
          },
        ],
        transition: {
          in: "slide-in-from-2-side",
          out: "slide-out-from-2-side",
          type: "self-built",
        },
        durationInFrames: 282,
        hashtag: ["cam_trai", "ngoi_nha_go", "thien_nhien", "vui_ve"],
      },
      {
        title: "Road trip tuyệt vời",
        frame: [
          {
            type: "multi",
            category: "event",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/7764efe0-ee9b-11ef-a426-79d5b0ecba33",
                labels: {
                  location: {
                    tower: 0.5275707840919495,
                    temple: 0.25008007884025574,
                  },
                  activity: {
                    "visiting historical sites": 0.878693163394928,
                    "buying souvenirs": 0.010777365416288376,
                  },
                  event: {
                    Traveling: 0.8565568327903748,
                    Autumn: 0.061174821108579636,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/77667680-ee9b-11ef-a426-79d5b0ecba33",
                labels: {
                  location: {
                    bridge: 0.9204229712486267,
                    forest: 0.037988945841789246,
                  },
                  activity: {
                    "taking nature photos": 0.22037532925605774,
                    "taking landscape photos": 0.18105155229568481,
                  },
                  event: {
                    Traveling: 0.688830554485321,
                    Dating: 0.10569141060113907,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991192260_1730885652373.jpg",
                labels: {
                  location: {
                    lake: 0.9152517318725586,
                    river: 0.034991856664419174,
                  },
                  activity: {
                    fishing: 0.7806551456451416,
                    "taking landscape photos": 0.06409352272748947,
                  },
                  event: {
                    Traveling: 0.6463629603385925,
                    "Road Trip": 0.3355628550052643,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991192185_1730885652200.jpg",
                labels: {
                  location: {
                    lake: 0.9962724447250366,
                    lakeside: 0.0016624709824100137,
                  },
                  activity: {
                    "viewing landscape": 0.5331530570983887,
                    fishing: 0.15384092926979065,
                  },
                  event: {
                    Traveling: 0.6202715635299683,
                    "Road Trip": 0.21939288079738617,
                  },
                },
              },
            ],
            activity: "Traveling",
            caption: "Hành trình khám phá những di tích lịch sử đầy thú vị",
            hashtag: ["travelgram", "historical"],
          },
        ],
        transition: {
          in: "from-top",
          out: "to-bottom",
          type: "remotion-transitions",
        },
        durationInFrames: 267,
        hashtag: ["traveling", "adventure", "roadtrip", "explore"],
      },
      {
        title: "Đêm lửa trại sôi động",
        frame: [
          {
            type: "single",
            category: "activity",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991194144_1730885654445.jpg",
                labels: {
                  location: {
                    campsite: 0.9990538954734802,
                    "dorm room": 0.0007846230291761458,
                  },
                  activity: {
                    sleeping: 0.951298713684082,
                    "having a picnic": 0.020154651254415512,
                  },
                  event: {
                    "Camping Weekend": 0.9990028738975525,
                    "Movie Night": 0.0006441063014790416,
                  },
                },
              },
            ],
            activity: "sleeping",
            caption: "Ngủ vùi ở campsite ngon giấc đến lạ kỳ",
            hashtag: ["sleepycamp", "campingtime"],
          },
          {
            type: "multi",
            category: "activity",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991194223_1730885654497.jpg",
                labels: {
                  location: {
                    campsite: 0.9572515487670898,
                    "railroad track": 0.012249727733433247,
                  },
                  activity: {
                    "enjoying campfire": 0.8423452377319336,
                    cooking: 0.057870931923389435,
                  },
                  event: {
                    "Camping Weekend": 0.9887754917144775,
                    "Movie Night": 0.006396805867552757,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991193035_1730885653224.jpg",
                labels: {
                  location: {
                    campsite: 0.761852502822876,
                    forest: 0.0734461173415184,
                  },
                  activity: {
                    "enjoying campfire": 0.9997497200965881,
                    "watching firework": 0.00016769436479080468,
                  },
                  event: {
                    "Camping Weekend": 0.9558882117271423,
                    "Firework Festival": 0.01859314553439617,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991193856_1730885654313.jpg",
                labels: {
                  location: {
                    campsite: 0.9982617497444153,
                    stage: 0.001130215241573751,
                  },
                  activity: {
                    "enjoying campfire": 0.9523745179176331,
                    "having a picnic": 0.033978089690208435,
                  },
                  event: {
                    "Camping Weekend": 0.9970893263816833,
                    "Movie Night": 0.0025787027552723885,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991193266_1730885653527.jpg",
                labels: {
                  location: {
                    campsite: 0.9969097971916199,
                    forest: 0.0007952018640935421,
                  },
                  activity: {
                    "enjoying campfire": 0.9998464584350586,
                    "watching firework": 0.00010940877109533176,
                  },
                  event: {
                    "Camping Weekend": 0.9804132580757141,
                    "Daily Life Snapshot": 0.011038661934435368,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991193781_1730885654255.jpg",
                labels: {
                  location: {
                    campsite: 0.9978158473968506,
                    sauna: 0.00047605123836547136,
                  },
                  activity: {
                    "enjoying campfire": 0.9892187714576721,
                    cooking: 0.004586998373270035,
                  },
                  event: {
                    "Camping Weekend": 0.9874602556228638,
                    Halloween: 0.0054113976657390594,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991193679_1730885654202.jpg",
                labels: {
                  location: {
                    campsite: 0.9359183311462402,
                    classroom: 0.027283402159810066,
                  },
                  activity: {
                    "enjoying campfire": 0.969231903553009,
                    cooking: 0.02437724731862545,
                  },
                  event: {
                    "Camping Weekend": 0.9972749352455139,
                    "Movie Night": 0.0017700770404189825,
                  },
                },
              },
            ],
            activity: "enjoying campfire",
            caption: "Đêm lửa trại ấm cúng, bao kỷ niệm ùa về",
            hashtag: ["campfirefun", "campnight"],
          },
          {
            type: "single",
            category: "activity",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991194049_1730885654405.jpg",
                labels: {
                  location: {
                    campsite: 0.9991770386695862,
                    "outdoor diner": 0.00024240170023404062,
                  },
                  activity: {
                    cooking: 0.31651070713996887,
                    "having a picnic": 0.30800625681877136,
                  },
                  event: {
                    "Camping Weekend": 0.9995039701461792,
                    "Movie Night": 0.0003457351995166391,
                  },
                },
              },
            ],
            activity: "cooking",
            caption: "Món ngon tự nấu, trải nghiệm camping cực chill",
            hashtag: ["campcook", "outdoorfood"],
          },
          {
            type: "single",
            category: "activity",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991194411_1730885654606.jpg",
                labels: {
                  location: {
                    campsite: 0.6998981833457947,
                    "dorm room": 0.12055036425590515,
                  },
                  activity: {
                    "playing guitar": 0.30206361413002014,
                    "playing video game": 0.14620277285575867,
                  },
                  event: {
                    "Camping Weekend": 0.6873068809509277,
                    Conversation: 0.3091689646244049,
                  },
                },
              },
            ],
            activity: "playing guitar",
            caption: "Tiếng đàn guitar trong đêm, thêm chút lãng mạn",
            hashtag: ["guitarcamp", "campingmusic"],
          },
        ],
        transition: {
          in: "from-top",
          out: "to-bottom",
          type: "remotion-transitions",
        },
        durationInFrames: 573,
        hashtag: ["camp", "campfire", "goodvibes", "friends"],
      },
      {
        title: "Chốn yên bình vùng quê",
        frame: [
          {
            type: "multi",
            category: "activity",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991192185_1730885652200.jpg",
                labels: {
                  location: {
                    lake: 0.9962724447250366,
                    lakeside: 0.0016624709824100137,
                  },
                  activity: {
                    "viewing landscape": 0.5331530570983887,
                    fishing: 0.15384092926979065,
                  },
                  event: {
                    Traveling: 0.6202715635299683,
                    "Road Trip": 0.21939288079738617,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991192334_1730885652442.jpg",
                labels: {
                  location: {
                    lake: 0.9872855544090271,
                    river: 0.01021531131118536,
                  },
                  activity: {
                    "viewing landscape": 0.39564403891563416,
                    fishing: 0.31279101967811584,
                  },
                  event: {
                    "Road Trip": 0.4345370829105377,
                    Traveling: 0.2785246968269348,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991192528_1730885652554.jpg",
                labels: {
                  location: {
                    forest: 0.8516825437545776,
                    hill: 0.08985798060894012,
                  },
                  activity: {
                    "viewing landscape": 0.591037392616272,
                    "watching nature": 0.3628532886505127,
                  },
                  event: {
                    "Camping Weekend": 0.33620813488960266,
                    Safari: 0.24093979597091675,
                  },
                },
              },
            ],
            activity: "viewing landscape",
            caption: "Phong cảnh hữu tình, xua tan bao mệt mỏi đường xa",
            hashtag: ["landscapelovers", "naturetrip"],
          },
          {
            type: "single",
            category: "activity",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991192260_1730885652373.jpg",
                labels: {
                  location: {
                    lake: 0.9152517318725586,
                    river: 0.034991856664419174,
                  },
                  activity: {
                    fishing: 0.7806551456451416,
                    "taking landscape photos": 0.06409352272748947,
                  },
                  event: {
                    Traveling: 0.6463629603385925,
                    "Road Trip": 0.3355628550052643,
                  },
                },
              },
            ],
            activity: "fishing",
            caption: "Bình yên câu cá bên hồ, quên hết muộn phiền",
            hashtag: ["fishingtime", "lakelife"],
          },
          {
            type: "single",
            category: "activity",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/IMG_1707991192419_1730885652498.jpg",
                labels: {
                  location: {
                    forest: 0.9978812336921692,
                    sky: 0.0008543999283574522,
                  },
                  activity: {
                    "watching nature": 0.4696832597255707,
                    "taking nature photos": 0.3966423571109772,
                  },
                  event: {
                    "Camping Weekend": 0.7463539838790894,
                    "Daily Life Snapshot": 0.06621325016021729,
                  },
                },
              },
            ],
            activity: "watching nature",
            caption: "Thiên nhiên hùng vĩ, tâm hồn như được chữa lành",
            hashtag: ["forestview", "naturelover"],
          },
        ],
        transition: {
          in: "slide-in-from-2-side",
          out: "slide-out-from-2-side",
          type: "self-built",
        },
        durationInFrames: 621,
        hashtag: ["rural_life", "peaceful", "nature", "landscape"],
      },
      {
        title: "Hành trình vạn dặm",
        frame: [
          {
            type: "single",
            category: "activity",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/77667681-ee9b-11ef-a426-79d5b0ecba33",
                labels: {
                  location: {
                    bridge: 0.9894932508468628,
                    coast: 0.006693222094327211,
                  },
                  activity: {
                    "walking on beach": 0.555155873298645,
                    "rope climbing": 0.18417595326900482,
                  },
                  event: {
                    Marathon: 0.3952591121196747,
                    Summer: 0.32457733154296875,
                  },
                },
              },
            ],
            activity: "walking on beach",
            caption: "Bước chân trên cầu, đón ánh nắng ban mai",
            hashtag: ["beachwalk", "marathon"],
          },
          {
            type: "single",
            category: "activity",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/77667680-ee9b-11ef-a426-79d5b0ecba33",
                labels: {
                  location: {
                    bridge: 0.9204229712486267,
                    forest: 0.037988945841789246,
                  },
                  activity: {
                    "taking nature photos": 0.22037532925605774,
                    "taking landscape photos": 0.18105155229568481,
                  },
                  event: {
                    Traveling: 0.688830554485321,
                    Dating: 0.10569141060113907,
                  },
                },
              },
            ],
            activity: "taking nature photos",
            caption: "Khoảnh khắc đẹp tựa tranh, lưu giữ kỷ niệm",
            hashtag: ["naturephotos", "travelpics"],
          },
        ],
        transition: {
          in: "slide-from-left",
          out: "slide-to-right",
          type: "self-built",
        },
        durationInFrames: 444,
        hashtag: ["travel", "journey", "transport", "explore"],
      },
      {
        title: "Khoảnh khắc khác",
        frame: [
          {
            type: "single",
            category: "activity",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/e6a99c3a-4b41-4f49-98b7-d97afedf4f66/7764efe0-ee9b-11ef-a426-79d5b0ecba33",
                labels: {
                  location: {
                    tower: 0.5275707840919495,
                    temple: 0.25008007884025574,
                  },
                  activity: {
                    "visiting historical sites": 0.878693163394928,
                    "buying souvenirs": 0.010777365416288376,
                  },
                  event: {
                    Traveling: 0.8565568327903748,
                    Autumn: 0.061174821108579636,
                  },
                },
              },
            ],
            activity: "visiting historical sites",
            caption: "Ngắm nhìn thành phố từ trên cao, thật choáng ngợp",
            hashtag: ["towergram", "historicplace"],
          },
        ],
        transition: {
          in: "slide-in-from-2-side",
          out: "slide-out-from-2-side",
          type: "self-built",
        },
        durationInFrames: 282,
        hashtag: ["friendship", "together", "memories", "happy"],
      },
    ],
    bgMusic: "/music/intro/happy_5.mp3",
    bgVideo: {
      src: "/videos/season_bg/summer/summer_2.mp4",
      frameLength: 0,
    },
    videoDate: "2025-07-24T03:44:58.207Z",
    titleStyle: 0,
    // contentScene: calculateVideoTimeline(imageJSON).map(
    //   (chapterWithDuration) => {
    //     return {
    //       ...chapterWithDuration,
    //       frame: chapterWithDuration.frame.map((frame) => {
    //         return {
    //           ...frame,
    //           images: frame.images.map((img) => {
    //             return {
    //               ...img,
    //               path: staticFile(
    //                 img.path.replace(
    //                   "D:/Code Space/AI/image_classification/model/image",
    //                   "/images"
    //                 )
    //               ),
    //             };
    //           }),
    //         };
    //       }),
    //     };
    //   }
    // ),
    // videoDate: fakeDate,
    // bgMusic: staticFile("/music/intro/accoutic_2.mp3"),
    // bgVideo: {
    //   src: staticFile("/videos/season_bg/spring/spring_6.mov"),
    //   frameLength: 10 * VIDEO_FPS,
    // },
    // titleStyle: 0,
  };
};
