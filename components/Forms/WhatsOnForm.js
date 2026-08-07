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


export default function WhatsOnForm() {
  const recaptchaRef = React.createRef();
  const [loading, setLoading] = useState(false);

  const [customerEmail, setCustomerEmail] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [subscribe, setSubscribe] = useState(true);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMsg] = useState('');
  const [locationList] = useState(getLocationDetails('la-famiglia'));

  var initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    contact_no: '',
    edm: '',
    location: '',
  }

  const handleChange = name => event => {

    if (name == 'customerMobile') {
      if (event.target.value === '' || isNumber(event.target.value)) {
        setCustomerMobile(event.target.value);
      }
    } else if (name == 'subscribe') {
      setSubscribe(event.target.value);
    } else if (name == 'customerEmail') {
      setCustomerEmail(event.target.value);
    } else if (name == 'customerFirstName') {
      setFirstName(event.target.value);
    } else if (name == 'customerLastName') {
      setLastName(event.target.value);
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

      postData.first_name = firstName;
      postData.last_name = lastName;
      postData.email = customerEmail;
      postData.location = location;
      postData.contact_no = customerMobile;
      postData.edm = 1;
      setLoading(true);

      fetch("/api/whatson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            alert(data.message);
            setLoading(false);
            formReset();
          } else {
            setError(true);
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
    setLocation('')
  }

  function validateFields() {
    if (firstName === "" || lastName === "" || customerMobile === "" || customerEmail === "" || location === "") {
      setError(true);
      setErrorMsg('Fields marked with an asterisk (*) are mandatory.')
      return false;
    }

    if (!isEmail(customerEmail)) {
      setError(true);
      setErrorMsg('Please provide valid email address.')
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
              <InputLabel htmlFor="location">Location</InputLabel>
              <Select
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
              sitekey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
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