import { Box, Typography, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";

interface Props {
  content: string;
}

const FinalLetterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  whiteSpace: "pre-wrap",
  lineHeight: "1.8",
  fontFamily: "'Roboto', sans-serif",
}));

const ActionBar = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

export const FinalLetterDisplay = ({ content }: Props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <FinalLetterPaper>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          Your Custom Cover Letter
        </Typography>
        <Typography variant="body1" component="div">
          {content}
        </Typography>
      </FinalLetterPaper>
      
      <ActionBar>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
          sx={{ borderRadius: "6px", textTransform: "none" }}
        >
          Copy to Clipboard
        </Button>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{ borderRadius: "6px", textTransform: "none" }}
        >
          Download as Text File
        </Button>
      </ActionBar>
    </Box>
  );
};