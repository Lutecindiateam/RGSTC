import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./signup.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestRegister,
  requestCountry,
  requestCity,
  requestState,
  userLogout,
} from "../Redux/actions";
import Swal from "sweetalert2";



const PartnerSignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [gender, setGender] = React.useState("");
  const [erroremail, seterroremail] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;

    // Validate that the phone number is a 10-digit number
    if (/^\d{10}$/.test(input)) {
      setPhoneNumberError(""); // Reset error state if valid
      setPhoneNumber(input);
      setPhone(input);
    } else {
      setPhoneNumberError("Phone number must be a 10-digit number.");
    }
  };

  const handleNameChange = (e) => {
    const input = e.target.value;
    // Capitalize the first letter and convert the rest to lowercase
    const capitalizedInput = input.replace(/\b\w/g, (char) => char.toUpperCase());
    setName(capitalizedInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.userLogout();
    if (phoneNumberError) {
      alert(phoneNumberError);
      return;
    }

    props.requestRegister({
      data: {
        name,
        phone,
        dob,
        email,
        password,
        gender
      },
    });
  };

  useEffect(() => {
    let registerdata = props.candidate.registerData;
    if (registerdata !== undefined) {
      if (registerdata?.data?.status === "success") {
        props.candidate.registerData = undefined;
        Swal.fire("Success!", "Registration successfully.", "success");

        navigate("/partnerlogin");

      } else {
        Swal.fire("Sorry!", "Email is already used.", "error");
        seterroremail("Email is already used.");
        setError(true);
      }
    }
  }, [props.candidate.registerData]);

  return (
    // <div className="background">
    <div style={{ background: "#ececec", height: "100%" }}>
      <Container component="main" maxWidth="xs" style={{ background: "#f4f4f4" }}>
        <div >
          <Typography variant="h5" style={{ color: "gray", display: "flex", justifyContent: "center", paddingTop: "10%" }}>Applicant Registration</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label=" Full Name"
              type="text"
              required
              placeholder="Enter Name"
              onChange={handleNameChange}
              margin="normal"
              InputProps={{
                style: {
                  // border: "1px solid black", // black border
                  borderRadius: "10px", // Border radius
                  color: "black", // Text color
                },
              }}
              InputLabelProps={{
                style: {
                  color: "black", // Label color
                },
              }}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: "black" }}
                  required
                >
                  Select Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label=" Select Gender "
                  onChange={handleChange}
                  style={{
                    // border: "1px solid black",
                    borderRadius: "10px",
                    color: "black",
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              fullWidth
              label=" Phone Number"
              type="text"
              required
              placeholder="Enter Phone Number"
              onChange={handlePhoneNumberChange}
              margin="normal"
              InputProps={{
                style: {
                  // border: "1px solid black", // black border
                  borderRadius: "10px", // Border radius
                  color: "black", // Text color
                },
              }}
              InputLabelProps={{
                style: {
                  color: "black", // Label color
                },
              }}
            />
            {phoneNumberError && (
              <Typography
                variant="caption"
                style={{ color: "red", marginTop: "10px" }}
              >
                {phoneNumberError}
              </Typography>
            )}
            <Typography>Note*: OTP will be sent to this mobile number for verification</Typography>
            <TextField
              fullWidth
              label=" Email Eddress"
              type="email"
              required
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputProps={{
                style: {
                  // border: "1px solid black", // black border
                  borderRadius: "10px", // Border radius
                  color: "black", // Text color
                },
              }}
              InputLabelProps={{
                style: {
                  color: "black", // Label color
                },
              }}
            />
            <Typography>Note*: Email address will be used as username</Typography>
            <TextField
              fullWidth
              label="Password"
              type="password"
              required
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                style: {
                  // border: "1px solid black", // black border
                  borderRadius: "10px", // Border radius
                  color: "black", // Text color
                },
              }}
              InputLabelProps={{
                style: {
                  color: "black", // Label color
                },
              }}
            />

            <br />
            <label style={{ color: "gray" }}>Date of Birth</label>
            <TextField
              fullWidth
              // label=" Date of Birth"
              type="date"
              required
              // placeholder="Date of Birth"
              onChange={(e) => setDob(e.target.value)}
              // margin="normal"
              InputProps={{
                style: {
                  // border: "1px solid black", // black border
                  borderRadius: "10px", // Border radius
                  // color: "black", // Text color
                },
              }}
              InputLabelProps={{
                style: {
                  color: "black", // Label color
                },
              }}
            />

            <br />

            <br />

            <Button type="submit" variant="contained" color="primary" fullWidth style={{ borderRadius: "10px", height: "50px", fontSize: "17px" }}
            >
              Sign Up
            </Button>

            <Typography
              align="right"
              style={{ color: "black", fontSize: "16px", paddingTop: "7px" }}
            >
              Already have an account?{" "}
              <a href="/partnerlogin" style={{ color: "black", fontSize: "18px" }}>
                Log In
              </a>
            </Typography>
          </form>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestRegister, userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PartnerSignUp);
