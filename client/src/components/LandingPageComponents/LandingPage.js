import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Grow,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MobileStepper,
  Paper,
  Typography,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import mainImage from "../../images/landingImg.svg";
import heroImage from "../../images/hero_parking.svg";
import heroImage2 from "../../images/hero_parking_2.svg";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Alert from "../../Utils/Alert";
import { Container } from "@mui/system";
import SearchBar from "@mkyy/mui-search-bar";
import SearchIcon from "@mui/icons-material/Search";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ForwardIcon from "@mui/icons-material/Forward";
import descData from "./descData";
import howToUseData from "./howToUseData";
import "./landingpage.css";

const LandingPage = () => {
  const theme = useTheme();
  const styles = {
    box1: {
      bgcolor: "red",
      boxShadow: 1,
      borderRadius: 1,
      p: 1,
      minWidth: 300,
    },
    bgImg: {
      paddingTop: "2em",
      // maxHeight:"100vh",
      backgroundRepeat: "no-repeat",
      backgroundSize: "1800px",
      backgroundPosition: "90%-25%",
      backgroundBlendMode: "multiply",
      marginTop: "5em",
    },
    heroLeft: {
      padding: "2em",
      gap: "2em",
    },
    heroImage: {
      maxWidth: "70%",
    },
    featureCont: {
      padding: "1em",
      paddingTop: "2em",
    },
    linkName: {
      color: "black",
      transition: "0.5s",
      paddingTop: "0.3em",
      paddingX: "1em",
      "&:hover": {
        color: "#E2F0F9",
        textShadow: "0 0 5px #E2F0F9",
      },
      textDecoration: "none",
    },

    parent: {
      padding: "20px",
      backgroundColor: "white",
      textAlign: "center",
      height: "100%",
      width: "100%",
    },
    content: {
      textAlign: "center",
      zIndex: "10",
      fontSize: "20px",
      fontWeight: "400",
      fontFamily: "'Source Code Pro', monospace",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      color: "#eae7dc",
      "@media (max-width : 700px)": {
        fontSize: "30px",
      },
    },
    text: {
      "@media (max-width : 700px)": {
        fontSize: "25px",
      },
    },
    smallText: {
      "@media (max-width : 700px)": {
        fontSize: "12px",
      },
    },

    contentBold: {
      background: "-webkit-linear-gradient(#e73426, #e85a4f)",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",

      "@media (max-width : 700px)": {
        textAlign: "center",
        top: "30%",
        left: "50%",
        fontSize: "30px",
      },
    },
    sliderCont: {
      width: "100%",
      height: "100%",
      position: "fixed" /* add this code for position fixed */,
      top: "0px" /* set top and left 0 */,
      left: "0px",
    },
    carouselPaper: {
      display: "flex",
      alignItems: "center",
      height: 50,
      pl: 2,
      bgcolor: "background.default",
    },
    carouselImg: {
      width: "1000px",
      // height:"400px",
      display: "block",
      maxWidth: 400,
      overflow: "hidden",
    },
    hero1: {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
      },
    },
  };

  const user = useSelector((state) => state.auth.user);
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (user._id) {
      if (user.role === "admin") {
        navigate("/admindb");
      } else navigate("/home");
    }
  }, [navigate, user]);

  const handleSearchClick = () => {
    navigate("/register");
  };
  return (
    <Grow in>
      <Container sx={styles.bgImg} maxWidth="1400px">
        <Alert />
        <Grid
          container
          sx={styles.hero1}
          justifyItems="center"
          alignItems="center"
        >
          <Grid item sm={6} xs={12}>
            <Paper sx={{ backgroundColor: theme.palette.primary.dark }}>
              <Grid container sx={styles.heroLeft} justifyContent="center">
                <Grid item sx={{ textAlign: "center" }}>
                  <Typography
                    color="white"
                    sx={{ fontWeight: "bold" }}
                    variant="h2"
                    component="h2"
                  >
                    START YOUR PARKING JOURNEY
                  </Typography>
                </Grid>
                <Grid item sx={{ textAlign: "center" }}>
                  <Typography
                    color="white"
                    sx={{ fontWeight: "bold" }}
                    variant="body"
                    component="h3"
                  >
                    Find new places to park your vehicle.
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}></Grid>
                <Button
                  color="secondary"
                  sx={{ margin: "auto", paddingX: "2em", paddingY: "1em" }}
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                >
                  Book now
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Grid item sm={4} sx={{ margin: "auto" }}>
            <Box
              component="img"
              width="100%"
              alt="parking image"
              src={heroImage}
            />
          </Grid>
        </Grid>

        <hr
          style={{
            borderTop: "10px solid #666",
            marginTop: "1em",
            borderRadius: "5px",
            width: "50%",
          }}
        />
        <Grid
          container
          sx={styles.featureCont}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sm={6} xs={12}>
            <Paper
              sx={{
                backgroundColor: theme.palette.primary.dark,
                width: "90%",
                color: "white",
              }}
            >
              <Grid
                container
                sx={styles.heroLeft}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h2"
                    component="h2"
                  >
                    How To Use Smart Parker?
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h5" component="h5">
                    Smart Parker has a very simple and user friendly UI. You can
                    easily search and Book Slots!
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item sm={1} xs={12}>
            <ForwardIcon color="primary" sx={{ fontSize: "50px" }} />
          </Grid>

          <Grid item sm={5} xs={12}>
            <Carousel
              width="60%"
              showArrows={false}
              showStatus={false}
              showIndicators={false}
              infiniteLoop={true}
              showThumbs={false}
              autoPlay={true}
            >
              {howToUseData.map((item, index) => (
                <div key={index}>
                  <img height="300px" src={item.img} />
                  <h1 style={{ color: "#f25d23" }}>{item.heading}</h1>
                  <h3 style={{ color: "#f48d23" }}>{item.subHeading}</h3>
                </div>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default LandingPage;
