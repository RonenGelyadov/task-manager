import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavItem from "../router/NavItem";
import { useUser } from "../providers/UserProvider";
import ROUTES from "../router/routs";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const { signUp } = useUser();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    (await signUp(data)) && navigate(ROUTES.HOME);
  };

  return (
    <Container dir="rtl" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            marginBottom: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            borderRadius: 2,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            הרשמה
          </Typography>

          <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={{ width: "100%" }}>
            <TextField
              {...register("firstName")}
              fullWidth
              label="שם פרטי"
              sx={{ mb: 2 }}
            />

            <TextField
              {...register("lastName")}
              fullWidth
              label="שם משפחה"
              sx={{ mb: 2 }}
            />

            <TextField
              {...register("email")}
              fullWidth
              label="כתובת אימייל"
              sx={{ mb: 2 }}
            />

            <TextField
              {...register("password")}
              fullWidth
              label="סיסמה"
              type="password"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              היכנס
            </Button>
          </Box>
        </Paper>
      </Box>
      <Typography
        color="textPrimary"
        variant="body1"
        component="span"
        sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}
      >
        כבר רשומים ? לחצו
        <NavItem label="כאן" to="/login" isMainNav={false} />
        להתחבר
      </Typography>
    </Container>
  );
};

export default RegisterPage;
