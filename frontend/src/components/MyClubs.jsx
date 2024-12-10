import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MyClubs = ({ searchQuery }) => {
  const clubs = [
    { name: "Mines IT", logo: "mines_it_logo.jpg" },
    { name: "Astronomines", logo: "astronomines_logo.jpg" },
    { name: "Alumni", logo: "alumni_logo.jpg" },
    { name: "Bénévolat", logo: "benevolat_logo.jpg" },
  ];

  // Filter clubs based on the search query
  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        Mes Clubs
      </Typography>
      {filteredClubs.length > 0 ? (
        filteredClubs.map((club, index) => (
          <Box key={index} className="club-item" sx={{ marginBottom: "20px" }}>
            <img src={club.logo} alt={`${club.name} Logo`} style={styles.image} />
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
