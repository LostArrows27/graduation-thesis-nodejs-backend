import { random } from "remotion";
import InstagramPost from "../InstagramPost";
import { memo, useMemo } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

type VerticalPostsListProps = {
  images: string[];
  translateY: string;
};

const VerticalPostsList = ({ images, translateY }: VerticalPostsListProps) => {
  const precomputedPosts = useMemo(
    () =>
      images.map((image) => ({
        likes: Math.floor(random(image) * 1000) + 30,
        imageUrl: image,
      })),
    [images],
  );

  const renderItem = useMemo(
    () =>
      ({ index }: ListChildComponentProps) => {
        const post = precomputedPosts[index];
        return (
          <div
            key={post.imageUrl}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              scrollbarWidth: "none",
            }}
            className="my-[10px]"
          >
            <InstagramPost likes={post.likes} imageUrl={post.imageUrl} />
          </div>
        );
      },
    [precomputedPosts],
  );

  return (
    // <div data-direction={direction}>
    //   {/* {precomputedPosts.map((post, index) => (
    //     <div
    //       key={`${post.imageUrl}-${index}`}
    //       style={{
    //         width: "100%",
    //         display: "flex",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <InstagramPost likes={post.likes} imageUrl={post.imageUrl} />
    //     </div>
    //   ))} */}
    // </div>
    <List
      height={window.innerHeight}
      itemCount={precomputedPosts.length}
      itemSize={200}
      width="100%"
      style={{
        height: "100vh",
        overflowY: "visible",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        scrollbarWidth: "none",
        transform: translateY,
        willChange: "transform",
      }}
    >
      {renderItem}
    </List>
  );
};

export default memo(VerticalPostsList);
