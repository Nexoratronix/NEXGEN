import React, { useState } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useRouter } from "next/router";
import { connectToDatabase } from "../lib/db";
import { sendOTP } from "../lib/email";
import bcrypt from "bcryptjs";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(null);
  const [step, setStep] = useState(1); // 1: Register form, 2: OTP verification
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { db } = await connectToDatabase();
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      setError("User already exists");
      return;
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await sendOTP(email, generatedOtp);
    setSentOtp(generatedOtp);
    setStep(2);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp !== sentOtp) {
      setError("Invalid OTP");
      return;
    }

    const { db } = await connectToDatabase();
    const userCount = await db.collection("users").countDocuments();
    const role = userCount === 0 ? "superadmin" : email.endsWith("@nexgenstaffing.com") ? "admin" : "user";
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      role,
    });

    router.push("/login");
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={6}>
          <h2 className="text-center mt-5">{step === 1 ? "Register" : "Verify OTP"}</h2>
          {error && <p className="text-danger">{error}</p>}
          {step === 1 ? (
            <Form onSubmit={handleRegister}>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </FormGroup>
              <Button color="primary" type="submit">Send OTP</Button>
            </Form>
          ) : (
            <Form onSubmit={handleVerifyOtp}>
              <FormGroup>
                <Label>Enter OTP</Label>
                <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              </FormGroup>
              <Button color="primary" type="submit">Verify OTP</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;