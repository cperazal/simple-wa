import Head from "next/head";
import 'react-phone-input-2/lib/style.css'; 
import PhoneInput from 'react-phone-input-2';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FormWA = () => {

    const [defaultCountry, setDefaultCountry] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchGeoLocation();
    });

    const fetchGeoLocation = async () => {
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          if (data.country_code) {
            setDefaultCountry(data.country_code.toLowerCase()); 
          }
        } catch (error) {
          console.error('Error fetching geolocation:', error);
        }
      };

      const handlePhoneNumberChange = (value, country) => {
        setPhoneNumber(value);
      };

      const handleMessageChange = (e) => {
        setMessage(e.target.value);
      };

    const onClickSend = () => {
        if(phoneNumber === ""){
            setErrorMessage("plase enter a phone number");
            return;
        }
        
        let whatsappURI = `whatsapp://send?phone=${phoneNumber}`;
        if (message) {
            whatsappURI += `&text=${encodeURIComponent(message)}`;
        }
        window.open(whatsappURI, '_blank');
    }

    return ( 
        <>
            <Head>
                <link rel="stylesheet" href="css/formwa.css" />
            </Head>
            <div className="container">
            <form>
                <div align="center">
                    <Image 
                        src={"/images/simple_wa_logo.png"}
                        width={240}
                        height={150}
                        alt="simple wa logo"
                        priority={true}
                    />
                </div>
                <div className="form-group">
                    <PhoneInput                    
                        country={defaultCountry} // Default country
                        placeholder="Select country"
                        onChange={handlePhoneNumberChange}
                        value={phoneNumber}
                    />
                    <small style={{color:"red"}}>{errorMessage}</small>
                </div>
                <div className="form-group">
                    <input type="text" required="required" value={message} onChange={handleMessageChange}/>
                    <label htmlFor="input" className="control-label">Message (optional)</label><i className="bar"></i>
                </div>
            </form>
            <div className="button-container">
                <button type="button" className="button" onClick={() => onClickSend()}><span>Send</span></button>
            </div>
            </div>
        </>
     );
}
 
export default FormWA;