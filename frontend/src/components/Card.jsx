import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Card() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const api_url = import.meta.env.VITE_API

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api_url}/${id}`);

                if (!response.ok) {
                    setLoading(false);
                    return;
                }

                const jsonData = await response.json();

                setLoading(false);
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {
        let text = `Do you want to delete ${data.title} recipe`;

        if (window.confirm(text)) {
            try {
                const res = await fetch(`${api_url}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (res.ok) {
                    navigate("/");
                } else {
                    console.error('Failed to delete recipe. Server responded with status:', res.status);
                }
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        }
    };



    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white p-[30px] pt-4 rounded-md">
                <div className="flex flex-col justify-between items-start mb-4 h-[80px] sm:flex-row">
                    <h2 className="text-2xl font-semibold">Card Details</h2>

                    <div className="w-[170px] flex justify-between" >
                        <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300 ">Delete</button>


                        <Link to={`/Update/${id}`}>
                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300">Update</button>
                        </Link>
                    </div>


                </div>
                {loading && <h2 className="text-xl">Loading...</h2>}
                {data && (
                    <div className=" rounded-md p-4" >
                        <img src={data.image} alt="" className="w-full h-64 object-cover mb-4 rounded-md" />
                        <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
                        <p className="text-gray-600">{data.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
