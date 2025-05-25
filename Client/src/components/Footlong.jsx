// import React from 'react';

// const Footlong = () => {
//   return (
//     <footer>
//       <p>© 2025 Luis Laguardia xD. All rights reserved.</p>
//     </footer>
//   );
// };

// export default Footlong;


// const Footlong = () => {
//   return (
//     <footer
//       style={{
//         backgroundColor: '#333',
//         color: '#fff',
//         padding: '20px',
//         textAlign: 'center',
//         position: 'sticky',
//         bottom: '0',
//         width: '100%',  // Changed from 97.7% to 100% to ensure it's full width
//         fontSize: '14px',
//         left: '0',
//       }}
//     >
//       <p
//         style={{
//           margin: '0',
//         }}
//       >
//         © 2025 Luis Laguardia xD. All rights reserved.
//       </p>
//     </footer>
//   );
// };

// export default Footlong;

const Footlong = () => {
  return (
    <footer
      style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
        position: 'fixed',  // Changed to fixed
        bottom: '0',
        width: '100%',
        fontSize: '14px',
        left: '0',
        zIndex: '100',  // Ensure footer is above other content (optional)
      }}
    >
      <p
        style={{
          margin: '0',
        }}
      >
        © 2025 Luis Laguardia xD. All rights reserved.
      </p>
    </footer>
  );
};

export default Footlong;
// import React from 'react';
// import { Box, Typography } from '@mui/material';

// function Footlong() {
//   return (
//     <Box
//       sx={{
//         backgroundColor: '#000', // black footer
//         color: '#fff',
//         py: 2,
//         textAlign: 'center',
//       }}
//     >
//       <Typography variant="body2">
//         © 2025 LUIS. All rights reserved.
//       </Typography>
//     </Box>
//   );
// }

// export default Footlong;