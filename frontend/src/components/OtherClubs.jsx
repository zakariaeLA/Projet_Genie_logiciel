import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import { axiosInstance } from "../lib/axios"; // Import your axios instance

const OtherClubs = () => {
  // ... (your state variables: searchQuery, selectedCategory, anchorEl)
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Utilisateur non authentifié.");
        return;
      }

      try {
        const response = await axiosInstance.get(`/clubs/mesclubs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClubs(response.data); // Assuming your API returns the clubs directly
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setError("Erreur lors de la récupération des clubs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, []); // Run effect only on component mount

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ... (search and filter) */}

      {error && <Typography color="error">{error}</Typography>}

      {/* Display clubs */}
      {isLoading ? (
        <Typography>Loading clubs...</Typography>
      ) : clubs.length > 0 ? (
        clubs.map((club, index) => (
          <Box
            key={index}
            className="club-item"
            sx={{ marginBottom: "20px" }}
          >
            <img
              src={`/imagesClubs/${club.image}`}
              alt={`${club.nom} Logo`}
              style={styles.image}
            />
            <Typography>{club.nom}</Typography>
          </Box>
        ))
      ) : (
        <Typography>Aucun club trouvé.</Typography>
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

export default OtherClubs;
