import {Dispatch} from "redux";
import {gitAPI} from "../api/github_api";

const GET_REPOS = 'GET_REPOS'
const CHANGE_PAGE = 'CHANGE_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'

const SORT_BY_NAME_DOWN = 'SORT_BY_NAME_DOWN'
const SORT_BY_NAME_UP = 'SORT_BY_NAME_UP'

const SORT_BY_DATE_DOWN = 'SORT_BY_DATE_DOWN'
const SORT_BY_DATE_UP = 'SORT_BY_DATE_UP'

const SORT_BY_RATING_DOWN = 'SORT_BY_RATING_DOWN'
const SORT_BY_RATING_UP = 'SORT_BY_RATING_UP'

export type RepoType = {
    id:number
        html_url: string,
        description: string,
        created_at: string,
        updated_at: string,
        watchers_count: number,
        language: string,
        forks_count: number,
        watchers: number,
        full_name: string,
        stargazers_count: number,
        name:string,
        clone_url: string,
        private: boolean,
        subscribers_count: number,
        owner: {
            avatar_url:string,
            login: string,
            html_url: string,
           
        },
        general_data:{
            id: number,
            name: string,
            full_name: string,
            private: false,
            owner: {
                login: string,
                id: number,
                avatar_url: string,
                html_url: string,
                type: string,
            },
     
        organization: {
            login: string,
            id: number,
            }
        }
}

type InitialStateType = {
    total_count :number,
    repos: Array<{
        id:number
        html_url: string,
        description: string,
        created_at: string,
        updated_at: string,
        watchers_count: number,
        language: string,
        forks_count: number,
        watchers: number,
        full_name: string,
        stargazers_count: number,
        name:string,
        clone_url: string,
        private: boolean,
        subscribers_count: number,
        owner: {
            avatar_url:string,
            login: string,
            html_url: string,
           
        },
        general_data:{
            id: number,
            name: string,
            full_name: string,
            private: false,
            owner: {
                login: string,
                id: number,
                avatar_url: string,
                html_url: string,
                type: string,
            },
     
        organization: {
            login: string,
            id: number,
            }
        }
    }>
}

const initialState:InitialStateType = {
    repos: [],
    total_count : 1,
}

export const GitHubReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_REPOS:
            debugger
            return {...state, repos: state.repos.concat(action.payload)
    }
        case CHANGE_PAGE:
            return {...state, repos: []
    }
        case SET_TOTAL_COUNT:
            debugger
            return {...state, total_count: action.payload}
        case SORT_BY_NAME_DOWN:
            debugger
            return {...state, repos: state.repos.sort((a, b) => (a.name > b.name) ? 1 : -1)}
        case SORT_BY_NAME_UP:
            debugger
            return {...state, repos: state.repos.sort((a, b) => (a.name < b.name) ? 1 : -1)}
        case SORT_BY_RATING_DOWN:
            debugger
            return {...state, repos: state.repos.sort((a, b) => (a.stargazers_count > b.stargazers_count) ? 1 : -1)}
        case SORT_BY_RATING_UP:
            debugger
            return {...state, repos: state.repos.sort((a, b) => (a.stargazers_count < b.stargazers_count) ? 1 : -1)}
        case SORT_BY_DATE_DOWN:
            debugger
            return {...state, repos: state.repos.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1)}
        case SORT_BY_DATE_UP:
            debugger
            return {...state, repos: state.repos.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1)}
        default:
            return {...state}
    }
}
export const actions: { [key: string]: (...args: any) => any } = {
    gotRepos: (payload: any) => ({type: GET_REPOS, payload}),
    changePage: () => ({type: CHANGE_PAGE}),
    sortByDateDown: () => ({type: SORT_BY_DATE_DOWN}),
    sortByDateUp: () => ({type: SORT_BY_DATE_UP}),
    sortByNameDown: () => ({type: SORT_BY_NAME_DOWN}),
    sortByNameUp: () => ({type: SORT_BY_NAME_UP}),
    sortByRatingDown: () => ({type: SORT_BY_RATING_DOWN}),
    sortByRatingUp: () => ({type: SORT_BY_RATING_UP}),
    setTotalCount: (payload: number) => ({type: SET_TOTAL_COUNT, payload}),
}

export const getReposThunk = (props: {page: number, query: string}) => async (dispatch: Dispatch) => {
    try {
        dispatch(actions.changePage())
        let response = await gitAPI.getRepos(props)
        dispatch(actions.setTotalCount(response.data.total_count))
        response.data.total_count > 0 && response.data.items.map( async (e:any) => {
            let response2 = await gitAPI.getRepData(e)
            dispatch(actions.gotRepos(response2.data))
        })

    } catch (error) {
        console.log(error)
    }


}


