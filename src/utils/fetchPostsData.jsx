import axios from "axios";
import { useRecoilState } from "recoil";
import { postsDataState } from "@recoil/postsDataState.jsx";

async function fetchPostsData(setPostsData) {
  try {
    const response = await axios.get(
      "http://13.124.46.138:8080/posts/search",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `HTTP 에러! 상태: ${response.status}`
      );
    }

    setPostsData(response.data.content);
    console.log(response.data);
  } catch (error) {
    console.error("Fetching error:", error);
  }
}

export default fetchPostsData;
