import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';


export const RecaptchaButton = ({
  onClick,
  actionName = 'mint',
  children = 'Click to mint',
  disabled
}: any) => {
  const [validating, setValidating] = useState(false)
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.debug('Execute recaptcha not yet available');
      return;
    }
    setValidating(true)

    const token = await executeRecaptcha(actionName);
    const { data }: any = await axios.post(`/api/validate-captcha`, { token });
    if (data.success) {
      setValidating(false)
      await onClick()
    }
    else toast.error('You has been flagged as a bot!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });

    setValidating(false)
  }, []);

  return <button
    type="button"
    className="text-black font-bold text-lg cursor-pointer"
    disabled={disabled}
    onClick={handleReCaptchaVerify}>{validating ? 'Validating you are not a bot...' : children}</button>;
};
