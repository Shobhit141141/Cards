import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState(null); // New state for image preview
    const api_url = 'http://localhost:4000/api/card';

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { title, image, description }
        const res = await fetch(`${api_url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await res.json()
        if (res.ok) {
            setTitle('')
            setImage('')
            setDescription('')
            navigate("/")
            console.log('new card', json)
        }
    }

    function convertToBase64(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
            setPreviewImage(reader.result); // Set the preview image
        }
        reader.onerror = () => {
            console.error("Error occurred while reading the file.");
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-4">Add new card</h2>

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
                        required
                    />
                    {/* Image preview */}
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

export default Create;
