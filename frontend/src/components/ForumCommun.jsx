import React from 'react';


const ImageGrid = () => {
  const images = [
    {
      src: "/api/placeholder/400/300",
      alt: "Concert with blue confetti",
    },
    {
      src: "/api/placeholder/400/300",
      alt: "Business meeting",
    },
    {
      src: "/api/placeholder/400/300",
      alt: "Outdoor event with white tents",
    },
    {
      src: "/api/placeholder/400/300",
      alt: "Person at festival",
    },
    {
      src: "/api/placeholder/400/300",
      alt: "Indoor event space",
    },
    {
      src: "/api/placeholder/400/300",
      alt: "Dance performance",
    }
  ];

  return (
    <div className="bg-gray-100 p-4">
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative bg-white rounded-lg overflow-hidden shadow-sm">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-start p-2 bg-white bg-opacity-90">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-xs text-gray-600">•••</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-600">•••</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h2.764a2 2 0 001.789-2.894l-3.5-7A2 2 0 0011.263 7h-2.5" />
                  </svg>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-600">•••</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;