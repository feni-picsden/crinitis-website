import { createRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

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
} from '@mui/material';  // Updated for MUI v5


import ReCAPTCHA from "react-google-recaptcha";
import { isNumber, isEmail } from "../../helpers/form-helper";


const { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } = process.env;

export default function WonkForm({ locations }) {
  const recaptchaRef = createRef();
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const [location, setLocation] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardnumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [chkTerms, setChkTerms] = useState(true);
  const [description, setDescription] = useState('');

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMsg] = useState('');


  var initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    contact_no: '',
    location_id: '',
    location: '',
    description: '',
    edm: '',
  }

  const handleChange = name => event => {
    if (name == 'cardnumber') {
      if (event.target.value === '' || isNumber(event.target.value)) {
        setCardNumber(event.target.value);
      }
    } else if (name == 'firstname') {
      setFirstName(event.target.value);
    } else if (name == 'lastname') {
      setLastName(event.target.value);
    } else if (name == 'email') {
      setCustomerEmail(event.target.value);
    } else if (name == 'contact_no') {
      if (event.target.value === '' || isNumber(event.target.value)) {
        setCustomerMobile(event.target.value);
      }
    } else if (name == 'location') {
      setLocation(event.target.value);
    } else if (name == 'description') {
      setDescription(event.target.value);
    } else if (name == 'chkTerms') {
      setChkTerms(!chkTerms);
    }
  };

  function validateFields() {
    if (firstName === "" || lastName === "" || location === "" || customerMobile === "" || customerEmail === "") {
      setError(true);
      setErrorMsg('Fields marked with an asterisk (*) are mandatory.')
      return false;
    }

    if (!isEmail(customerEmail)) {
      setError(true);
      setErrorMsg('Please provide valid email address.')
      return false;
    }

    if (!chkTerms) {
      setError(true);
      setErrorMsg('Please accept the terms and conditions.')
      return false;
    }
    setError(false);
    return true;
  }

  const handleSubmit = async () => {
    let postData = initialValues;

    
    recaptchaRef.current.reset();  
    postData.captcha = await recaptchaRef.current.executeAsync();

    postData.first_name = firstName;
    postData.last_name = lastName;
    postData.email = customerEmail;
    postData.contact_no = customerMobile;
    postData.location_id = location;
    postData.location = "";
    for (let i = 0; i < locations.length; i++) {
      if (location == locations[i].ID) {
        postData.location = locations[i].post_title;
        break;
      }
    }
    postData.description = description;
    postData.edm = chkTerms ? 1 : 0;
    let validate = validateFields();

    if (validate) {
      setLoading(true);

      fetch("/api/wonka-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            alert("Thank you for participating.");
            setLoading(false);
            formReset();
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          setErrorMsg(error.message)
          return false;
        });
    }
  };


  function formReset() {
    setFirstName('');
    setLastName('');
    setCustomerEmail('');
    setCustomerMobile('');
    setDescription('');
  }

  return (
    <>
      <form autoComplete="off" style={{ width: '100%' }} className="signup">

        <h2 className=" mbtm0 ">
          <span className="patr title fsize20 title">Participant Details</span> <br></br><br></br>
          Note: Fields marked with an asterisk (*) are mandatory
        </h2>
        <div className="row">

          <div className="col-lg-6">
            <TextField
              id="firstname"
              label="First Name"
              margin="normal"
              value={firstName}
              onChange={handleChange('firstname')}
              fullWidth
              required
            />
          </div>
          <div className="col-lg-6">
            <TextField
              id="lastname"
              label="Last Name"
              margin="normal"
              value={lastName}
              onChange={handleChange('lastname')}
              fullWidth
              required />
          </div>
          <div className="col-lg-6">
            <TextField
              id="email"
              value={customerEmail}
              onChange={handleChange('email')}
              label="Email Address"
              margin="normal"
              fullWidth
              required />
          </div>

          <div className="col-lg-6">
            <TextField
              id="contact_no"
              label="Contact Number"
              value={customerMobile}
              onChange={handleChange('contact_no')}
              margin="normal"
              fullWidth
              required
              inputProps={{
                maxLength: "10",
              }}
            />
          </div>

          <div className="col-lg-12">
            <FormControl
              fullWidth
              margin="normal"
              error={error && location === '' ? true : false}>
              <InputLabel htmlFor="location">Location*</InputLabel>
              <Select
                id="location"
                value={location}
                onChange={handleChange('location')}
              >
                {locations.map(option => (
                  <MenuItem key={option.ID} value={option.ID}>{option.post_title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="col-lg-12">
            <TextField
              id="description"
              label="Why you want to go to Italy?"
              margin="normal"
              value={description}
              onChange={handleChange('description')}
              multiline={true}
              minRows={3}
              maxRows={5}
              fullWidth
            />
          </div>


          <div className="col-lg-12">
            <FormControlLabel
              control={
                <Checkbox
                  checked={chkTerms}
                  onChange={handleChange('chkTerms')}
                  color="primary"
                  value="1" />}
              className="text-black ddin text-xs"
              label="I have read, understand and accept the "
            />
            <label className="tc text-black ddin cursor-pointer text-base relative -left-3 -top-0.5 border-b border-black leading-[20px]" onClick={openModal}>terms and condition</label>
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

          <div className="col-lg-12">
            <br></br>
            <br></br>
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
          <div className="col-lg-6 text-center">
            <div style={{ position: 'relative' }}>
              <Button variant="contained"
                color="primary"
                className='bgblack blockbtn'
                disabled={loading}
                onClick={handleSubmit}>
                JOIN NOW
              </Button>
              {loading && <CircularProgress size={24} className="buttonProgress" />}
            </div>
          </div>
        </div>
      </form>

    </>
  )
}