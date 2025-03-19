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
    introScene: {
      firstScene: {
        title: "Chuyến đi của chúng ta",
        images: [
          "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_505896265642044.jpeg",
          "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_12.jpg",
          "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_374670081578359.jpeg",
          "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test.jpg",
        ],
      },
      secondScene: {
        images: [
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/rzkcodlodectmwxyqfcj?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/egqod6z01zsuk2hoifqc?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/tgysfvhbhoycndaecw0y?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/vpwd7lt00g5ypq4swexx?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/nnefebksvq7b3bm7xmr2?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/xkzybg7gwkdbyglqaiyk?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/bpybdaol3q7vrhfyvrn8?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/oykcbmupdpr6jv98nb83?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/dcjrgznkl9lapkfuvhdn?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/sqzhixuf7sgofszpcqlo?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/os7sbkxekanmxzeggigp?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/xqnjjbmt5r0fz1searki?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/d7b59xwl22spcvgmixdi?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/jtu6povr8fpztq7tb0uk?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/r6d0l12nvsaug9agnoxu?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/z1exbvcaiby45zfbvin5?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/giuloa2uekleggpas1xt?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/bvguf2sbsag0gaoq6mck?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/yzusmtmjrujogli5rf0v?_a=DATAg1OYZAA0",
          "https://res.cloudinary.com/dkc9yplyv/image/upload/ar_10:7,c_fill,w_384/j7wmerrdwaxwfow9uhcz?_a=DATAg1OYZAA0",
        ],
      },
    },
    titleStyle: 1,
    specialPart: {
      faces: [
        {
          name: "Duy Bui",
          image:
            "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1049821016446417.jpeg",
          times: 58,
          coordinate: [518, 1275, 636, 1157],
        },
        {
          name: "Thanh Dung",
          image:
            "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1048309386417001.jpeg",
          times: 19,
          coordinate: [868, 566, 950, 484],
        },
        {
          name: "Tuan Anh senpais",
          image:
            "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test/received_1048309386417001.jpeg",
          times: 5,
          coordinate: [901, 779, 999, 681],
        },
        {
          name: "Duong",
          image:
            "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_6.jpg",
          times: 4,
          coordinate: [504, 714, 646, 572],
        },
      ],
      totalFaces: 31,
    },
    contentScene: [
      {
        frame: [
          {
            type: "multi",
            images: [
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
            caption: "Bạn bè lâu ngày, gặp là vui!",
            hashtag: ["gặp_bạn_bè", "ăn_uống"],
            activity: "Friend Meet-Up",
            category: "event",
          },
        ],
        title: "Hội ngộ bất ngờ",
        hashtag: [
          "gặp_gỡ_bạn_bè",
          "friends_reunion",
          "chill_cùng_bạn",
          "bff_time",
        ],
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
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_11.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.6415058970451355,
                    "Sports Activity": 0.20985789597034454,
                  },
                  activity: {
                    biking: 0.25655487179756165,
                    cycling: 0.31023964285850525,
                  },
                  location: {
                    highway: 0.14898726344108582,
                    mountain: 0.20485809445381165,
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
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_13.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.5426415801048279,
                    "Sports Activity": 0.2709953486919403,
                  },
                  activity: {
                    biking: 0.24649205803871155,
                    cycling: 0.17184533178806305,
                  },
                  location: {
                    factory: 0.0983627662062645,
                    mountain: 0.2626917362213135,
                  },
                },
              },
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
            caption: "Đạp xe xuyên Việt, cháy hết mình.",
            hashtag: ["roadtrip", "cycling"],
            activity: "Road Trip",
            category: "event",
          },
        ],
        title: "Trên những cung đường",
        hashtag: ["roadtrip", "adventureawaits", "onthego", "openroad"],
        transition: {
          in: "from-top",
          out: "to-bottom",
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
            caption: "Bình minh phố thị, một mình một trạm.",
            hashtag: ["hotelcheckin", "sunrise"],
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
            caption: "Gọi món ngon, chờ đợi là hạnh phúc.",
            hashtag: ["ordertomenu", "sunset"],
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
            caption: "Trên đường ta là những lãng tử.",
            hashtag: ["selfie", "highway"],
            activity: "selfie",
            category: "activity",
          },
        ],
        title: "Những chuyến đi",
        hashtag: [
          "travelgram",
          "explorepage",
          "wanderlust",
          "travelphotography",
        ],
        transition: {
          in: "slide-from-left",
          out: "slide-to-right",
          type: "self-built",
        },
        durationInFrames: 591,
      },
      {
        frame: [
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test.jpg",
                labels: {
                  event: {
                    Conversation: 0.3091689646244049,
                    "Camping Weekend": 0.6873068809509277,
                  },
                  activity: {
                    "playing guitar": 0.30206361413002014,
                    "playing video game": 0.14620277285575867,
                  },
                  location: {
                    campsite: 0.6998981833457947,
                    "dorm room": 0.12055036425590515,
                  },
                },
              },
            ],
            caption: "Hát nghêu ngao, đêm lửa trại.",
            hashtag: ["camping", "guitar"],
            activity: "playing guitar",
            category: "activity",
          },
          {
            type: "multi",
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
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_4.jpg",
                labels: {
                  event: {
                    Conversation: 0.007295313291251659,
                    "Camping Weekend": 0.9841486811637878,
                  },
                  activity: {
                    "watching nature": 0.5293622016906738,
                    "taking nature photos": 0.1532168686389923,
                  },
                  location: {
                    park: 0.029794923961162567,
                    campsite: 0.9634466767311096,
                  },
                },
              },
            ],
            caption: "Ngắm thiên nhiên, chữa lành tâm hồn.",
            hashtag: ["nature", "campvibes"],
            activity: "watching nature",
            category: "activity",
          },
        ],
        title: "Về với thiên nhiên",
        hashtag: [
          "thiên_nhiên_tươi_đẹp",
          "cuộc_sống_thôn_quê",
          "khong_khi_trong_lanh",
          "healing_nature",
        ],
        transition: {
          in: "from-left",
          out: "to-right",
          type: "remotion-transitions",
        },
        durationInFrames: 369,
      },
      {
        frame: [
          {
            type: "multi",
            images: [
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
            caption: "Ăn sập Sài Gòn, no căng rốn.",
            hashtag: ["foodie", "bạn_hữu"],
            activity: "eating",
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
            caption: "Check-in vội, lưu giữ khoảnh khắc.",
            hashtag: ["selfie_time", "nhà_hàng"],
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
            caption: "Menu hấp dẫn, chọn món nào đây?",
            hashtag: ["order_food", "gặp_gỡ"],
            activity: "ordering from menu",
            category: "activity",
          },
          {
            type: "single",
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
            ],
            caption: "Chơi game giải trí, quên hết sầu lo.",
            hashtag: ["coffee", "videogame"],
            activity: "playing video game",
            category: "activity",
          },
        ],
        title: "Ẩm thực đường phố",
        hashtag: [
          "foodieadventures",
          "streetfoodlover",
          "deliciousjourney",
          "tasteofplace",
        ],
        transition: {
          in: "from-top",
          out: "to-bottom",
          type: "remotion-transitions",
        },
        durationInFrames: 573,
      },
      {
        frame: [
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
            caption: "Thuyết trình hết mình, cháy hết ga.",
            hashtag: ["presentation", "office"],
            activity: "giving presentation",
            category: "activity",
          },
        ],
        title: "Những giờ làm việc",
        hashtag: [
          "productivitymode",
          "workhardplayhard",
          "learningtogether",
          "studygram",
        ],
        transition: {
          in: "from-top",
          out: "to-bottom",
          type: "remotion-transitions",
        },
        durationInFrames: 252,
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
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_11.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.6415058970451355,
                    "Sports Activity": 0.20985789597034454,
                  },
                  activity: {
                    biking: 0.25655487179756165,
                    cycling: 0.31023964285850525,
                  },
                  location: {
                    highway: 0.14898726344108582,
                    mountain: 0.20485809445381165,
                  },
                },
              },
            ],
            caption: "Đạp xe lên núi, thử thách bản thân.",
            hashtag: ["mountain", "cyclingfun"],
            activity: "cycling",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_13.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.5426415801048279,
                    "Sports Activity": 0.2709953486919403,
                  },
                  activity: {
                    biking: 0.24649205803871155,
                    cycling: 0.17184533178806305,
                  },
                  location: {
                    factory: 0.0983627662062645,
                    mountain: 0.2626917362213135,
                  },
                },
              },
            ],
            caption: "Lên rừng xuống biển, ta là biker.",
            hashtag: ["biking", "ontheroad"],
            activity: "biking",
            category: "activity",
          },
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/test_7.jpg",
                labels: {
                  event: {
                    Traveling: 0.6716848611831665,
                    "Sports Activity": 0.07050561159849167,
                  },
                  activity: {
                    waving: 0.5755678415298462,
                    clapping: 0.15162912011146545,
                  },
                  location: {
                    temple: 0.18082985281944275,
                    mountain: 0.21440762281417847,
                  },
                },
              },
            ],
            caption: "Vẫy tay chào, tạm biệt núi rừng.",
            hashtag: ["traveling", "mountainview"],
            activity: "waving",
            category: "activity",
          },
        ],
        title: "Chinh phục đỉnh núi",
        hashtag: [
          "mountainview",
          "hikingadventures",
          "summitchallenge",
          "naturetherapy",
        ],
        transition: {
          in: "from-top",
          out: "to-bottom",
          type: "remotion-transitions",
        },
        durationInFrames: 471,
      },
      {
        frame: [
          {
            type: "single",
            images: [
              {
                path: "https://ddcrwzgmahgbknoviaft.supabase.co/storage/v1/object/public/gallery_image/4032.jpg",
                labels: {
                  event: {
                    "Road Trip": 0.024602515622973442,
                    "Friend Meet-Up": 0.937465488910675,
                  },
                  activity: {
                    selfie: 0.9306043386459351,
                    "making funny faces": 0.0295050460845232,
                  },
                  location: {
                    "dorm room": 0.6056947112083435,
                    "office cubicle": 0.06822225451469421,
                  },
                },
              },
            ],
            caption: "Selfie một tấm, kỷ niệm tuổi thanh xuân.",
            hashtag: ["dormlife", "selfie"],
            activity: "selfie",
            category: "activity",
          },
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
            caption: "Tiếng trống rộn ràng, khuấy động đêm hội.",
            hashtag: ["drumming", "festival"],
            activity: "drumming",
            category: "activity",
          },
        ],
        title: "Khoảnh khắc khác",
        hashtag: [
          "những_người_bạn",
          "forever_friends",
          "giây_phút_vui_ve",
          "small_but_strong",
        ],
        transition: {
          in: "from-left",
          out: "to-right",
          type: "remotion-transitions",
        },
        durationInFrames: 339,
      },
    ],
    bgMusic: "/music/intro/happy_5.mp3",
    bgVideo: {
      src: "/videos/season_bg/summer/summer_2.mp4",
      frameLength: 0,
    },
    videoDate: "2025-07-24T03:44:58.207Z",
    // titleStyle: 0,
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
