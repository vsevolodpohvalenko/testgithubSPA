import s from './main_page.module.css'
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions, getReposThunk} from "../../store/git_reducer";
import {AppStateType} from "../../store/store";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-regular-svg-icons'
import {
    faSearch,
    faSortAlphaDown,
    faSortAlphaUp,
    faSortNumericDown,
    faSortNumericUp,
    faSortAmountUp,
    faSortAmountDown
} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {Link} from "react-router-dom";
import {useAlert} from "react-alert";
import {motion} from 'framer-motion'
import {settings} from '../../App';
import {Pagination} from '../pagination/pagination';

export const Animate = (event: any) => {
    event.target.style = ' ';
    void event.target.offsetWidth;
    event.target.style.animation = 'shake .8s';
}

export const MainPage = () => {
    const [value, setValue] = useState<string>("")
    const [page, setPage] = useState(1)
    const [title, setTitle] = useState("")
    const [sortName, setSortName] = useState(true)
    const [sortDate, setSortDate] = useState(true)
    const [sortRating, setSortRating] = useState(true)

    const alert = useAlert();


    const dispatch = useDispatch()

    const inputText = useRef(null)

    const onChangeHandle = (e: any) => {
        setValue(e.target.value)
        // @ts-ignore
        if (inputText.current.value != "") {
            // @ts-ignore
            inputText.current.style.borderColor = '#58a6ff'
        }

    }

    const SubmitHandle = (e: any) => {
        Animate(e)
        e.preventDefault();
        // @ts-ignore
        if (inputText.current.value == "") {
            alert.error(`It shouldn't be empty!`);
            // @ts-ignore
            inputText.current.style.borderColor = 'red'
        } else {
            Search()
            setTitle(value)
            localStorage.setItem('title', value)
        }
    }

    const Search = () => {
        value != "" ? dispatch(getReposThunk({
            page: page,
            query: value
        })) : localStorage.getItem("title") && dispatch(getReposThunk({
            page: page,
            query: localStorage.getItem("title") as string
        }))
        // @ts-ignore
        inputText.current.value = ""
    }


    const FollowHandle = (e: any, i: number, name: string) => {
        localStorage.getItem('followed') == undefined && localStorage.setItem('followed', JSON.stringify([]))
        let followed = JSON.parse(localStorage.getItem('followed') as string)
        if (JSON.parse(localStorage.getItem('followed') as string).filter((e: number) => e == i).length > 0) {
            e.target.style.color = "#388bfd"
            followed = followed.filter((e: number) => e != i)
            localStorage.setItem('followed', JSON.stringify([...followed]))
            alert.error(`You stopped follow ${name}!`);
        } else {
            e.target.style.color = "yellow"
            localStorage.setItem('followed', JSON.stringify([...followed, i]))
            alert.success(`You started following ${name}!`)
        }
    }
    const Followed = (id: number) => {
        localStorage.getItem('followed') == undefined && localStorage.setItem('followed', JSON.stringify([]))
        let followed: Array<number> = JSON.parse(localStorage.getItem('followed') as string)
        return followed.filter((e) => e === id).length > 0
    }


    // @ts-ignore
    const repos = useSelector((state: AppStateType) => state.GitHub.repos)
    // @ts-ignore
    const total_count = useSelector((state: AppStateType) => state.GitHub.total_count)


    const SortBy = (e: any, sortVarible: boolean, sortFunction: (v: boolean) => void, reducerFunctionUp: any, reducerFunctionDown: any) => {
        Animate(e)
        sortVarible ? dispatch(reducerFunctionUp()) : dispatch(reducerFunctionDown())
        debugger
        sortFunction(!sortVarible)
    }

    return <div className={s.main_section}>
        <div {...settings} className={s.logo}><FontAwesomeIcon icon={faGithub}/></div>
        <form className={s.input_section}>
            <input {...settings} ref={inputText} onChange={onChangeHandle} required={true} type="search"
                   data-testid="site-search-input" className={[s.ais_SearchBox_input, s.js_open].join(" ")}
                   placeholder="Search repositories." autoFocus={true} autoComplete="off" autoCorrect="off"
                   autoCapitalize="off" spellCheck="false" maxLength={512}/>
            <button {...settings} onClick={(e) => SubmitHandle(e)} className={s.search}><FontAwesomeIcon
                icon={faSearch}/></button>
        </form>
        {repos.length > 0 && <div className={s.sort_repos}>
            <div {...settings}
                 onClick={(e) => SortBy(e, sortName, setSortName, actions.sortByNameUp, actions.sortByNameDown)}>By
                Name <FontAwesomeIcon icon={sortName ? faSortAlphaUp : faSortAlphaDown}/></div>
            <div {...settings}
                 onClick={(e) => SortBy(e, sortDate, setSortDate, actions.sortByDateUp, actions.sortByDateDown)}>By
                Date <FontAwesomeIcon icon={sortDate ? faSortNumericUp : faSortNumericDown}/></div>
            <div {...settings}
                 onClick={(e) => SortBy(e, sortRating, setSortRating, actions.sortByRatingUp, actions.sortByRatingDown)}>By
                Rating <FontAwesomeIcon icon={sortRating ? faSortAmountUp : faSortAmountDown}/></div>
        </div>}
        {repos.length > 0 && <h2 {...settings} className={s.title}>Results
            for {title != "" ? title : localStorage.getItem('title') && localStorage.getItem('title')}</h2>}

        {total_count > 0 ?
            <div className={s.repos}> {repos.map((i: any) => <motion.div {...settings} className={s.repository}>
                <div className={s.data}>
                    <div className={s.avatar_wrapper}>
                        <img {...settings} className={s.avatar} src={i.owner.avatar_url}/>
                        <div onClick={(e) => FollowHandle(e, i.id, i.name)}
                             className={[s.star, Followed(i.id) && s.follow].join(" ")}><FontAwesomeIcon icon={faStar}/>
                        </div>
                    </div>
                    <div {...settings} >Name: {i.full_name}</div>
                    <div {...settings} >Rating: {i.stargazers_count}</div>
                </div>
                <motion.div  {...settings} whileTap={{scale: 0.9}} className={s.find_more}><Link onClick={Animate}
                                                                                                 to={`/repo/${i.id}`}>View
                    more</Link></motion.div>
            </motion.div>)}</div> : <p className={s.nothing}>Sorry, but nothing was found, try something else...</p>}

        {repos.length > 0 && <div>
            <Pagination page={page} setPage={setPage} Search={Search}/>
        </div>}
    </div>
}