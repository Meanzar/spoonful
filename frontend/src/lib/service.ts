import { postData, putData } from './api'

export function handleInput(set: any, e: any) {
    set(e.target.value)
}

export const handleCreate = async (url: string, data: any) => {
    await postData(url, data)
}  

export const handleEdit = async (url: string, data: any) => {
    await putData(url, data)
}  