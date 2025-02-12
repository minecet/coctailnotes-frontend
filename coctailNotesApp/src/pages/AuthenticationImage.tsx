import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginClick = () => {
    console.log(username)

    navigate("/login", { state: { username, password } });
  };
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to Coctail Notes!
          </Title>
  
          <TextInput label="Username" placeholder="username" size="md" value={username}
              onChange={(e) => setUsername(e.target.value)} />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          <Button fullWidth mt="xl" size="md" onClick={handleLoginClick}>
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