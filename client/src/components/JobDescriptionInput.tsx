import { TextField, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const JobDescriptionInput = ({ value, onChange }: Props) => (
  <Box>
    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
      Job Description
    </Typography>
    <StyledTextField
      fullWidth
      multiline
      minRows={3}
      maxRows={7}
      variant="outlined"
      placeholder="Paste the job description here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Typography variant="caption" sx={{color: 'green'}} >
      The more details you provide, the better the results will be.
    </Typography>
  </Box>
);