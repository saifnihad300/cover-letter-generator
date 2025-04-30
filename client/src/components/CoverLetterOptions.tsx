import { Box, Typography, Button, Paper, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

interface Props {
  templates: string[];
  onSelect: (template: string) => void;
  loading: boolean;
}

const TemplateCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: "8px",
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const TemplateContent = styled(Box)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  lineHeight: "1.6",
  color: theme.palette.text.secondary,
  whiteSpace: "pre-wrap",
  marginBottom: theme.spacing(2),
}));

export const CoverLetterOptions = ({ templates, onSelect, loading }: Props) => (
  <Box>
    <Typography variant="body1" color="green" gutterBottom>
      We've generated {templates.length} personalized cover letters for you:
    </Typography>
    
    <Box mt={3}>
      {templates.map((template, idx) => (
        <TemplateCard key={idx} elevation={1}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            Option {idx + 1}
          </Typography>
          <TemplateContent>{template}</TemplateContent>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSelect(template)}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ borderRadius: "6px", textTransform: "none" }}
          >
            {loading ? "Processing..." : `Use Option ${idx + 1}`}
          </Button>
        </TemplateCard>
      ))}
    </Box>
  </Box>
);