import React from 'react'
import {withRouter} from "react-router";
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import { Link } from 'react-router-dom';
import s from './repository.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolderOpen} from '@fortawesome/free-solid-svg-icons'
import { settings } from '../../App';
import { Animate } from '../main_page/main_page';

const Repository = (props: { match: { params: { id: number } } }) => {
    const repos = useSelector((state: AppStateType) => state.GitHub.repos)
    const id = Number(props.match.params.id)
    debugger
    const repo: any = repos.filter((e: any) => e.id === Number(id))[0]
    return <div className={s.repo_wrapper}>
        <div className={s.back}><Link to='/'>Back</Link></div>
        <div className={s.user_data}>
                <div><img {...settings} className={s.user_avatar} src={repo.owner.avatar_url}/></div>
                <h1 style={{color: 'white'}} {...settings}>{repo.owner.login}</h1>
                <a  {...settings} target="_blank" href={repo.owner.html_url}> <input onClick={Animate} {...settings} type="submit" name="commit" value="Visit user" className={[s.btn, s.btn_block].join(" ")}
                       />
                <div><a  target="_blank" {...settings} href={repo.html_url}>
                    <input onClick={Animate}  {...settings} type="submit" name="commit" value="Visit repository"
                           className={[s.btn, s.btn_block].join(" ")}
                           /></a>
                </div>
                <div><a target="_blank" {...settings} href={repo.clone_url}>
                    <input onClick={Animate} {...settings} type="submit" name="commit" value="Clone git" className={[s.btn, s.btn_block].join(" ")}/></a>
                </div>
            </a>
        </div>
        <div className={s.repo_data_wrapper}>
            <div  {...settings} className={s.repo_icon}><FontAwesomeIcon icon={faFolderOpen}/></div>
            <div className={s.repo_data}>
                <div {...settings}>Name: {repo.name}</div>
                <div {...settings}>Visibility: {repo.private ? 'private' : 'public'}</div>
                <div {...settings}>Created at {repo.created_at}</div>
                <div {...settings}>Updated at {repo.updated_at}</div>
                <div {...settings}>Watchers: {repo.watchers}</div>
                <div {...settings}>Subscribers: {repo.subscribers_count}</div>
                <div {...settings}>Default branch: {repo.subscribers_count}</div>
            </div>
        </div>
    </div>
}

export default withRouter(Repository)