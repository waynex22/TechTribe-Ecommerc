import requestApi from "../helper/api"

export const SendMessage = async (data: { id_customer: string, content?: string, thumbnail?: string, video?: string }) => {
    return await requestApi('messenger', 'POST', data, 'application/json')
}