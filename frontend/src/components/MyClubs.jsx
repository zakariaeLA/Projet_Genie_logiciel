import React, { useState, useEffect } from "react"; // Import useEffect
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import { axiosInstance } from '../lib/axios'; // Import your axios instance

const MyClubs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [anchorEl, setAnchorEl] = useState(null);
  const [clubs, setClubs] = useState([]); // State to store fetched clubs
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const etudiantId = '67508266533eb41d8194ded0'; // Replace with actual student ID

  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/clubs/${etudiantId}/clubs`);
        setClubs(response.data.mesClubs); // Assuming your API returns 'mesClubs'
      } catch (error) {
        console.error("Error fetching clubs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, [etudiantId]);

  // Filter clubs based on the search query and category
  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "Tous" || club.categories.includes(selectedCategory))
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setAnchorEl(null); // Close the menu after selecting a category
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* ... (search and filter) */}

      {/* Display clubs */}
      {isLoading ? (
        <Typography>Loading clubs...</Typography> // Display loading state
      ) : filteredClubs.length > 0 ? (
        filteredClubs.map((club, index) => (
          <Box key={index} className="club-item" sx={{ marginBottom: "20px" }}>
            <img
              src={`/imagesClubs/${club.image}`} // Assuming your backend serves images
              alt={`${club.nom} Logo`}
              style={styles.image}
            />
            <Typography>{club.nom}</Typography>
          </Box>
        ))
      ) : (
        <Typography>Aucun club correspondant trouvé</Typography>
      )}
    </Box>
  );
};

const styles = {
  image: {
    maxWidth: "100px",
    maxHeight: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
};

export default MyClubs;
