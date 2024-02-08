import axios from "axios";

export const addSubscribe = async body => {
    const { data } = await axios.post('/api/subscribe', body);
    return data;
};
