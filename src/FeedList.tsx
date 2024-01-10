import { useState } from "react";
import FeedPage from "./FeedPage";
import { PagedData } from "./util";

interface PostListData {
  data: PagedData;
  handleScrollup: (pageNum: number) => void;
}

function ProductList({ data, handleScrollup }: PostListData) {
  const [input, setInput] = useState("");

  const onTextInput = (inputText: string) => {
    setInput(inputText);
  };

  return (
    <div className="list-container">
      <div className="element-container">
        <div className="profile">
          <img
            className="profile-img"
            width={40}
            height={40}
            src={
              "https://media.istockphoto.com/id/1209654046/vector/user-avatar-profile-icon-black-vector-illustration.jpg?s=612x612&w=0&k=20&c=EOYXACjtZmZQ5IsZ0UUp1iNmZ9q2xl1BD1VvN6tZ2UI="
            }
          />
        </div>
        <div className="post-body">
          <input
            className="input"
            type="text"
            placeholder="How do you want to fight for justice?"
            value={input}
            onChange={(event) => onTextInput(event.target.value)}
            required
            size={10}
          />
          {/* This Button does nothing */}
          <div className="button">
            <button className="submit">{"Post"}</button>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: `${data.topVirtualPadding ?? 0}px`,
        }}
      >
      </div>
      {Object.values(data).map((page, i) => {
        if (typeof page === "number") {
          return null;
        }
        return (
          <FeedPage handleScrollup={handleScrollup} data={page} page={i} />
        );
      })}
      <div
        style={{
          width: "100%",
          height: `${data.bottomVirtualPadding ?? 0}px`,
        }}
      >
      </div>
    </div>
  );
}

export default ProductList;
