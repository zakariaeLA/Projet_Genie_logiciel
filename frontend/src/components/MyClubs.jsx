import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";

const MyClubs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const clubs = [
    { name: "Mines IT", logo: "mines_it_logo.jpg", categories: ["science"] },
    { name: "Astronomines", logo: "astronomines_logo.jpg", categories: ["science"] },
    { name: "Alumni", logo: "alumni_logo.jpg", categories: ["entreprise"] },
    { name: "Bénévolat", logo: "benevolat_logo.jpg", categories: ["Aucun"] },
    { name: "Japamines", logo: "japamines_logo.jpg", categories: ["science"] },
    { name: "Sport", logo: "sport_logo.jpg", categories: ["Sport"] },
    { name: "Art generation", logo: "art_generation_logo.jpg", categories: ["Art"] },
    { name: "Forum", logo: "forum_logo.jpg", categories: ["entreprise"] },
  ];

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
      {/* Search and Filter Row */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        {/* Search input */}
        <TextField
          label="Rechercher un club"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ marginRight: "20px", width: "300px" }}
        />

        {/* Filter button with icon */}
        <IconButton onClick={handleMenuClick}>
          <FilterListIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          {["Tous", "science", "entreprise", "Sport", "Art"].map((category) => (
            <MenuItem
              key={category}
              selected={selectedCategory === category}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Display filtered clubs */}
      {filteredClubs.length > 0 ? (
        filteredClubs.map((club, index) => (
          <Box key={index} className="club-item" sx={{ marginBottom: "20px" }}>
            <img
              src={club.logo}
              alt={`${club.name} Logo`}
              style={styles.image}
            />
            <Typography>{club.name}</Typography>
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
