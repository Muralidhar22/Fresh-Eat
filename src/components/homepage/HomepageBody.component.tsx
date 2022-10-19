import { useContext } from "react";

import styles from "./HomepageBody.module.css";

import { TimerContext } from "../../contexts/timer.context";

const HomepageBody = () => {
    const value = useContext(TimerContext)

    return (
        <div>
            <span className={`text-uppercase ${styles.heading}`}>gamer deals</span>

            <span className={`text-uppercase ${styles.timer}`}>ends in&nbsp;{value?.timer}</span>
            <span className="text-uppercase">
                deals of the day
            </span>
        </div>
    )
}

export default HomepageBody;