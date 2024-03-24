import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import addicon from "/assets/add-icon.png";
function Sample() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const api_url = import.meta.env.VITE_API

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api_url}/65fea5df141c14018ee07cba`);

                if (!response.ok) {
                    setLoading(false);
                    seterror("Failed to fetch :(");
                    return;
                }

                const json = await response.json();

                setLoading(false);
                setData(json);
            } catch (error) {
                console.error('Error fetching data:', error.message);

                if (error.message === 'Failed to fetch') {
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1 className="text-4xl font-bold mb-6 ">Sample Projects</h1>
            <div className='text-wrap grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-4 '>

                <Link to={"/Create"} className="w-[270px] sm:w-[330px]">

                    <section className='bg-white h-[250px] rounded-md flex flex-col items-center card mb-4' style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <img src={addicon} alt="" className="w-[250px] bg-orange-200 h-[180px]  rounded-md mt-[15px] object-contain p-[65px] sm:w-[300px] " />
                        <h2 className='text-[16px] font-semibold mt-3'>Create your project</h2>
                    </section>
                </Link>

                {loading && (
                    <h2 className="text-xl">Loading...</h2>
                )}

                {data && (
                    <Link to={`/Card/${data._id}`} key={data._id} className="w-[270px] sm:w-[330px]">
                        <section className='bg-white h-[250px]  rounded-md flex flex-col items-center card mb-4' style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <img src={data.image} alt="" className="w-[250px] h-[180px] rounded-md mt-[15px] object-cover bg-orange-200 sm:w-[300px]" />
                            <h2 className='text-[16px] font-semibold mt-3'>{data.title}</h2>
                        </section>
                    </Link>
                )}
            </div>
        </>
    );
}

export default Sample;
