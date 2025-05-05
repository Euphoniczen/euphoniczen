import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export const PrettoSlider = styled(Slider)({
  color: '#bbhbhgd',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    display: 'none', // 👈 Hides the thumb
  },
});
