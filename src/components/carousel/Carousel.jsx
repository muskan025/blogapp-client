/* eslint-disable react/prop-types */

import styles from "../blogCard/styles/styles.module.css"
import { UserDetails } from "../blogCard/BlogCard"
import { Link } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { PiCaretCircleLeftLight, PiCaretCircleRightLight } from "react-icons/pi"

const Carousel = ({data}) => {

    const [current, setCurrent] = useState(0)
    const [isAutoSliding, setIsAutoSliding] = useState(true)

    const prev = useCallback(() => {
        setCurrent((prev) => prev === 0 ? data.length - 1 : prev - 1)
    }, [])

    const next = useCallback(() => {
        setCurrent((prev) => prev === data.length - 1 ? 0 : prev + 1)


    }, [])


    useEffect(() => {

        let interval
        if (isAutoSliding) {
            interval = setInterval(() => {
                next()
            }, 3000)
        }

        return () => clearInterval(interval)
    }, [isAutoSliding, next])

    function handleManualSliding(direction) {
        setIsAutoSliding(false)

        if (direction === 'next') {
            next()
        }
        else prev()

        setTimeout(() => {
            setIsAutoSliding(true)
        }, 0)

    }

    return (
        <div className={styles.carousel_container}>

            <div className={styles.carousel}
                style={{ transform: `translateX(-${current * 100}%)` }}>

                {
                    data.length > 0 && data.map((blog) => {

                        const{_id,title,thumbnail,readTime,userId,createdAt} = blog

            const createdAtDate = new Date(createdAt);
            const dateNum = createdAtDate.getDate();
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const month = monthNames[createdAtDate.getMonth()];
            const year = createdAtDate.getFullYear();
            var date = `${dateNum} ${month}, ${year}`
            const image = `http://localhost:8000/${thumbnail}`
            const profileImage = `http://localhost:8000/${userId.profileImg}`
            const blogData = {...blog,date,thumbnail:image}

                        return (<div key={_id} className={styles.carousel_item}>

                            <img src={image} alt="Blog thumbnail" className={styles.carousel_img} />
                            <div className={styles.arrow_text_container}>
                                <span className={styles.icon} onClick={() => handleManualSliding('prev')}><PiCaretCircleLeftLight /></span>
                                <div className={styles.text_container}>
                                    <p className={styles.niche}>{userId.niche}</p>
                                    <Link to={`/blog/${_id}`} state={blogData} className={styles.title}>
                                        <h1 >{title}</h1></Link>
                                    <UserDetails userId={userId._id} profileImg={profileImage} username={userId.username} date={date} readTime={readTime} comp="carousel" user={userId}/>
                                </div>
                                <span className={styles.icon} onClick={() => handleManualSliding('next')}><PiCaretCircleRightLight /></span>
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default Carousel
