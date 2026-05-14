import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Link,
} from "@mui/material";

const Contact = () => {
  return (
    <Container
      dir="rtl"
      maxWidth="sm"
      sx={{
        p: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        יצירת קשר
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        נתקלתם בבאג במערכת המשימות? יש לכם רעיון לפיצ'ר חדש?
        <br />
        מלאו את הפרטים ונחזור אליכם בהקדם.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          p: { xs: 3, sm: 4 }, // רספונסיביות בסיסית לפאדינג
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3, // יוצר רווח שווה בין כל השדות בטופס
          }}
        >
          <TextField
            label="שם מלא"
            variant="outlined"
            fullWidth
            required
            sx={{ backgroundColor: "background.default" }}
          />

          <TextField
            label="אימייל"
            type="email"
            variant="outlined"
            fullWidth
            required
            sx={{ backgroundColor: "background.default" }}
          />

          <TextField
            label="הודעה"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            sx={{ backgroundColor: "background.default" }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disableElevation
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            שליחת הודעה
          </Button>
        </Box>
      </Paper>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          אפשר גם לשלוח מייל ישירות לכתובת:
        </Typography>
        <Link
          href="mailto:hello@ronengelyadov.dev"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          hello@ronengelyadov.dev
        </Link>
      </Box>
    </Container>
  );
};

export default Contact;
