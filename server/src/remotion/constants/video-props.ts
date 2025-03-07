import { staticFile } from "remotion";
// import { imageJSON } from "../assets/images";
// import { calculateVideoTimeline } from "../utils/calculate-video-timeline";
import { VIDEO_FPS } from "./constants";
import { cloudinaryImage } from "./image";
import { RenderType } from "../types/video.type";

export const generateDefaultVideoProps = (fakeDate: Date) => {
  return {
    type: "dev" as RenderType,
    contentLength: 60 * VIDEO_FPS,
    outroScene: {
      image: [],
      caption: [],
    },
    // specialPart: {
    //   totalFaces: 30,
    //   faces: [
    //     {
    //       image:
    //         "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1051569013081403.jpeg",
    //       name: "Duy Bui",
    //       coordinate: [456, 318, 626, 148],
    //       times: 47,
    //     },
    //     {
    //       image:
    //         "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_505896265642044.jpeg",
    //       name: "Duy Kien",
    //       coordinate: [388, 1333, 557, 1163],
    //       times: 21,
    //     },
    //     {
    //       image:
    //         "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1049821016446417.jpeg",
    //       name: "Thanh Dung",
    //       coordinate: [576, 1113, 674, 1014],
    //       times: 20,
    //     },
    //     {
    //       image:
    //         "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1327089667931628.jpeg",
    //       name: "Le Khai",
    //       coordinate: [837, 384, 877, 345],
    //       times: 7,
    //     },
    //   ],
    // },
    specialPart: {
      totalFaces: 8,
      faces: [
        {
          image:
            "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/lol.jpg",
          name: "Thanh Dung",
          coordinate: [317, 1271, 415, 1172],
          times: 5,
        },
        {
          image:
            "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/4032.jpg",
          name: "Tuan Anh",
          coordinate: [300, 1185, 418, 1067],
          times: 4,
        },
        {
          image:
            "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/403.jpg",
          name: "Hoang Viet",
          coordinate: [383, 129, 553, 0],
          times: 3,
        },
        {
          image:
            "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_309462195271174.jpeg",
          name: "Duy",
          coordinate: [868, 732, 950, 650],
          times: 2,
        },
        {
          image:
            "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_309462195271174.jpeg",
          name: "Duy",
          coordinate: [868, 732, 950, 650],
          times: 2,
        },
      ],
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
        frame: [
          {
            type: "multi",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1049821016446417.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.04535497725009918,
                    "Friend Meet-Up": 0.9067891240119934,
                  },
                  activity: {
                    eating: 0.24822929501533508,
                    selfie: 0.5394573211669922,
                  },
                  location: {
                    bakery: 0.11511130630970001,
                    restaurant: 0.3224794566631317,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_496139803334344.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.03859127685427666,
                    "Friend Meet-Up": 0.9176316857337952,
                  },
                  activity: {
                    eating: 0.6099271774291992,
                    cooking: 0.10801807790994644,
                  },
                  location: {
                    restaurant: 0.5565553903579712,
                    "coffee shop": 0.12786974012851715,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_511924411768179.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.021670062094926834,
                    "Friend Meet-Up": 0.9580963850021362,
                  },
                  activity: {
                    eating: 0.5294612646102905,
                    selfie: 0.17164519429206848,
                  },
                  location: {
                    restaurant: 0.09308461099863052,
                    "karaoke bar": 0.6552709937095642,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1327089667931628.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.16049732267856598,
                    "Friend Meet-Up": 0.6015645861625671,
                  },
                  activity: {
                    selfie: 0.16987450420856476,
                    "playing video game": 0.7302147150039673,
                  },
                  location: {
                    "coffee shop": 0.4429040551185608,
                    "internet cafe": 0.184102401137352,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1051569013081403.jpeg",
                labels: {
                  event: {
                    Meeting: 0.057974860072135925,
                    "Friend Meet-Up": 0.8969227075576782,
                  },
                  activity: {
                    cooking: 0.16097167134284973,
                    "ordering from menu": 0.35916557908058167,
                  },
                  location: {
                    reception: 0.21796560287475586,
                    restaurant: 0.42746713757514954,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1090376241932568.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.3396841585636139,
                    "Friend Meet-Up": 0.49173444509506226,
                  },
                  activity: {
                    selfie: 0.36028507351875305,
                    "playing video game": 0.40915608406066895,
                  },
                  location: {
                    "coffee shop": 0.4591841697692871,
                    "karaoke bar": 0.20005974173545837,
                  },
                },
              },
            ],
            caption: "Hội bạn thân, cháy hết mình!",
            hashtag: ["gap_mat_ban", "selfie_ky_niem"],
            activity: "Friend Meet-Up",
            category: "event",
          },
        ],
        title: "Hội ngộ bạn bè",
        hashtag: ["bff_time", "friendshipgoals", "hangout", "reunion"],
        transition: {
          in: "from-right",
          out: "to-left",
          type: "remotion-transitions",
        },
        durationInFrames: 222,
      },
      {
        frame: [
          {
            type: "multi",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_12.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.6306526064872742,
                    "Sports Activity": 0.2351202517747879,
                  },
                  activity: {
                    biking: 0.19376979768276215,
                    cycling: 0.23954316973686218,
                  },
                  location: {
                    highway: 0.0857120081782341,
                    mountain: 0.3006894290447235,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_15.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.37700438499450684,
                    "Sports Activity": 0.20042496919631958,
                  },
                  activity: {
                    biking: 0.2772754430770874,
                    cycling: 0.20902402698993683,
                  },
                  location: {
                    lake: 0.09777851402759552,
                    temple: 0.10750119388103485,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_6.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.4269961416721344,
                    "Friend Meet-Up": 0.26694756746292114,
                  },
                  activity: {
                    selfie: 0.9560202360153198,
                    cycling: 0.029759369790554047,
                  },
                  location: {
                    highway: 0.652844250202179,
                    cityscape: 0.10309556871652603,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_14.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.4248877465724945,
                    "Sports Activity": 0.21679258346557617,
                  },
                  activity: {
                    biking: 0.38500282168388367,
                    cycling: 0.25263360142707825,
                  },
                  location: {
                    temple: 0.1232651099562645,
                    highway: 0.11411863565444946,
                  },
                },
              },
            ],
            caption: "Trên yên xe, khám phá thế giới.",
            hashtag: ["road_trip", "cycling_fun"],
            activity: "Road Trip",
            category: "event",
          },
        ],
        title: "Trên những cung đường",
        hashtag: ["travelgram", "road_trip", "adventuretime", "explore"],
        transition: {
          in: "slide-in-from-2-side",
          out: "slide-out-from-2-side",
          type: "self-built",
        },
        durationInFrames: 327,
      },
      {
        frame: [
          {
            type: "multi",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_2333624286982887.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.010864113457500935,
                    "Friend Meet-Up": 0.9795076251029968,
                  },
                  activity: {
                    eating: 0.39847809076309204,
                    selfie: 0.37801697850227356,
                  },
                  location: {
                    "food court": 0.17544735968112946,
                    restaurant: 0.27599531412124634,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_505896265642044.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.01686352863907814,
                    "Friend Meet-Up": 0.942792534828186,
                  },
                  activity: {
                    eating: 0.4831874668598175,
                    "mixing batter": 0.12693579494953156,
                  },
                  location: {
                    bakery: 0.20758864283561707,
                    restaurant: 0.3182390034198761,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_496139803334344.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.03859127685427666,
                    "Friend Meet-Up": 0.9176316857337952,
                  },
                  activity: {
                    eating: 0.6099271774291992,
                    cooking: 0.10801807790994644,
                  },
                  location: {
                    restaurant: 0.5565553903579712,
                    "coffee shop": 0.12786974012851715,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_379335865116005.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.03366122394800186,
                    "Friend Meet-Up": 0.9354135394096375,
                  },
                  activity: {
                    eating: 0.698280930519104,
                    cooking: 0.08361310511827469,
                  },
                  location: {
                    restaurant: 0.293842613697052,
                    "coffee shop": 0.24498796463012695,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_2449466948723908.jpeg",
                labels: {
                  event: {
                    Meeting: 0.1395973563194275,
                    "Friend Meet-Up": 0.762370228767395,
                  },
                  activity: {
                    eating: 0.5858100056648254,
                    cooking: 0.121861033141613,
                  },
                  location: {
                    reception: 0.131851464509964,
                    restaurant: 0.6332571506500244,
                  },
                },
              },
            ],
            caption: "Ăn sập mặt, đời thêm vui.",
            hashtag: ["an_ngon", "meet_up"],
            activity: "eating",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_899257425037994.jpeg",
                labels: {
                  event: {
                    Karaoke: 0.15683968365192413,
                    "Street Food Festival": 0.16982430219650269,
                  },
                  activity: {
                    "mixing batter": 0.9231089949607849,
                    "pouring drinking": 0.04956958815455437,
                  },
                  location: {
                    restaurant: 0.5589512586593628,
                    "coffee shop": 0.30067184567451477,
                  },
                },
              },
            ],
            caption: "Ẩm thực đường phố lên ngôi!",
            hashtag: ["street_food", "batter_time"],
            activity: "mixing batter",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1049821016446417.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.04535497725009918,
                    "Friend Meet-Up": 0.9067891240119934,
                  },
                  activity: {
                    eating: 0.24822929501533508,
                    selfie: 0.5394573211669922,
                  },
                  location: {
                    bakery: 0.11511130630970001,
                    restaurant: 0.3224794566631317,
                  },
                },
              },
            ],
            caption: "Selfie mọi lúc, mọi nơi.",
            hashtag: ["selfie_dep", "restaurant"],
            activity: "selfie",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1051569013081403.jpeg",
                labels: {
                  event: {
                    Meeting: 0.057974860072135925,
                    "Friend Meet-Up": 0.8969227075576782,
                  },
                  activity: {
                    cooking: 0.16097167134284973,
                    "ordering from menu": 0.35916557908058167,
                  },
                  location: {
                    reception: 0.21796560287475586,
                    restaurant: 0.42746713757514954,
                  },
                },
              },
            ],
            caption: "Chọn món thôi nào, bạn ơi!",
            hashtag: ["order_now", "menu_time"],
            activity: "ordering from menu",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1768910377288597.jpeg",
                labels: {
                  event: {
                    Meeting: 0.029516903683543205,
                    "Friend Meet-Up": 0.9342104196548462,
                  },
                  activity: {
                    eating: 0.26485973596572876,
                    cooking: 0.5278739929199219,
                  },
                  location: {
                    restaurant: 0.5207197070121765,
                    "dining room": 0.22960105538368225,
                  },
                },
              },
            ],
            caption: "Vào bếp trổ tài siêu đầu bếp.",
            hashtag: ["cooking_fun", "chefdays"],
            activity: "cooking",
            category: "activity",
          },
        ],
        title: "Thưởng thức ẩm thực đường phố",
        hashtag: ["foodie", "am_thuc_duong_pho", "streetfood", "foodlover"],
        transition: {
          in: "slide-from-left",
          out: "slide-to-right",
          type: "self-built",
        },
        durationInFrames: 915,
      },
      {
        frame: [
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_374670081578359.jpeg",
                labels: {
                  event: {
                    "Friend Meet-Up": 0.4031553268432617,
                    "Sunrise and Sunset": 0.419520765542984,
                  },
                  activity: {
                    "ordering from menu": 0.22649985551834106,
                    "checking into hotel": 0.3366377651691437,
                  },
                  location: {
                    "clothing store": 0.11270316690206528,
                    "subway station": 0.5535827875137329,
                  },
                },
              },
            ],
            caption: "Bình minh và hoàng hôn tuyệt đẹp.",
            hashtag: ["check_in", "hotel_time"],
            activity: "checking into hotel",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1048309386417001.jpeg",
                labels: {
                  event: {
                    "Friend Meet-Up": 0.03909412398934364,
                    "Sunrise and Sunset": 0.8919769525527954,
                  },
                  activity: {
                    "ordering from menu": 0.2877567410469055,
                    "checking into hotel": 0.14447559416294098,
                  },
                  location: {
                    "clothing store": 0.06743808835744858,
                    "subway station": 0.7928863167762756,
                  },
                },
              },
            ],
            caption: "Gọi món, chuẩn bị no bụng.",
            hashtag: ["menu_order", "sunrise_view"],
            activity: "ordering from menu",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_6.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.4269961416721344,
                    "Friend Meet-Up": 0.26694756746292114,
                  },
                  activity: {
                    selfie: 0.9560202360153198,
                    cycling: 0.029759369790554047,
                  },
                  location: {
                    highway: 0.652844250202179,
                    cityscape: 0.10309556871652603,
                  },
                },
              },
            ],
            caption: "Trên đường đi, lưu giữ khoảnh khắc.",
            hashtag: ["highway", "selfie_time"],
            activity: "selfie",
            category: "activity",
          },
        ],
        title: "Chuyến đi đáng nhớ",
        hashtag: ["travel_now", "wanderlust", "dulich", "travel_life"],
        transition: {
          in: "from-left",
          out: "to-right",
          type: "remotion-transitions",
        },
        durationInFrames: 456,
      },
      {
        frame: [
          {
            type: "multi",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1252827226159538.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.024826278910040855,
                    "Friend Meet-Up": 0.9563546180725098,
                  },
                  activity: {
                    eating: 0.5085948705673218,
                    drinking: 0.13310833275318146,
                  },
                  location: {
                    restaurant: 0.25614574551582336,
                    "coffee shop": 0.2703225314617157,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1060150115742110.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.087147556245327,
                    "Friend Meet-Up": 0.8155308961868286,
                  },
                  activity: {
                    eating: 0.6195562481880188,
                    cooking: 0.08077482134103775,
                  },
                  location: {
                    restaurant: 0.34169337153434753,
                    "coffee shop": 0.395929217338562,
                  },
                },
              },
            ],
            caption: "Cafe chiều, chuyện trò rôm rả.",
            hashtag: ["coffee_time", "eating_time"],
            activity: "eating",
            category: "activity",
          },
          {
            type: "multi",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1090376241932568.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.3396841585636139,
                    "Friend Meet-Up": 0.49173444509506226,
                  },
                  activity: {
                    selfie: 0.36028507351875305,
                    "playing video game": 0.40915608406066895,
                  },
                  location: {
                    "coffee shop": 0.4591841697692871,
                    "karaoke bar": 0.20005974173545837,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1327089667931628.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.16049732267856598,
                    "Friend Meet-Up": 0.6015645861625671,
                  },
                  activity: {
                    selfie: 0.16987450420856476,
                    "playing video game": 0.7302147150039673,
                  },
                  location: {
                    "coffee shop": 0.4429040551185608,
                    "internet cafe": 0.184102401137352,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1776842986121152.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.49568697810173035,
                    "Friend Meet-Up": 0.36194196343421936,
                  },
                  activity: {
                    selfie: 0.2531505227088928,
                    "playing video game": 0.6360368728637695,
                  },
                  location: {
                    "coffee shop": 0.2466355264186859,
                    "ice cream parlor": 0.3693945109844208,
                  },
                },
              },
            ],
            caption: "Tuổi thơ dữ dội tại quán quen.",
            hashtag: ["video_game", "birthday_fun"],
            activity: "playing video game",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_2233108010381492.jpeg",
                labels: {
                  event: {
                    "Food Festival": 0.20988398790359497,
                    "Daily Life Snapshot": 0.4392282962799072,
                  },
                  activity: {
                    cooking: 0.3573792576789856,
                    "mixing batter": 0.4365667700767517,
                  },
                  location: {
                    restaurant: 0.07222414761781693,
                    "coffee shop": 0.849845826625824,
                  },
                },
              },
            ],
            caption: "Quẩy banh nóc cùng bạn bè.",
            hashtag: ["mixing_time", "daily_life"],
            activity: "mixing batter",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_923963489554495.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.030756555497646332,
                    "Friend Meet-Up": 0.9422709941864014,
                  },
                  activity: {
                    eating: 0.2782343924045563,
                    selfie: 0.6096749305725098,
                  },
                  location: {
                    bakery: 0.4253605604171753,
                    restaurant: 0.22080384194850922,
                  },
                },
              },
            ],
            caption: "Check-in tiệm bánh siêu xinh.",
            hashtag: ["selfie_bakery", "bakery_time"],
            activity: "selfie",
            category: "activity",
          },
        ],
        title: "Góc quán quen",
        hashtag: ["coffeelover", "cafe_vn", "chillvibes", "coffeeshop"],
        transition: {
          in: "from-right",
          out: "to-left",
          type: "remotion-transitions",
        },
        durationInFrames: 588,
      },
      {
        frame: [
          {
            type: "multi",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_14.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.4248877465724945,
                    "Sports Activity": 0.21679258346557617,
                  },
                  activity: {
                    biking: 0.38500282168388367,
                    cycling: 0.25263360142707825,
                  },
                  location: {
                    temple: 0.1232651099562645,
                    highway: 0.11411863565444946,
                  },
                },
              },
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_15.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.37700438499450684,
                    "Sports Activity": 0.20042496919631958,
                  },
                  activity: {
                    biking: 0.2772754430770874,
                    cycling: 0.20902402698993683,
                  },
                  location: {
                    lake: 0.09777851402759552,
                    temple: 0.10750119388103485,
                  },
                },
              },
            ],
            caption: "Đạp xe vi vu chốn linh thiêng.",
            hashtag: ["biking_time", "temple_tour"],
            activity: "biking",
            category: "activity",
          },
        ],
        title: "Khám phá văn hóa",
        hashtag: ["lich_su_viet", "heritage", "culturetrip", "history"],
        transition: {
          in: "from-left",
          out: "to-right",
          type: "remotion-transitions",
        },
        durationInFrames: 267,
      },
      {
        frame: [
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_16.jpg",
                labels: {
                  event: {
                    Conversation: 0.007180486805737019,
                    "Camping Weekend": 0.9842991828918457,
                  },
                  activity: {
                    "watching nature": 0.5267074108123779,
                    "taking nature photos": 0.15595774352550507,
                  },
                  location: {
                    park: 0.029157089069485664,
                    campsite: 0.9640669822692871,
                  },
                },
              },
            ],
            caption: "Hòa mình vào thiên nhiên hoang dã.",
            hashtag: ["nature_view", "camping"],
            activity: "watching nature",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_12.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.6306526064872742,
                    "Sports Activity": 0.2351202517747879,
                  },
                  activity: {
                    biking: 0.19376979768276215,
                    cycling: 0.23954316973686218,
                  },
                  location: {
                    highway: 0.0857120081782341,
                    mountain: 0.3006894290447235,
                  },
                },
              },
            ],
            caption: "Vượt núi, chinh phục thử thách.",
            hashtag: ["cycling", "mountain_trip"],
            activity: "cycling",
            category: "activity",
          },
        ],
        title: "Hòa mình vào thiên nhiên",
        hashtag: ["naturelover", "greenlife", "ecotravel", "countryside"],
        transition: {
          in: "slide-from-left",
          out: "slide-to-right",
          type: "self-built",
        },
        durationInFrames: 444,
      },
      {
        frame: [
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_309462195271174.jpeg",
                labels: {
                  event: {
                    "Friend Meet-Up": 0.10851601511240005,
                    "Sunrise and Sunset": 0.7145915031433105,
                  },
                  activity: {
                    "ordering from menu": 0.1724906861782074,
                    "checking into hotel": 0.4115294814109802,
                  },
                  location: {
                    office: 0.21892836689949036,
                    "subway station": 0.159035325050354,
                  },
                },
              },
            ],
            caption: "Nhận phòng, sẵn sàng cho ngày mới.",
            hashtag: ["hotel_check", "sunrise"],
            activity: "checking into hotel",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_295257809977070.jpeg",
                labels: {
                  event: {
                    Meeting: 0.06366688758134842,
                    "Friend Meet-Up": 0.9100959897041321,
                  },
                  activity: {
                    waving: 0.26404768228530884,
                    "giving presentation": 0.2807750701904297,
                  },
                  location: {
                    office: 0.34524574875831604,
                    "office space": 0.45499134063720703,
                  },
                },
              },
            ],
            caption: "Thuyết trình đỉnh cao, hết mình vì đam mê.",
            hashtag: ["presentation", "officelife"],
            activity: "giving presentation",
            category: "activity",
          },
        ],
        title: "Ngày làm việc hiệu quả",
        hashtag: [
          "workhardplayhard",
          "studygram",
          "productivity",
          "officelife",
        ],
        transition: {
          in: "from-bottom",
          out: "to-top",
          type: "remotion-transitions",
        },
        durationInFrames: 354,
      },
      {
        frame: [
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1037770540573828.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.9977136850357056,
                    "New Year Celebrations": 0.0021146961953490973,
                  },
                  activity: {
                    "blowing candles": 0.12440869212150574,
                    "playing video game": 0.7505380511283875,
                  },
                  location: {
                    "karaoke bar": 0.564518392086029,
                    "internet cafe": 0.31240251660346985,
                  },
                },
              },
            ],
            caption: "Hát hò thả ga, quẩy tung nóc!",
            hashtag: ["videogame", "karaoke"],
            activity: "playing video game",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_511924411768179.jpeg",
                labels: {
                  event: {
                    "Birthday Party": 0.021670062094926834,
                    "Friend Meet-Up": 0.9580963850021362,
                  },
                  activity: {
                    eating: 0.5294612646102905,
                    selfie: 0.17164519429206848,
                  },
                  location: {
                    restaurant: 0.09308461099863052,
                    "karaoke bar": 0.6552709937095642,
                  },
                },
              },
            ],
            caption: "Ăn uống no say, vui hết nấc.",
            hashtag: ["eating_bar", "karaoketime"],
            activity: "eating",
            category: "activity",
          },
        ],
        title: "Cuộc sống tươi đẹp",
        hashtag: ["lifestyle", "weekendvibes", "goodtimes", "happy"],
        transition: {
          in: "from-bottom",
          out: "to-top",
          type: "remotion-transitions",
        },
        durationInFrames: 354,
      },
      {
        frame: [
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_17.jpg",
                labels: {
                  event: {
                    Karaoke: 0.14355477690696716,
                    "Camping Weekend": 0.28885146975517273,
                  },
                  activity: {
                    drumming: 0.8391054272651672,
                    "enjoying campfire": 0.09928610175848007,
                  },
                  location: {
                    "amusement park": 0.1315069943666458,
                    "festival ground": 0.23150163888931274,
                  },
                },
              },
            ],
            caption: "Tiếng trống vang vọng núi rừng.",
            hashtag: ["drumming", "camping_fun"],
            activity: "drumming",
            category: "activity",
          },
        ],
        title: "Khoảnh khắc khác",
        hashtag: ["team_goals", "together", "memories", "grouptrip"],
        transition: {
          in: "from-right",
          out: "to-left",
          type: "remotion-transitions",
        },
        durationInFrames: 237,
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
