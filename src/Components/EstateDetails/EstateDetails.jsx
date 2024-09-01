import { Link, useLoaderData, useParams } from "react-router-dom";

const EstateDetails = () => {
    const { id } = useParams();
    const idInt = parseInt(id);
    const estates = useLoaderData();
    const estate = estates.find((estate) => estate.id === idInt);

    if (!estate) {
        return <div className="text-center text-lg font-semibold">Estate not found</div>;
    }

    return (
        <div className="container mx-auto p-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-8">Estate Details</h2>
            <div className="card bg-white shadow-xl rounded-lg overflow-hidden lg:flex lg:space-x-6">
                <figure className="px-10 lg:px-0 lg:flex-shrink-0">
                    <img src={estate.image} alt="Estate" className="w-96 lg:w-96 h-96 object-cover rounded-lg" />
                </figure>
                <div className="card-body p-6 lg:p-10">
                    <h3 className="card-title text-3xl font-semibold mb-4 text-center lg:text-left">{estate.estate_title}</h3>
                    <p className="text-gray-700 text-base mb-6 text-center lg:text-left">{estate.description}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600 text-sm mb-6">
                        <p><span className="font-semibold">Area:</span> {estate.area}</p>
                        <p><span className="font-semibold">Location:</span> {estate.location}</p>
                        <p><span className="font-semibold">Bedrooms:</span> {estate.bedrooms}</p>
                        <p><span className="font-semibold">Bathrooms:</span> {estate.bathrooms}</p>
                        <p><span className="font-semibold">Year Built:</span> {estate.year_built}</p>
                    </div>
                    
                    <div className="card-actions justify-center lg:justify-start">
                        <button className="btn btn-accent w-full md:w-auto">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstateDetails;
