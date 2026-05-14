import { Box, Typography, Container, Paper, Divider } from "@mui/material";

const About = () => {
  return (
    <Container
      dir="rtl"
      maxWidth="md"
      sx={{
        py: { xs: 6, md: 10 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 6, maxWidth: "600px" }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: "text.primary",
            letterSpacing: "-0.02em",
          }}
        >
          על המערכת
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          מערכת המשימות הזו נבנתה במטרה אחת פשוטה: לעזור לך לעשות סדר בבלאגן,
          בלי עומס מיותר. רק מה שצריך כדי להישאר ממוקדים ולסיים את המטלות של
          היום.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          p: { xs: 3, sm: 5 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 4,
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ mb: 1, fontWeight: 600, color: "primary.main" }}
            >
              עיצוב נקי
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.6 }}
            >
              ממשק משתמש מינימליסטי שלא מסיח את הדעת, כדי שהפוקוס יישאר נטו על
              המשימות שלך.
            </Typography>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ display: { xs: "block", sm: "none" } }}
          />

          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ mb: 1, fontWeight: 600, color: "primary.main" }}
            >
              מהירות ויעילות
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.6 }}
            >
              פיתוח מודרני שמבטיח תגובתיות מיידית. הוספה, עריכה ומחיקה של משימות
              בקליק.
            </Typography>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ display: { xs: "block", sm: "none" } }}
          />

          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ mb: 1, fontWeight: 600, color: "primary.main" }}
            >
              קוד פתוח
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.6 }}
            >
              הפרויקט נבנה באהבה על ידי Ronen תוך שימוש בטכנולוגיות המתקדמות
              ביותר (React & MUI).
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;
