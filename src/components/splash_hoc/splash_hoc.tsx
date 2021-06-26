import React, { FC, useEffect, useState} from 'react'
import s from './splash_hoc.module.css'
import { motion } from "framer-motion"

export const SplashHOC = (Component:any) => {
    const [done, setDone] = useState<boolean>(false)

    useEffect(() => {
        // MOCK WAITING
      setTimeout(() => setDone(true), 3000)
    }, [])
    return (props: any) => {
        return done ? <Component {...props}/> : (
            <div  className={s.splash}>
                <motion.h1 className={[s.name, s.fade_in].join(" ")}>Vsevolod Pokhvalenko</motion.h1>
            </div>)
    }}