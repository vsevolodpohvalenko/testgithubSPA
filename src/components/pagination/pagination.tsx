import {faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import s from '../main_page/main_page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Pagination = (props:any) => {
    const lastPage = () => {
        if (props.page -4 < 1) {return 9}
        else if (props.page +4 > 100) {return 100}
        else {return props.page+4}
    }

    const pages = Array.from({length: 100}, (v:number, k:number) => k+1);

    const prevPage = () => {
        if (props.page -4 < 1) {return 0}
        else if (props.page +4 > 100) {return 91}
        else {return props.page-5}
    }

    const onPageClick = (page_number:number) => {
        props.setPage(page_number)
        props.Search()
    }

    const ArrowLeft = () => {
        props.page > 1 && props.setPage(props.page-1)
        props.Search()
    }

    const ArrowRight = () => {
        props.page < 100 && props.setPage(props.page+1)
        props.Search()
    }

    return <div className={s.pagination}>
        <span className={s.arrow_wrapper} onClick={() => ArrowLeft()}><FontAwesomeIcon icon={faChevronLeft}/></span>
            {pages.slice(prevPage(), lastPage()).map((e:number) => <div  onClick={() => onPageClick(e)} className={[s.page, props.page == e && s.current].join(" ")}>{e}</div>)}
            <span className={s.arrow_wrapper} onClick={() => ArrowRight()}><FontAwesomeIcon  icon={faChevronRight}/></span>
    </div>
}