import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import NavItem from "../router/NavItem";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <Container dir="rtl" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            borderRadius: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            התחברות
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: "100%" }}
          >
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
        component="span"
        variant="body1"
        sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}
      >
        עדין ללא משתמש ? להרשמה לחצו
        <NavItem label="כאן" to="/register" isMainNav={false} />
      </Typography>
    </Container>
  );
};

export default LoginPage;
