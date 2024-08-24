import { useLoaderData } from "react-router-dom";
import Banner from "../Banner/Banner";
import EstatesCard from "../Estates/EstatesCard";

const Home = () => {
    const estates = useLoaderData();

    return (
        <div>
            <Banner />
            <h2 className="text-3xl my-3 font-bold text-center">Estates</h2>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {estates.map((estate) => (
                    <EstatesCard
                        key={estate._id}
                        estates={estate}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
