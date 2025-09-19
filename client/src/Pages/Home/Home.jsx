import TabCatagory from "../../Components/TabCatagory/TabCatagory";
import SweiperSlider from "./SweiperSlider";

const Home = () => {
     return (
          <div className="w-full px-4 md:px-12 lg:px-20">
               <SweiperSlider></SweiperSlider>
               <TabCatagory></TabCatagory>
          </div>
     );
};

export default Home;