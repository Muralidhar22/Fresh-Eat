import axios from "axios";

import Carousel from "../../components/homepage/carousel/Carousel.component";
import HomepageBody from "../../components/homepage/HomepageBody.component";
import Footer from "../../components/homepage/Footer.component";
import { useEffect } from "react";

const HomePage = () => {

    useEffect(() => {
        // onmount fetch cart and wishlist count
        (async () => {
            const { data, status } = await axios({
                method: 'get',
                url: 'cart/count'
            })
            console.log("cart count", data)
        })();

        (async () => {
            const { data, status } = await axios({
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