import axios from "axios";

const apiUrl = "https://email-schedule.onrender.com";

export const getSchecduleList = async () => {
    try{
        const response = await axios.get(`${apiUrl}/v1/schecdule`);
        return response;
    }
    catch(error){
        console.log(error)
    }
}

export const searchScheduleByTitle = async (data:any) => {
    try {
        const response = await axios.get(`${apiUrl}/v1/schecdule`, {
            params: {
                title: data,
            },
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postSchedule = async (data:any) => {
    try {
        const response = await axios.post(`${apiUrl}/v1/schecdule`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const editSchedule = async (id:string,data:any) => {
    try {
        const response = await axios.patch(`${apiUrl}/v1/schecdule/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteSchecdule = async (id: string) => {
    try {
        const url = `${apiUrl}/v1/schecdule/${id}`;
        console.log(url);
        await axios.delete(url);
    } catch (error) {
        console.log(error);
    }
}