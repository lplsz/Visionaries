import React from "react";
import { useNavigate } from 'react-router-dom';
function MyLinks(props) {
  const navigate = useNavigate();
  return (
    <button onClick={() => { navigate(props.url) }}>
      Click hear to book meetings!
    </button>
  );
}
export default MyLinks;