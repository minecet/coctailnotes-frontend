import { useNavigate } from "react-router-dom";

import {
    Anchor,
    Button,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from '@mantine/core';
  import classes from './AuthenticationImage.module.css';

function AuthenticationImage() {
  const navigate = useNavigate();

    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to Coctail Notes!
          </Title>
  
          <TextInput label="Username" placeholder="username" size="md" />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
          <Button fullWidth mt="xl" size="md" onClick={() => navigate("/login")}>
            Login
            
          </Button>
  
          <Text ta="center" mt="md">
            Don&apos;t have an account?{' '}
            <Anchor<'a'> href="#" fw={700} onClick={(event) => {
              event.preventDefault()
              navigate("/signup")
              }}>
              Signup
            </Anchor>
            

          </Text>
        </Paper>
      </div>
    );
  }

  export default AuthenticationImage;