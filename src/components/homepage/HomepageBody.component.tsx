import { useContext } from "react";

import styles from "./HomepageBody.module.css";

import { TimerContext } from "../../contexts/timer.context";

const HomepageBody = () => {
    const value = useContext(TimerContext)

    return (
        <div>
            <h1 className={`text-uppercase ${styles.heading}`}>gamer deals</h1>

            <span className={`text-uppercase ${styles.timer}`}>ends in&nbsp;{value?.timer}</span>
            <h2 className="text-uppercase">
                deals of the day
            </h2>
        </div>
    )
}

export default HomepageBody;