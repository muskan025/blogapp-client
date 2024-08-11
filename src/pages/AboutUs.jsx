import "../components/blogCard/styles/styles.module.css"
import styles from "../components/blogCard/styles/styles.module.css";
import BlogCard from "../components/blogCard/BlogCard"
import { BsCheck2All, BsQuote } from "react-icons/bs";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <main className={`${styles.about_us} `}>
      <BlogCard image={false} blogHeader={false} comp="about" excerpt={false} />
    </main>
  )
}

export const AboutExcerpt = () => {
  return (
    <section>
      <div className={styles.quote_block}><BsQuote className={styles.quote_mark} /><h1><p>A gateway to scale up yours and other’s life with invaluable experiences and ideas.</p>
      </h1>
      <i>~ Muskan Dodmani</i></div>
       
      <div className={styles.excerpt}>
        <h3>Our Vision</h3>
        <p>At <b>LiveUp</b>, we believe that knowledge is an invaluable asset which expands on sharing. Our mission is to transform idle moments into productive time so that you leave no room for regret and enhance the quality of your life.We are on a mission to create a centered place of people who love to create a positive global impact by sharing their learnings from their mistakes,their invaluable experiences.</p>
      </div>

      <div className={styles.excerpt}>
        <h3>What We Offer</h3>
        <ul>
          <li>
          <h4>Diverse Content:</h4> <p>Explore a wide range of topics to broaden your horizons.</p>
          </li>
          <li>
          <h4>User-Friendly Interface:</h4> <p>
          Enjoy a seamless reading experience designed for on-the-go learning.
          </p>
          </li>
          <li>
          <h4>Smart Calendar Integration:</h4> <p>
          Set review reminders to reinforce your learning.
          </p>
          </li>
          <li>
          <h4>Personal Notes:</h4> Capture your thoughts and insights as you read.
          </li>
        </ul>
      </div>

      <div className={styles.excerpt}>
        <h3>Why LiveUp?</h3>
        <ul>
          <li>
          <h4>Turn Downtime into &lsquo;You&rsquo; Time:</h4> <p>
          Make the most of those in-between moments in your day.
          </p>
          </li>
          <li>
          <h4>Broaden Perspective:</h4><p>Gain fresh insights that can spark creativity and enhance your conversations.
          </p>
          </li>
          <li>
          <h4>Grow at Your Own Pace: </h4><p>
          No pressure, no tests - just pure exploration driven by your interests.
          </p>
          </li>
        </ul>
      </div>
      <div className={styles.quote_block}><BsQuote className={styles.quote_mark} /><h1><p>Explore, Excel, Expand</p>
      </h1>
      <i>~ Muskan Dodmani</i></div>

      <div className={styles.excerpt}>
        <h3>The LiveUp Experience</h3>
        <p>Imagine starting your day with a fascinating fact, pondering a new idea during your commute, or ending your evening with an inspiring story. With LiveUp, you&apos;re not just passing time - you&apos;re investing in yourself.</p>
      </div>

      <div className={styles.quote_block}><BsQuote className={styles.quote_mark} /><h1>
        <p>Be obsessed with making the most of your time.</p>
      </h1>
      <i>~ Muskan Dodmani</i></div>

      <div className={styles.excerpt}>
        <h3>Outcome</h3>
        <ul>
          <li><BsCheck2All/>Feeling more confident in discussions.</li>
          <li><BsCheck2All/>Having more &ldquo;aha!&rdquo; moments in your daily life.</li>
          <li><BsCheck2All/>Noticing positive changes in thinking and problem-solving skills.</li>
          <li><BsCheck2All/>Developing a philosophical mind that no longer relies on AI to do all their thinking job.</li>
        </ul>
      </div>
      
      <button>
      <Link to="/explore-blogs">Let&apos;s go</Link></button>
      
    </section>
  )
}
export default AboutUs
