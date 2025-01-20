import Banner from "../../components/Home/Banner";
import Feedback from "../../components/Home/Feedback";
import PopularCamps from "../../components/Home/PopularCamps";

const Home = () => {
    return (
        <div>
            {/* Banner component */}
           <Banner />

           {/* Popular Camps component */}
           <PopularCamps />

           {/* Feedback component */}
           <Feedback />
        </div>
    );
};

export default Home;