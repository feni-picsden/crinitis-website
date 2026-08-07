import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import MetroManiaCondition from '../Terms/MetroManiaCondition';
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
} from '@material-ui/core';
import ReCAPTCHA from "react-google-recaptcha";
const { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } = process.env;
import { isNumber, isEmail } from "../../helpers/form-helper";

export default function MetroManiaForm() {
  let [isOpen, setIsOpen] = useState(false)
  const recaptchaRef = React.createRef();

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const [location, setLocation] = useState('Castle Hill');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [chkTerms, setChkTerms] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMsg] = useState('');

  const locationList = [
    {
      'display_name': 'Castle Hill',
      'company_id': 91,
    },
  ]


  var initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    contact_no: '',
    location: '',
    edm: '',
    instagram_link: '',
  }

  const handleChange = name => event => {
    if (name == 'customerMobile') {
      if (event.target.value === '' || isNumber(event.target.value)) {
        setCustomerMobile(event.target.value);
      }
    } else if (name == 'chkTerms') {
      setChkTerms(event.target.value);
    } else if (name == 'location') {
      for (let i = 0; i < locationList.length; i++) {
        if (event.target.value === locationList[i].display_name) {
          setLocation(event.target.value)
        }
      }
    } else if (name == 'customerEmail') {
      setCustomerEmail(event.target.value);
    } else if (name == 'customerFirstName') {
      setFirstName(event.target.value);
    } else if (name == 'customerLastName') {
      setLastName(event.target.value);
    } else if (name == 'instagramLink') {
      setInstagramLink(event.target.value);
    }

  };

  const formReset = () => {
    setFirstName('')
    setLastName('')
    setCustomerEmail('')
    setCustomerMobile('')
    setLocation('Castle Hill')
    setInstagramLink('');
  }

  const validateFields = () => {
    if (firstName === "" || lastName === "" || customerMobile === "" || customerEmail === "" || location === "" || instagramLink === "") {
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

    setError(false);
    return true;
  }

  const handleSubmit = async () => {
    let validate = validateFields();
    if (validate) {
      setLoading(true);
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
      postData.instagram_link = instagramLink;

      fetch("/api/metro-mania", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            alert("Thank you for joining. One of our team member will get back in touch with you soon!");
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
    }
  };

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
              id="firstMateName"
              label="First Name"
              margin="normal"
              value={firstName}
              onChange={handleChange('customerFirstName')}
              fullWidth
              required
            />
          </div>
          <div className="col-lg-6">
            <TextField
              id="secondMateName"
              label="Last Name"
              margin="normal"
              value={lastName}
              onChange={handleChange('customerLastName')}
              fullWidth
              required />
          </div>
          <div className="col-lg-6">
            <TextField
              id="customerEmail"
              value={customerEmail}
              onChange={handleChange('customerEmail')}
              label="Email Address"
              margin="normal"
              fullWidth
              required />
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

          <div className="col-lg-6">
            <FormControl
              fullWidth
              margin="normal">
              <InputLabel htmlFor="location">Preferred Store*</InputLabel>
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
              id="instagram"
              label="Instagram Profile Link"
              margin="normal"
              value={instagramLink}
              onChange={handleChange('instagramLink')}
              fullWidth
              required />
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

      {/* Terms condition popup      */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">

                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden bg-white  text-left align-middle shadow-xl transition-all">
                  <MetroManiaCondition />
                  <div className="my-2 pr-2  flex justify-end">
                    <button
                      type="button"
                      className="w-[50px]  border border-transparent bg-black px-2 py-2 uppercase font-semibold text-sm font-medium text-white hover:bg-[#ccc] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Ok
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
