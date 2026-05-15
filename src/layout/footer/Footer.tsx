import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.primary",
            fontWeight: 500,
            mb: 0.5,
          }}
        >
          מערכת משימות
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          {"Ronen © "}
          {new Date().getFullYear()}
          {" כל הזכויות שמורות"}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
