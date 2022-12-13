import { useEffect } from "react";
// import axios from "axios";

import Carousel from "../../components/homepage/carousel/Carousel.component";
import HomepageBody from "../../components/homepage/HomepageBody.component";
import Footer from "../../components/homepage/Footer.component";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const HomePage = () => {
    const axiosPrivate = useAxiosPrivate()
    useEffect(() => {
        (async () => {
            const { data, status } = await axiosPrivate({
                method: 'get',
                url: 'cart/count'
            })
            console.log("cart count", data)
        })();

        (async () => {
            const { data, status } = await axiosPrivate({
                method: 'get',
                url: 'wishlist/count'
            })
            console.log("wishlist count", data)
        })();
    }, [])


    return (
        <div>
            <Carousel />
            <HomepageBody />
            <Footer />
        </div>
    )
}

export default HomePage;