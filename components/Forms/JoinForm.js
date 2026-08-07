import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import https from "https";
import { Dialog, Transition } from "@headlessui/react";
import TermsCondition from "../../components/Terms/TermsCondition";
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
} from '@mui/material'; 
import { MobileDatePicker } from '@mui/x-date-pickers'; 
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { isEmail, isNumber } from "../../helpers/form-helper";
import { getLocationDetails } from "../../helpers/locations";
import 'dotenv/config';
import { MdClose } from 'react-icons/md'; 
import { IconButton } from '@mui/material';

const hearFromList = [
  { id: "Google", title: "Google" },
  { id: "Facebook", title: "Facebook" },
];

const genderList = [
  { id: "m", title: "Male" },
  { id: "f", title: "Female"},
];

const stateList = [
  {id:"NSW" , title:"New South Wales"},
  {id:"QLD" , title:"Queensland"},
  {id:"SA" , title:"South Australia"},
  {id:"TAS" , title:"Tasmania"},
  {id:"VIC" , title:"Victoria"},
  {id:"WA" , title:"Western Australia"},
  {id:"ACT" , title:"Australian Capital Territory"},
  {id:"NT" , title:"Northern Territory"}

]

export default function JoinForm() {
  let [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [selectedDOBDate, handleDateChange] = useState(new Date(1996, 0, 1));
  const [gender, setGender] = useState("");
  const [hearFrom, setHearFrom] = useState("");
  const [location, setLocation] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [postCode, setPostCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [homeStreet, setHomeStreet] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [chkTerms, setChkTerms] = useState(true);
  const [subscribe, setSubscribe] = useState(true);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMsg] = useState("");
  const [locationList] = useState(getLocationDetails("la-famiglia"));

  const handleChange = (name) => (event) => {
    if (name == "customerMobile") {
      if (event.target.value === "" || isNumber(event.target.value)) {
        setCustomerMobile(event.target.value);
      }
    } else if (name == "postCode") {
      if (event.target.value === "" || isNumber(event.target.value)) {
        setPostCode(event.target.value);
      }
    } else if (name == "chkTerms") {
      setChkTerms(event.target.value);
    } else if (name == "subscribe") {
      setSubscribe(event.target.value);
    } else if (name == "hearFrom") {
      setHearFrom(event.target.value);
    } else if (name == "location") {
      setLocation(event.target.value);
    } else if (name == "gender") {
      setGender(event.target.value);
    } else if (name == "customerEmail") {
      setCustomerEmail(event.target.value);
    } else if (name == "customerFirstName") {
      setFirstName(event.target.value);
    } else if (name == "customerLastName") {
      setLastName(event.target.value);
    } else if (name == "customerHomeStreet") {
      setHomeStreet(event.target.value);
    } else if (name == "customerHomeCity") {
      setHomeCity(event.target.value);
    } else if (name == "state") {
      setState(event.target.value);
    } 
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      setLoading(true);
      //vip api data
      let postData = {};

      postData.first_name = firstName;
      postData.last_name = lastName;
      postData.email = customerEmail;
      postData.gender = gender;
      postData.dob = moment(selectedDOBDate).format("YYYY-MM-DD");
      postData.dobISO = new Date(`${postData.dob}`).toISOString();
      postData.contact_no = customerMobile;
      postData.hear_from = hearFrom;
      postData.location = location;
      postData.state = state;
      postData.edm = 1;
      postData.postCode = postCode;

      const generateUniqueId = (prefix = '', length = 6) => {
        const timestamp = Date.now().toString(); 
        const randomPart = Array.from({ length }, () => Math.floor(Math.random() * 10)).join(''); 
        return `${prefix}${timestamp}${randomPart}`;
      };
      
      //proxy api data
      const requestId = generateUniqueId('REQ', 25); 
      const memberNo = generateUniqueId(10);
      const memberCardNo = generateUniqueId('C', 10);
      
      postData.vIPNumber = memberNo
      const xmlData = `<?xml version="1.0" encoding="utf-8"?>
                          <member>
                              <requestId>${requestId}</requestId>
                              <memberNo>${memberNo}</memberNo>
                              <memberCardNo>${memberCardNo}</memberCardNo>
                              <membershipType>VIP</membershipType>
                              <contact>
                                  <firstName>${firstName}</firstName>
                                  <lastName>${lastName}</lastName>
                                  <mobilePhone>${customerMobile}</mobilePhone>
                                  <dateOfBirth>${moment(selectedDOBDate).format("YYYY-MM-DD")}</dateOfBirth>
                                 <email>${customerEmail}</email>
                                  <homeAddress>
                                      <street>${homeStreet}</street>
                                      <city>${homeCity}</city>
                                       <state>${state}</state>
                                       <postCode>${postCode}</postCode>
                                        <country>Australia</country>
                                  </homeAddress>
                                  <postalAddress>
                                      <street>${homeStreet}</street>
                                      <city>${homeCity}</city>
                                       <state>${state}</state>
                                       <postCode>${postCode}</postCode>
                                        <country>Australia</country>
                                  </postalAddress>
                              </contact>
                          </member>`;
    
        console.log(state)
        axios.post("/api/proxy", xmlData, { 
           headers: {
             'Content-Type': 'application/xml',
          },
        }).then(response => (response))
        .catch(error => console.error("Error:", error));

        const convertDOB = (dob) => {
          const [year, month, day] = moment(dob, "YYYY-MM-DD").format("YYYY-MM-DD").split('-');
          return {
              year: parseInt(year, 10),
              month: parseInt(month, 10),
              day: parseInt(day, 10)
          };
      };
      const fullGender = gender === "f" ? "FEMALE" : "MALE" 
      console.log(fullGender)
        const jsonData = {
          programId: "0SC2DjrGem7b0RzxQJ2TwM",
          tierId: "vip_standard",
          externalId: memberNo,
          person: {
              displayName: `${firstName} ${lastName}`,
              gender: fullGender,
              surname: lastName,
              forename: firstName,
              dateOfBirth: convertDOB(moment(selectedDOBDate).format("YYYY-MM-DD")),
              emailAddress: customerEmail,
              mobileNumber: customerMobile,
        }
      }
        axios.post("/api/enrolMember", jsonData, { 
           headers: {
             'Content-Type': 'application/json',
          },
        }).then(response =>{
          const memberId = response.data.id;
          postData.passkitId= memberId
          fetch("/api/vip", {
            method: "POST",
             headers: {
              "Content-Type": "application/json",
             },
            body: JSON.stringify(postData),
           })
           .then((response) => response.json())
           .then((data) => {
             console.log(data.status)
             if (data.status) {
              setShowSuccessModal(true);
               setLoading(false);
               formReset();
             } else {
               setLoading(false);
             }
           })
           .catch((error) => {
             console.log(error);
             setLoading(false);
           });
        })
        .catch(error => console.error("Error:", error));
            
        
    }
  };

  function formReset() {
    setFirstName("");
    setLastName("");
    setCustomerEmail("");
    setCustomerMobile("");
    setPostCode("");
    setLocation("");
    setHomeStreet("");
    setHomeCity("");
  }

  function validateFields() {
    if (
      firstName === "" ||
      lastName === "" ||
      customerMobile === "" ||
      customerEmail === "" ||
      postCode === "" ||
      location === ""
    ) {
      setError(true);
      setErrorMsg("Fields marked with an asterisk (*) are mandatory.");
      return false;
    }

    if (!isEmail(customerEmail)) {
      setError(true);
      setErrorMsg("Please provide valid email address.");
      return false;
    }
    setError(false);
    return true;
  }

  return (
    <>
      <form autoComplete="off" style={{ width: "100%" }} className="signup">
        <h2 className=" mbtm0 ">
          <span className="patr title fsize20 title">YOUR DETAILS</span>{" "}
          <br></br>
          <br></br>
          Note: Fields marked with an asterisk (*) are mandatory
        </h2>
        <div className="row">
          <div className="col-lg-6">
            <TextField
              id="customerFirstName"
              label="First Name"
              margin="normal"
              variant="standard"
              value={firstName}
              onChange={handleChange("customerFirstName")}
              fullWidth
              required
            />
          </div>
          <div className="col-lg-6">
            <TextField
              id="customerLastName"
              label="Last Name"
              margin="normal"
              variant="standard"
              value={lastName}
              onChange={handleChange("customerLastName")}
              fullWidth
              required
            />
          </div>
          <div className="col-lg-6">
            <TextField
              id="customerEmail"
              value={customerEmail}
              onChange={handleChange("customerEmail")}
              label="Email Address"
              margin="normal"
              variant="standard"
              fullWidth
              required
            />
          </div>
          <div className="col-lg-6">
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="gender" variant="standard">
                Gender *
              </InputLabel>
              <Select
                id="gender"
                variant="standard"
                value={gender}
                onChange={handleChange("gender")}
                required
              >
                {genderList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-lg-6 date-format">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                id="dob"
                disableFuture
                label="Date of birth"
                format="dd/MM/yyyy"
                value={selectedDOBDate}
                variant="standard"
                onChange={handleDateChange}
                animateYearScrolling={false}
                slotProps={{ textField: { variant: "standard" } }}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    size="small"
                    helperText={null}
                    fullWidth
                    error={false} 
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className="col-lg-6">
            <TextField
              id="customerMobile"
              variant="standard"
              label="Contact Number"
              value={customerMobile}
              onChange={handleChange("customerMobile")}
              margin="normal"
              fullWidth
              required
              inputProps={{
                maxLength: "10",
              }}
            />
          </div>
          <h3 className="col-lg-12 mt-3">
          <span className="patr title fsize16 title">Address</span>{" "}
        </h3>
          <div className="col-lg-6">
            <TextField
              id="customerHomeStreet"
              label="Street"
              margin="normal"
              variant="standard"
              value={homeStreet}
              onChange={handleChange("customerHomeStreet")}
              fullWidth
              required
            />
          </div>
          <div className="col-lg-6">
        
            <TextField
              id="customerHomeCity"
              label="City"
              margin="normal"
              variant="standard"
              value={homeCity}
              onChange={handleChange("customerHomeCity")}
              fullWidth
              required
            />
          </div>
          <div className="col-lg-6">
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="state" variant="standard">
                State *
              </InputLabel>
              <Select
                id="state"
                variant="standard"
                value={state}
                onChange={handleChange("state")}
                required
              >
                {stateList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-lg-6">
            <TextField
              id="postCode"
              label="Postcode"
              value={postCode}
              onChange={handleChange("postCode")}
              margin="normal"
              fullWidth
              required
              variant="standard"
              inputProps={{
                maxLength: "4",
              }}
            />
          </div>

          <div className="col-lg-6">
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="metaData" variant="standard">
                How did you hear about us?
              </InputLabel>
              <Select
                value={hearFrom}
                id="hearFrom"
                variant="standard"
                onChange={handleChange("hearFrom")}
              >
                {hearFromList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="col-lg-6">
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="location" variant="standard">
                Your preferred Criniti&apos;s location?*
              </InputLabel>
              <Select
                value={location}
                id="location"
                variant="standard"
                onChange={handleChange("location")}
              >
                {locationList.map((option) => (
                  <MenuItem
                    key={"location_id" + option.company_id}
                    value={option.display_name}
                  >
                    {option.display_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {error ? (
            <>
              <div className="col-lg-12 my-2 text-red-600">
                <label className="error">{errorMessage}</label>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="col-lg-12">
            <br></br>
            <br></br>
          </div>

          <div className="col-lg-12">
            <FormControlLabel
              control={
                <Checkbox
                  checked={chkTerms}
                  onChange={handleChange("chkTerms")}
                  color="primary"
                  value="1"
                />
              }
              className="text-black ddin text-xs"
              label="I have read, understand and accept the "
            />
            <label
              className="tc text-black ddin cursor-pointer text-base relative -left-3 -top-0.5 border-b border-black leading-[20px]"
              onClick={openModal}
            >
              terms and condition
            </label>
          </div>

          <div className="col-lg-12">
            <FormControlLabel
              control={
                <Checkbox
                  checked={subscribe}
                  onChange={handleChange("subscribe")}
                  color="primary"
                  value="1"
                />
              }
              label="I want to receive special offers & communication from Criniti's"
            />
          </div>

          <div className="col-lg-12">
            <br></br>
            <br></br>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6"></div>
          <div className="col-lg-6 text-center">
            <div style={{ position: "relative" }}>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={handleSubmit}
                className={`${"blockbtn"} ${
                  loading ? "btn-loader" : "bgblack"
                }`}
              >
                {loading ? "Processing..." : "Join Now"}
              </Button>{" "}
              <br></br>
              <br></br>
              {loading && (
                <CircularProgress size={24} className="buttonProgress" />
              )}
            </div>
          </div>
        </div>
      </form>

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
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden bg-white  text-left align-middle shadow-xl transition-all">
                  <TermsCondition />
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

      <Transition appear show={showSuccessModal} as={Fragment}>
      <Dialog as="div" className="relative z-999" onClose={() => setShowSuccessModal(false)}>
        <Transition.Child
      as="div"
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black bg-opacity-40" /> 
    </Transition.Child>

    <div className="fixed inset-0 overflow-y-auto z-9999">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as="div" 
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden bg-white text-left align-middle shadow-xl relative z-9999">
            <div className="flex-col items-center justify-center p-3 paddingformobile">
              <img
                src="/img/LA Famiglia Google Form Cover.jpg"
                alt="Success"
                className="w-20 h-20  border-4 border-white" 
              />
             
              <div className="absolute top-1 right-0 closeicon">
                <div
                  onClick={() => setShowSuccessModal(false)}
                  aria-label="close"
                  className="p-2"
                  style={{ backgroundColor: 'white' , color: '	#3b3b3b' , cursor:'pointer'}}
                >
                  <MdClose size={20}/>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition>

    </>
  );
}
