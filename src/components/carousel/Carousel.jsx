
import styles from "../blogCard/styles/styles.module.css"
import { blogs } from "../../../data"
import { UserDetails } from "../blogCard/BlogCard"
import { Link } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { PiCaretCircleLeftLight, PiCaretCircleRightLight } from "react-icons/pi"

const Carousel = () => {

    const [current, setCurrent] = useState(0)
    const [isAutoSliding, setIsAutoSliding] = useState(true)

    const prev = useCallback(() => {
        setCurrent((prev) => prev === 0 ? blogs.length - 1 : prev - 1)
    }, [])

    const next = useCallback(() => {
        setCurrent((prev) => prev === blogs.length - 1 ? 0 : prev + 1)


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
                    blogs.length > 0 && blogs.map((blog) => {
                        const { userId, blogId, image, blogTitle, username, niche, date } = blog

                        return (<div key={userId} className={styles.carousel_item}>

                            <img src={image} alt="" className={styles.carousel_img} />

                            <div className={styles.arrow_text_container}>
                                <span className={styles.icon} onClick={() => handleManualSliding('prev')}><PiCaretCircleLeftLight /></span>
                                <div className={styles.text_container}>
                                    <p className={styles.niche}>{niche}</p>
                                    <Link to={`/blog/${blogId}`} className={styles.title}>
                                        <h1 >{blogTitle}</h1></Link>
                                    <UserDetails userId={userId} username={username} date={date} comp="carousel" />
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
