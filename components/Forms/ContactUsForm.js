import React, { useState } from 'react';
import { isNumber, isEmail } from "../../helpers/form-helper";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
} from '@mui/material';  // Updated to MUI v5

import { getLocationDetails } from '../../helpers/locations';
import ReCAPTCHA from "react-google-recaptcha";

const { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } = process.env;
const hearFromList = [
  { id: 'Google', title: "Google" },
  { id: 'Facebook', title: "Facebook" },
];
export default function ContactUsForm() {
  const [hearFrom, setHearFrom] = useState('');
  const recaptchaRef = React.createRef();
  const [loading, setLoading] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [subscribe, setSubscribe] = useState(true);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMsg] = useState('');
  const [locationList] = useState(getLocationDetails());

  var initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    contact_no: '',
    hear_from: '',
    edm: '',
    subject: '',
    description: '',
    location: '',
  }

  const handleChange = name => event => {

    if (name == 'customerMobile') {
      if (event.target.value === '' || isNumber(event.target.value)) {
        setCustomerMobile(event.target.value);
      }
    } else if (name == 'subscribe') {
      setSubscribe(event.target.value);
    } else if (name == 'hearFrom') {
      setHearFrom(event.target.value);
    } else if (name == 'customerEmail') {
      setCustomerEmail(event.target.value);
    } else if (name == 'customerFirstName') {
      setFirstName(event.target.value);
    } else if (name == 'customerLastName') {
      setLastName(event.target.value);
    } else if (name == 'subject') {
      setSubject(event.target.value);
    } else if (name == 'description') {
      setDescription(event.target.value);
    }
    if (name === 'location') {
      for (let i = 0; i < locationList.length; i++) {
        if (event.target.value === locationList[i].display_name) {
          setLocation(event.target.value)
        }
      }
    }
  };

  const handleSubmit = async () => {

    const validate = validateFields();
    if (validate === true) {
      let postData = initialValues;
      recaptchaRef.current.reset();
      // Execute the reCAPTCHA when the form is submitted        
      postData.captcha = await recaptchaRef.current.executeAsync();

      // call API for save data
      postData.first_name = firstName;
      postData.last_name = lastName;
      postData.email = customerEmail;
      postData.location = location;
      postData.contact_no = customerMobile;
      postData.hear_from = hearFrom;
      postData.subject = subject;
      postData.description = description;
      postData.edm = 1;
      postData.apply_for_job = 0;
      setLoading(true);

      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            alert("Thank you for contacting us. One of our team member will get back in touch with you soon!");
            setLoading(false);
            formReset();
          } else {
            setErrorMsg(data.message)
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          setErrorMsg(error.message)
          return false;
        });
    } else {
      console.log('message.MESSAGE_FIELDS_REQUIRED');
      setLoading(false);
    }
  };
  
  function formReset() {
    setFirstName('')
    setLastName('')
    setCustomerEmail('')
    setCustomerMobile('')
    setSubject('')
    setDescription('')
    setLocation('')
  }

  function validateFields() {
    if (firstName === "" || lastName === "" || customerMobile === "" || customerEmail === "" || subject === "") {
      setError(true);
      setErrorMsg('Fields marked with an asterisk (*) are mandatory.')
      return false;
    }

    // Validate email format
    if (!isEmail(customerEmail)) {
      setError(true);
      setErrorMsg('Please provide valid email address.')
      return false;
    }

    // Validate description
    if (description.length > 300) {
      setError(true);
      setErrorMsg('You can add max 300 characters message.')
      return false;
    }
    setError(false);
    return true;
  }

  return (
    <>
      <form autoComplete="off" style={{ width: '100%' }} className="signup">

        <h2 className=" mbtm0 ">
          <span className="patr title fsize20 title block">CONTACT US DETAILS</span>
          <span className='text-[14px] block -mt-4'> Note: Fields marked with an asterisk (*) are mandatory</span>
        </h2>
        <div className="row">
          <div className="col-lg-6">
            <TextField
            variant="standard"
              id="customerFirstName"
              label="First Name"
              margin="normal"
              value={firstName}
              onChange={handleChange('customerFirstName')}
              fullWidth
              required />
          </div>
          <div className="col-lg-6">
            <TextField
            variant="standard"
              id="customerLastName"
              label="Last Name"
              margin="normal"
              value={lastName}
              onChange={handleChange('customerLastName')}
              fullWidth
              required

            />
          </div>
          <div className="col-lg-6">
            <TextField
            variant="standard"
              id="customerEmail"
              label="Email Address"
              margin="normal"
              value={customerEmail}
              onChange={handleChange('customerEmail')}
              fullWidth
              required

            />
            <label className="" />
          </div>

          <div className="col-lg-6">
            <FormControl
              fullWidth
              margin="normal">
              <InputLabel variant="standard" htmlFor="location">Location</InputLabel>
              <Select
              variant="standard"
                id="location"
                value={location}
                onChange={handleChange('location')}>
                {locationList.map(option => (
                  <MenuItem key={'location' + option.company_id}
                    value={option.display_name}>{option.display_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-lg-6">
            <TextField
            variant="standard"
              id="customerMobile"
              label="Contact Number"
              value={customerMobile}
              onChange={handleChange('customerMobile')}
              margin="normal"
              fullWidth
              required
              inputProps={{
                maxLength: "10",
              }}
            />
          </div>
          <div className="col-lg-6">
            <FormControl
              fullWidth
              margin="normal">
              <InputLabel variant="standard" htmlFor="metaData">How did you hear about us?</InputLabel>
              <Select
              variant="standard"
                value={hearFrom}
                id="hearFrom"
                onChange={handleChange('hearFrom')}>
                {hearFromList.map(option => (
                  <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="col-lg-12">
            <TextField
            variant="standard"
              id="title"
              label="Subject"
              margin="normal"
              value={subject}
              required
              onChange={handleChange('subject')}
              fullWidth />
          </div>

          <div className="col-lg-12">
            <TextField
            variant="standard"
              id="description"
              label="Your Message"
              margin="normal"
              value={description}
              onChange={handleChange('description')}
              multiline={true}
              minRows={3}
              maxRows={5}
              fullWidth
            />
          </div>

          {
            error ?
              <>
                <div className="col-lg-12 my-2 text-red-600">
                  <label className="error">{errorMessage}</label>
                </div>
              </>
              : ''
          }
          <div className="col-lg-12 my-3">
            <FormControlLabel
              control={
                <Checkbox
                  checked={subscribe}
                  onChange={handleChange('subscribe')}
                  color="primary"
                  value="1" />}
              label="I want to receive special offers & communication from Criniti's"
            />
            <label className="tc"></label>
          </div>

        </div>
        <div className="row">
          <div className="col-lg-6">
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              badge="bottomright"
            />
            <br />
          </div>
          <div className="col-lg-6 text-center my-3">
            <div style={{ position: 'relative' }}>
              <Button variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                className={`${"blockbtn"} ${loading ? "btn-loader" : "bgblack"}`}>
                {loading ? "Submitting" : "Submit Now"}
              </Button> <br></br><br></br>
              {loading && <CircularProgress size={24} className="buttonProgress" />}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}