import {instance} from "./api";

const per_page = 12

export const gitAPI = {
    getRepos : async ({page, query}: {page: number, query: string}) => {
        return instance.get(`search/repositories?q=${query}&page=${page}&per_page=${per_page}`)
    },
    getRepData : async (props:any) => {
        debugger
        return instance.get(`repos/${props.full_name}`)
    }
}

