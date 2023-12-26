import axios from "axios";

const apiServer = import.meta.env.VITE_API_SERVER;
const userId = 1; //삭제할 회원의 ID

const getUserInfo = async () => {
    try{
        const response = await axios.get(`${apiServer}/members/${userId}`,{
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status >= 200 && response.status < 300) {
        return response.data;
        } else {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
            
    } catch (error) {
        console.error("Fetching user info error: ", error);
        throw error;
    }
};

const patchUserInfo = () => async (phone) => {
    try{
        const response = await axios.patch(
          `${apiServer}/members/${userId}`,
          { phone },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status >= 200 && response.status < 300) {
          return response.data;
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }


    } catch(error) {
        console.error("Patching user info error: ", error);
        throw error;
    }
}


const deleteUserInfo = async () => {
    try{
        const response = await axios.delete(`${apiServer}/members/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

            if (response.status >= 200 && response.status < 300) {
              return response.data;
            } else {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
    } catch (error) {
        console.error("Deleting user info error:", error);
        throw error;
    }
}

export {getUserInfo, patchUserInfo, deleteUserInfo};