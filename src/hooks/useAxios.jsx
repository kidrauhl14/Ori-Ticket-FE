// 기본 Axios: "defaultAxios"
// 토큰이 포함된 Axios: "useTokenAxios" (서버에 요청 시, 헤더에 인증 토큰을 포함하여 요청)
import axios from "axios";
import { useState } from "react";
import { getCookie, setCookie } from "@utils/cookies";

export default function useAxios () {
    const [isLoading, setIsLoading] = useState(false);

    // 토큰 없이 HTTP 요청을 보낼 때 사용할 인스턴스
    // 회원가입, 로그인 요청 시 사용
    const defaultAxios = axios.create({
      baseURL: import.meta.env.VITE_API_SERVER,
    });

    // 인증이 필요한 요청에 사용할 Axios 인스턴스
    // Authorization 헤더에 현재 사용자의 accessToken을 포함시킨다.
    const useTokenAxios = axios.create({
      baseURL: import.meta.env.VITE_API_SERVER,
      headers:{
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });

    // fetchDataUseAxios함수 사용 예시
    // fetchDataUseAxios('defaultAxios', { method: 'post', url: '/some/url', data: { key: 'value' } });
    const fetchDataUseAxios = async (type, configParams) => {
      try {
        setIsLoading(true);

        if (type === "defaultAxios"){
          const response = await defaultAxios.request(configParams);
          return response;
        }

        if (type === "useTokenAxios"){
                    
          // accessToken이 항상 유효하다는 가정 하에
          let accessToken = getCookie("accessToken");

          const response = await useTokenAxios.request({
              ...configParams,
              headers: {Authorization: `Bearer ${accessToken}`}
          });

          return response;
        }

      } catch (error) {
          if(axios.isAxiosError(error)){
            const axiosError = error;
            return axiosError.response;
          }
      } finally {
        setIsLoading(false);
      }
    };

    return { isLoading, fetchDataUseAxios };
};