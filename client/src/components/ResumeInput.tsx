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

export const ResumeInput = ({ value, onChange }: Props) => (
  <Box>
    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
      Your Resume
    </Typography>
    <StyledTextField
      fullWidth
      multiline
      minRows={12}
      maxRows={20}
      variant="outlined"
      placeholder="Paste your resume here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Typography variant="caption" sx={{color: 'green'}}>
      We'll use this to personalize your cover letter.
    </Typography>
  </Box>
);