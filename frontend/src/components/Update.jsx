import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Update() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const api_url = import.meta.env.VITE_API
    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`${api_url}/${id}`);
                const data = res.data;
                setTitle(data.title);
                setImage(data.image);
                setDescription(data.description);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { title, image, description };
        try {
            await axios.patch(`${api_url}/${id}`, data);
            navigate("/");
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    function convertToBase64(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
            setPreviewImage(reader.result);
        };
        reader.onerror = () => {
            console.error("Error occurred while reading the file.");
        };
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-4">Update card</h2>

                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="w-full border-gray-300 rounded-md p-2"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2">Image</label>
                    <input
                        type="file"
                        id="image"
                        className="w-full border-gray-300 rounded-md p-2"
                        accept="image/*"
                        onChange={convertToBase64}
                        
                    />
                    {previewImage && (
                        <img src={previewImage} alt="Preview" className="mt-2 max-w-full h-auto" />
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Description</label>
                    <textarea
                        id="description"
                        className="w-full border-gray-300 rounded-md p-2"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                        rows="5"
                    ></textarea>
                </div>

                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Update;
