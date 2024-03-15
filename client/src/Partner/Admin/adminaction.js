import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "../signup.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestRegister,
  userLogout,
} from "../../Redux/actions";
import Swal from "sweetalert2";
import Layout from "../Layout";



const Adminaction = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    seterroremail("");
    setError(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    props.requestRegister({
      data: {
        name,
        email,
        password,
      },
    });
  };

  useEffect(() => {
    let registerdata = props.candidate.registerData;
    if (registerdata !== undefined) {
      if (registerdata?.data?.status === "success") {
        props.candidate.registerData = undefined;
        Swal.fire("Good job!", "Staff Added successfully.", "success");
        resetForm();
        // navigate("/adminaction");

      } else {
        Swal.fire("Sorry!", "Email is already used.", "error");
        seterroremail("Email is already used.");
        setError(true);
      }
    }
  }, [props.candidate.registerData]);

  return (
    <Layout>
      <div className="background">
        <Container component="main" maxWidth="xs">
          <div>
            <br />
            <br />
            <br />
            <Typography variant="h5">University Registration</Typography>
            <br />
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label=" Full Name"
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                InputProps={{
                  style: {
                    border: "1px solid white", // White border
                    borderRadius: "10px", // Border radius
                    color: "white", // Text color
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white", // Label color
                  },
                }}
              />
              <TextField
                fullWidth
                label=" Email address"
                type="email"
                required
                placeholder="Enter email"

                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputProps={{
                  style: {
                    border: "1px solid white", // White border
                    borderRadius: "10px", // Border radius
                    color: "white", // Text color
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white", // Label color
                  },
                }}
              />

              <TextField
                fullWidth
                label="Set Password"
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  style: {
                    border: "1px solid white", // White border
                    borderRadius: "10px", // Border radius
                    color: "white", // Text color
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white", // Label color
                  },
                }}
              />

              <br />

              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestRegister, userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Adminaction);
