import { Link } from "react-router-dom";

const EstatesCard = ({ estates }) => {
    const { estate_title, image, view_property_button, status5, id } = estates;

    return (
        <div className="card w-96 bg-base-100 shadow-xl p-4">
            <figure><img className="h-96" src={image} alt={estate_title} /></figure>
            <div className="card-body">
                <h2 className="card-title">{estate_title}</h2>
                <p className="text-xl font-bold">{status5}</p>
                <div className="justify-center">
                    <Link to={`./estate/${id}`}>
                        <button className="btn btn-primary">{view_property_button}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EstatesCard;
