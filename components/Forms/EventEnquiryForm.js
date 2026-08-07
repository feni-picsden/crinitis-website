import React from 'react';
import config from '../../helpers/config';
import {
    TextField, FormControl, Select, MenuItem, InputLabel, Checkbox, FormControlLabel, Button, CircularProgress
} from '@material-ui/core';
import ReCAPTCHA from "react-google-recaptcha";

export default function EventEnquiryForm() {

    return (
        <>
            <form autoComplete="off" style={{ width: '100%' }} className="signup">
                <h2 className=" mbtm0 ">
                    <span className="patr title fsize20 title">MAKE AN ENQUIRY BELOW</span>
                </h2>
                <div className="row">
                    <div className="col-lg-6">
                        <TextField
                            id="first_name"
                            label="First Name"
                            margin="normal"
                            value={first_name}
                            onChange={this.handleChange('first_name')}
                            error={error && first_name === '' ? true : false}
                            fullWidth
                            required
                        />
                    </div>
                    <div className="col-lg-6">
                        <TextField
                            id="last_name"
                            label="Last Name"
                            margin="normal"
                            value={last_name}
                            onChange={this.handleChange('last_name')}
                            error={error && last_name === '' ? true : false}
                            fullWidth
                            required
                        />
                    </div>
                    <div className="col-lg-6">
                        <TextField
                            id="email"
                            label="Email"
                            margin="normal"
                            value={email}
                            onChange={this.handleChange('email')}
                            error={error && !EmailValidate.test(email) ? true : false}
                            fullWidth
                            required
                        />
                    </div>
                    <div className="col-lg-6">
                        <TextField
                            id="contact_no"
                            label="Contact Number"
                            margin="normal"
                            value={contact_no}
                            onChange={this.handleChange('contact_no')}
                            error={error && contact_no === '' ? true : false}
                            fullWidth
                            required
                            inputProps={{
                                maxLength: "10",
                            }}
                        />
                    </div>
                    <div className="col-lg-6">
                        <TextField
                            id="company_name"
                            label="Company (If Applicable)"
                            margin="normal"
                            value={company_name}
                            onChange={this.handleChange('company_name')}
                            fullWidth
                        />
                    </div>
                </div>

                <h2 className=" mbtm0 ">
                    <span className="patr title fsize20 title">EVENT DETAILS</span>
                    <p>Note: Fields marked with an asterisk (*) are mandatory</p>
                </h2>

                <div className="row">
                    <div className="col-lg-6">
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={error && event_type === '' ? true : false}>
                            <InputLabel htmlFor="event_type">Event type* (please select)</InputLabel>
                            <Select
                                id="event_type"
                                value={event_type}
                                onChange={this.handleChange('event_type')}
                            >
                                {eventType.map(option => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-lg-6">
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={error && location_id === '' ? true : false}>
                            <InputLabel htmlFor="location_id">Location*</InputLabel>
                            <Select
                                id="location_id"
                                value={location_id}
                                onChange={this.handleChange('location_id')}
                            >
                                {locationList.map(option => (
                                    <MenuItem key={option.location_id} value={option.location_id}>{option.display_name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <TextField
                            id="no_of_guest"
                            label="Number of Guest"
                            value={no_of_guest}
                            onChange={this.handleChange('no_of_guest')}
                            error={error && no_of_guest === '' ? true : false}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </div>
                    <div className="col-lg-6">
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={error && approx_budget === '' ? true : false}>
                            <InputLabel htmlFor="approx_budget">Approximate Budget*</InputLabel>
                            <Select
                                id="approx_budget"
                                value={approx_budget}
                                onChange={this.handleChange('approx_budget')}
                            >
                                {Budget.map(option => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    {/* <div className="col-lg-6">
                        <MuiPickersUtilsProvider utils={ MomentUtils } margin="normal">
                            <DatePicker
                                id="event_date"
                                keyboard
                                label="Function Date"
                                format={ dateFormat }
                                fullWidth
                                margin="normal"
                                // handle clearing outside => pass plain array if you are not controlling value outside
                                mask={value =>
                                    value
                                        ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
                                        : []
                                }
                                value={event_date}
                                minDate={min_event_date}
                                onChange={this.handleDateChange}
                                disableOpenOnEnter
                                animateYearScrolling={false}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="col-lg-6">
                        <MuiPickersUtilsProvider utils={ MomentUtils } margin="normal" >
                            <TimePicker
                                id="event_time"
                                label="Select Time"
                                fullWidth
                                margin="normal"
                                value={event_time}
                                onChange={this.handleTimeChange}
                            />
                        </MuiPickersUtilsProvider>
                    </div> */}
                    <div className="col-lg-12">
                        <TextField
                            id="comment"
                            label="Additional Information"
                            multiline={true}
                            value={comment}
                            onChange={this.handleChange('comment')}
                            minRows={3}
                            maxRows={5}
                            fullWidth
                            margin="normal"
                        />
                    </div>
                    <div className="col-lg-6">
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="hear_from">How did you hear about us?</InputLabel>
                            <Select
                                id="hear_from"
                                value={hear_from}
                                onChange={this.handleChange('hear_from')} >
                                {hearFrom.map(option => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-lg-12">
                        <FormControlLabel
                            className="control-align-left control-margin"
                            control={
                                <Checkbox
                                    id="chkOffer"
                                    checked={chkOffer}
                                    onChange={this.handleChange('chkOffer')}
                                    value={`${chkOffer}`}
                                    color="primary"
                                />
                            }
                            label="I want to receive special offer & communication from Criniti's"
                        />
                    </div>
                    <div className="col-lg-12">
                        <FormControlLabel
                            className="control-align-left"
                            control={
                                <Checkbox
                                    id="chkTC"
                                    checked={chkTC}
                                    onChange={this.handleChange('chkTC')}
                                    value={`${chkTC}`}
                                    color="primary"
                                />
                            }
                            label="I have read and understood the Photography disclosure statement and agree to all Terms & Conditions regarding my reservation"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            onChange={this.handleCheckBoxChange('recaptcha_value')}
                            sitekey={config.googleCaptchaKey}
                        />
                        <br />
                    </div>
                    <div className="col-lg-6 text-center">
                        <div style={{ position: 'relative' }}>
                            <Button variant="contained"
                                color="primary"
                                disabled={loading}
                                className={`${"blockbtn"} ${loading ? "btn-loader" : "bgblack"}`}
                                onClick={this.handleClick}>
                                Send Enquiry
                            </Button>
                            {loading && <CircularProgress size={24} className="buttonProgress" />}
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}