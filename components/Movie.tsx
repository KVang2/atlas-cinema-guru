interface MovieProps {
    id: string;
    title: string;
    released: number;
    synopsis: string;
    genre: string;
    image: string;
  }
  
  export default function Movie({ id, title, released, synopsis, genre, image }: MovieProps) {
    console.log("Movie Image URL:", image);
  
    return (
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        {/* Movie Image */}
        <img
          src={image}
          alt={title}
          width={500}
          height={500}
          className="w-full h-auto rounded-lg"
          onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")} // Fallback image
        />
  
        {/* Hover Overlay with Movie Details */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <h3 className="text-white text-lg font-bold">{title}</h3>
          <p className="text-gray-400 text-sm">{released}</p>
          <p className="text-gray-400 text-sm">{synopsis}</p>
          <p className="text-gray-400 text-sm">{genre}</p>
        </div>
      </div>
    );
  }
  