/*
 * @Author: Echooooo-zhn haonanZHONG17@outlook.com
 * @Date: 2022-07-08 20:51:08
 * @LastEditors: Echooooo-zhn haonanZHONG17@outlook.com
 * @LastEditTime: 2022-07-08 20:51:50
 * @FilePath: \Visionaries\frontend\src\component\SuccessSnackBar.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function SuccessSnackbar(props) {
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={20} ref={ref} variant="filled" {...props} />;
  });
  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
      
      
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}