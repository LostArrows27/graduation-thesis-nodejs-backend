"use client";

import { useEffect, useState } from "react";
import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import { createClient } from "@/utils/supabase/client";

var generateArray = () => {
  const total = 100;
  const limit = 100000;

  let usedNumber = new Set<number>();
  const arrs = Array(10)
    .fill(0)
    .map(() => Array(10).fill(0));

  while (usedNumber.size < total) {
    const random = Math.floor(Math.random() * limit) + 1;
    if (!usedNumber.has(random)) {
      usedNumber.add(random);
    }
  }

  const numberArr = Array.from(usedNumber);
  let index = 0;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      arrs[i][j] = numberArr[index];
      index++;
    }
  }

  return arrs;
};

var bubbleSort = (arr: number[]) => {
  var isSwapped = false;

  for (let i = 0; i <= arr.length; i++) {
    for (let j = 0; j <= arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        isSwapped = true;
      }
    }

    if (!isSwapped) break;
  }
};

var findLargestSumArray = (arrs: number[][]) => {
  let maxSum = -Infinity;
  let maxIndex = -1;

  arrs.forEach((arr, index) => {
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    if (sum > maxSum) {
      maxSum = sum;
      maxIndex = index;
    }
  });

  if (maxIndex === -1) return null;

  return arrs[maxIndex];
};

var findArrayInclude1And99 = (arrs: number[][]) => {
  const results: number[][] = [];

  arrs.forEach((arr) => {
    if (arr.includes(1) && arr.includes(99)) {
      results.push(arr);
    }
  });

  return results;
};

export default function Header() {
  // const supabase = useState(() => {
  //   return createClient();
  // });

  // NOTE: code test

  useEffect(() => {
    var myArr = [1, 2, 3, 4, 5];
    console.log(
      myArr.find((val, index) => {
        return val > 4;
      })
    );
  }, []);

  // useEffect(() => {
  //   if (!supabase) return;

  //   const test = async () => {
  //     const { data, error } = await supabase[0].auth.getSession();

  //     if (error) {
  //       console.error(error);
  //       return;
  //     }

  //     const accessToken = data.session?.access_token;

  //     console.log("accessToken", accessToken);

  //     const user = await supabase[0].auth.getUser();

  //     console.log("userID", user?.data.user?.id);

  //     // const req = await fetch("http://localhost:5000/api/video/render", {
  //     //   method: "GET",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //     Authorization: `Bearer ${accessToken}`,
  //     //   },
  //     //   body: JSON.stringify({
  //     //     accessToken,
  //     //   }),
  //     // });

  //     // const res = await req.json();

  //     // console.log(res);
  //   };

  //   test();
  // }, []);

  return (
    <div className="flex flex-col items-center gap-16">
      <div className="flex items-center justify-center gap-8">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="h-6 rotate-45 border-l" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
      </div>
      <h1 className="sr-only">Supabasess and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The fastest way to build apps with{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="hover:underline font-bold"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="hover:underline font-bold"
          rel="noreferrer"
        >
          Next.js
        </a>
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
