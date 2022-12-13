import { useContext, useState } from "react";

import styles from "./HomepageBody.module.css";

import { TimerContext } from "../../contexts/timer.context";
import { FaHandMiddleFinger } from "react-icons/fa";
import { showToastSuccessMessage } from "utils/toastMessage";

const HomepageBody = () => {
    const value = useContext(TimerContext)
    const [email, setEmail] = useState<string>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmail('')
        showToastSuccessMessage(`Thanks! for subscribing`);
    }

    return (
        <>
            <div className={styles['deal-timer']}>
                <span className={`text-uppercase ${styles.heading}`}>gamer deals</span>

                <span className={`text-uppercase ${styles.timer}`}>ends in&nbsp;{value?.timer}</span>
                <span className="text-uppercase">
                    deals of the day
                </span>
            </div>
            <div className={styles['cta-email-subscription']}>
                <div className={styles['cta-text-content']}>
                    <h3>Subscribe to store updates</h3>
                    <p>You will be the first to know about all discounts and new games!</p>
                    <form className={styles['form']} onSubmit={handleSubmit}>
                        <input type="email" placeholder="Enter your E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button className={styles['subscribe-button']}>Subscribe</button>
                    </form>
                </div>
                <img className={styles['email-subscription-decoration-img']} src="/assets/bowser.png" alt={`super mario character - bowser, with his arms crossed`} />
            </div>
        </>
    )
}

export default HomepageBody;