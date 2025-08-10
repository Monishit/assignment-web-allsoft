/* eslint-disable no-nested-ternary */
// =====================================Original Code // Required Later // ===================================
// import PropTypes from 'prop-types';
// import { Box, CircularProgress, TableCell, TableRow } from '@mui/material';
// import EmptyContent from '../empty-content';
// TableNoData.propTypes = {
// isNotFound: PropTypes.bool,
// isLoading: PropTypes.bool,
// }; // Required Later
// export default function TableNoData({ isNotFound, isLoading }) {
// return (
// <TableRow>
// <TableCell colSpan={12} sx={{ p: 0 }}>
// {isNotFound ? (
// <EmptyContent
// title="No Data"
// sx={{
// '& span.MuiBox-root': { height: 160 },
// }}
// />
// ) : null}
// {isLoading ? (
// <Box
// sx={{
// height: '20vh',
// width: '100%',
// display: 'flex',
// justifyContent: 'center', // Center horizontally
// alignItems: 'center', // Center vertically
// }}
// >
// <CircularProgress color="primary" />
// </Box>
// ) : null}
// </TableCell>
// </TableRow>
// );
// }
// ====================================================================================

// ================================ Updated Code ========================================
import PropTypes from 'prop-types';
import { Box, CircularProgress, TableCell, TableRow } from '@mui/material';
import EmptyContent from '../empty-content';

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
  isLoading: PropTypes.bool,
};
export default function TableNoData({ isNotFound, isLoading }) {
  return (
    <TableRow>
      <TableCell colSpan={12} sx={{ p: 0 }}>
        {isLoading ? (
          <Box
            sx={{
              height: '20vh',
              width: '100%',
              display: 'flex',
              justifyContent: 'center', // Center horizontally
              alignItems: 'center', // Center vertically
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : isNotFound ? (
          <EmptyContent
            title="No Data"
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        ) : null}
      </TableCell>
    </TableRow>
  );
}
