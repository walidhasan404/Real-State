import { Link, useLoaderData, useParams } from "react-router-dom";

const EstateDetails = () => {

    
    const { id } = useParams();
    const idInt = parseInt(id);
    const estates = useLoaderData();
    const estate = estates.find(estate => estate.id === idInt);

    return (
        <div>
            <h2 className="text-2xl font-bold text-center">Estate Details</h2>
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-10 mx-auto pt-10">
                    <img src={estate.image} alt="Shoes" className="w-96 h-96" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{estate.estate_title}</h2>
                    <p>{estate.description}</p>
                    <div className="flex justify-between gap-8">
                        <p><span className="text-base font-semibold">Area:</span> {estate.area}</p>
                        <p><span className="text-base font-semibold">Location:</span> {estate.location}</p><p></p>
                    </div>
                    <div className="flex justify-between gap-8">
                        <p><span className="text-base font-semibold">Bedrooms:</span> {estate.bedrooms}</p><p></p>
                        <p><span className="text-base font-semibold">Bathrooms:</span> {estate.bathrooms}</p><p></p>
                        <p><span className="text-base font-semibold">Years Built:</span> {estate.year_built}</p><p></p>
                    </div>
                    <div className="card-actions">
                        <button className="btn btn-accent">Buy Now</button>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstateDetails;